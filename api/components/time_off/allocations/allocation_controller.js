var mongoose = require('mongoose');
var Schema = require('./allocation_schema')
var Employee = require('../../settings/users/users')
const events = require('../../event_and_resources/events');
const log = require('../../activities/logController')
const terms = require('../../event_and_resources/terms');
const { leaveTypes } = require('../../event_and_resources/constants');


exports.New = async (req, res) => {

    if (!req.body.employee_id) {
        res.json({ status: false, message: "Employee " + terms.name_required })
        return 0
    }

    if (!req.body.leave_type_id) {
        res.json({ status: false, message: "Leave type " + terms.required })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.leave_type_id)) {
        res.json({ status: false, message: "Leave type " + terms.not_valid })
        return 0
    }
    if (!req.body.hours) {
        res.json({ status: false, message: "Hours " + terms.name_required })
        return 0
    }
    if (!req.body.date) {
        res.json({ status: false, message: "Date " + terms.name_required })
        return 0
    }

    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    await Schema.findOne(
        {
            $and: [
                {
                    employee_id: req.body.employee_id
                },
                {
                    leave_type_id: req.body.leave_type_id
                },
                {
                    hours: req.body.hours
                },
                {
                    description: req.body.description
                },
                {
                    deleted_at: null
                }
            ]
        },
    )

        .exec(function (err, found) {
            if (err) throw err
            if (found) {
                res.json({ status: false, message: terms.duplicated })
            } else {
                var newRecord = new Schema(req.body)
                newRecord.creator = req.query.userID
                newRecord.created_at = Date.now()
                newRecord.updated_at = Date.now()
                newRecord.save()
                log.saveLog(req, newRecord._id, req.query.userFullName, req.query.userID, events.CreateAllocation, '', newRecord)
                res.json({ status: true, message: terms.success })
                return 0
            }
        })

}




exports.List = async (req, res) => {

    var search = {}
    if (!req.body.employee_id) {
        // search = { employee_id: req.query.userID }
    }

    var count = await Schema.countDocuments({
        $and: [
            { company_id: req.query.search_companies },
            { company_id: req.query.company_permission },
            search,
            {
                deleted_at: null
            }
        ]
    }).exec()
    var data = await Schema.find({
        $and: [
            { company_id: req.query.search_companies },
            { company_id: req.query.company_permission },
            search,
            {
                deleted_at: null
            }
        ]
    })
        .populate('company_id')
        .populate('leave_type_id')
        .populate('department_id')
        .populate('employee_id')
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort(req.query.sort)
        .exec()

    res.json({ status: true, count, data: data })


}

exports.Available = async (req, res) => {

    var search = {}
    if (req.query.search && req.query.search !== 'undefined') {
        const regex = new RegExp(req.query.search, 'i'); // 'i' flag for case-insensitive matching
        search = {

        }
    }


    var data = await Schema.find({
        $and: [
            { _id: { $in: req.query.company_permission } },
            search,
            {
                deleted_at: null
            }
        ]
    })
        .populate('company_id')
        .populate('department_id')
        .populate('employee_id')
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort(req.query.sort)
        .exec()

    res.json({ status: true, data: data })


}


exports.MyGroupedAllocations = async (req, res) => {

    var c_year = new Date().getFullYear();

    var data = await Schema.aggregate([
        {
            $match: {
                $and: [
                    { company_id: { $in: req.query.company_permission } },
                    { employee_id: req.query.userID },
                    {
                        deleted_at: null
                    }
                ]
            }
        },
        {
            $addFields: {
                year: { $year: "$date" },
            }
        },
        {
            $match: {
                year: c_year
            }
        },
        {
            $group: {
                _id: "$leave_type_id",
                total_hours: { $sum: "$hours" },
            }
        },
        {
            $lookup: {
                from: "hr_timeoffs",
                let: { l_type: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ["$status", ["Approved",'Pending']] },
                                    { $eq: ["$deleted_at", null] },
                                    { $eq: ["$leave_type_id", "$$l_type"] },
                                    { $eq: ["$employee_id", req.query.userID] },
                                ]
                            }
                        }
                    },
                    {
                        $addFields: {
                            year: { $year: "$start_date" },
                        }
                    },
                    {
                        $match: {
                            $expr:{
                                $eq:["$year",c_year]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_hours: { $sum: "$duration_in_hours" },
                            total_minutes: { $sum: "$duration_minutes" },

                        }
                    },
                    // {
                    //     $project: {
                    //         total_hours: {
                    //             $divide: [
                    //                 {
                    //                     $add: [
                    //                         {
                    //                             $multiply: ["$total_hours", 60]
                    //                         },
                    //                         "$total_minutes"
                    //                     ]
                    //                 },
                    //                 60
                    //             ]
                    //         }
                    //     }
                    // }
                ], as: "used"
            }
        },
        {
            $unwind: { path: "$used", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup:{
                from: 'hr_leave_types',
                localField: '_id',
                foreignField: '_id',
                as: 'leave_type_id'
            }
        },
        {
            $unwind:"$leave_type_id"
        },
        {
            $project: {
                leave_type_id:1,
                balance:"$total_hours",
                total_hours: {$subtract: [ {$ifNull:["$total_hours",0]},{$ifNull: ["$used.total_hours", 0]} ]},
                used: { $ifNull: ["$used.total_hours", 0] }
            }
        },
        {
            $sort:{
                total_hours:-1
            }
        }
      
    ])


    res.json({ status: true, data: data })


}

exports.EmployeeGroupedAllocations = async (req, res) => {

    var c_year = new Date().getFullYear();
    if(!req.query.employee_id){
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    if(!mongoose.Types.ObjectId.isValid( req.query.employee_id )){
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    var employee_id = mongoose.Types.ObjectId(req.query.employee_id)
    console.log(employee_id);
    
    var data = await Schema.aggregate([
        {
            $match: {
                $and: [
                    { company_id: { $in: req.query.company_permission } },
                    { employee_id: employee_id },
                    {
                        deleted_at: null
                    }
                ]
            }
        },
        {
            $addFields: {
                year: { $year: "$date" },
            }
        },
        {
            $match: {
                year: c_year
            }
        },
        {
            $group: {
                _id: "$leave_type_id",
                e_id: { $first: "$employee_id" },
                total_hours: { $sum: "$hours" },
            }
        },
        {
            $lookup: {
                from: "hr_timeoffs",
                let: { l_type: "$_id",e_id:"$e_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $in: ["$status", ["Approved",'Pending']] },
                                    { $eq: ["$deleted_at", null] },
                                    { $eq: ["$leave_type_id", "$$l_type"] },
                                    { $eq: ["$employee_id", "$$e_id"] },
                                ]
                            }
                        }
                    },
                    {
                        $addFields: {
                            year: { $year: "$start_date" },
                        }
                    },
                    {
                        $match: {
                            $expr:{
                                $eq:["$year",c_year]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_hours: { $sum: "$duration_in_hours" },
                            total_minutes: { $sum: "$duration_minutes" },

                        }
                    },
                    // {
                    //     $project: {
                    //         total_hours: {
                    //             $divide: [
                    //                 {
                    //                     $add: [
                    //                         {
                    //                             $multiply: ["$total_hours", 60]
                    //                         },
                    //                         "$total_minutes"
                    //                     ]
                    //                 },
                    //                 60
                    //             ]
                    //         }
                    //     }
                    // }
                ], as: "used"
            }
        },
        {
            $unwind: { path: "$used", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup:{
                from: 'hr_leave_types',
                localField: '_id',
                foreignField: '_id',
                as: 'leave_type_id'
            }
        },
        {
            $unwind:"$leave_type_id"
        },
        {
            $project: {
                leave_type_id:1,
                balance:"$total_hours",
                total_hours: {$subtract: [ {$ifNull:["$total_hours",0]},{$ifNull: ["$used.total_hours", 0]} ]},
                used: { $ifNull: ["$used.total_hours", 0] }
            }
        },
        {
            $sort:{
                total_hours:-1
            }
        }
      
    ])


    res.json({ status: true, data: data })


}

exports.AllocationsForEmployee = async (body) => {

    var c_year =  new Date(body.start_date).getFullYear();
    var leave_type =  body.leave_type
    var employee_id = mongoose.Types.ObjectId( body.employee_id)
    var company_id = mongoose.Types.ObjectId( body.company_id)

    var data = await Schema.aggregate([
        {
            $match: {
                $and: [
                    { leave_type: leave_type },
                    { company_id: company_id },
                    { employee_id: employee_id },
                    {
                        deleted_at: null
                    }
                ]
            }
        },
        {
            $addFields: {
                year: { $year: "$date" },
            }
        },
        {
            $match: {
                year: c_year
            }
        },
        {
            $group: {
                _id: null,
                total_hours: { $sum: "$hours" },
            }
        },
        {
            $lookup: {
                from: "hr_timeoffs",
                let: { l_type: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$leave_type", leave_type] },
                                    { $eq: ["$employee_id", employee_id] },
                                    { $eq: ["$deleted_at", null] },
                                ]
                            }
                        }
                    },
                    {
                        $addFields: {
                            year: { $year: "$start_date" },
                        }
                    },
                    {
                        $match: {
                            $expr:{
                                $eq:["$year",c_year]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_hours: { $sum: "$duration_hours" },
                            total_minutes: { $sum: "$duration_minutes" },

                        }
                    },
                    {
                        $project: {
                            total_hours: {
                                $divide: [
                                    {
                                        $add: [
                                            {
                                                $multiply: ["$total_hours", 60]
                                            },
                                            "$total_minutes"
                                        ]
                                    },
                                    60
                                ]
                            }
                        }
                    }
                ], as: "used"
            }
        },
        {
            $unwind: { path: "$used", preserveNullAndEmptyArrays: true }
        },
        {
            $project: {
                remain: {$subtract: [ {$ifNull:["$total_hours",0]},{$ifNull: ["$used.total_hours", 0]} ]},
            }
        }
    ])

    var result = 0
    if(data.length> 0){
        result = data[0].remain
    }

    return result


}


exports.One = async (req, res) => {


    if (!req.query._id) {
        res.json({ status: false, message: terms.id_required })
    }


    var data = await Schema.findOne({ $and: [{ _id: req.query._id }, { deleted_at: null }] })
        .populate('creator')
        .exec()

    res.json({ status: true, data: data })


}


exports.Update = async (req, res) => {


    if (!req.body.employee_id) {
        res.json({ status: false, message: "Employee " + terms.name_required })
        return 0
    }

    if (!req.body.leave_type_id) {
        res.json({ status: false, message: "Leave type " + terms.required })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.leave_type_id)) {
        res.json({ status: false, message: "Leave type " + terms.not_valid })
        return 0
    }
    if (!req.body.hours) {
        res.json({ status: false, message: "Hours " + terms.name_required })
        return 0
    }
    if (!req.body.date) {
        res.json({ status: false, message: "Date " + terms.name_required })
        return 0
    }

    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    await Schema.findById(mongoose.Types.ObjectId(req.body._id)).exec(function (error, response) {
        if (error) throw error;
        if (response) {
            var old = response
            response.set(req.body);
            response.updated_at = Date.now()
            response.editor = req.query.userID
            response.save(function (err, update) {
                if (err) throw err;
                if (update) {
                    log.saveLog(req,old._id, req.query.userFullName, req.query.userID, events.UpdateAllocation, old, update)
                    res.json({ status: true, message: terms.data_has_been_updated })

                } else {
                    res.json({ status: true, message: terms.error })
                }
            })
        }
    })
}

exports.Delete = async (req, res) => {

    if (!req.query._id) {
        res.json({ status: false, message: terms.id_required });
        return 0;
    }
    if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
        res.json({ status: false, message: terms.invalid_data });
        return 0;
    }


    var data = await Schema.findOne({ $and: [{ deleted_at: null }, { _id: req.query._id }] })
        .exec();

    if (data) {
        await Schema.findOneAndUpdate(
            { _id: req.query._id },
            {
                $set: {
                    editor: req.query.userID,
                    deleted_at: Date.now(),
                },
            },
            { new: true }
        ).exec(function (e, r) {
            if (e) throw e;
            if (r) {
                log.saveLog(req, req.query.userFullName, req.query.userID, events.DeleteAllUpdateAllocation, '', r)
                res.json({ status: true, message: terms.data_has_been_deleted });
                return 0;
            } else {
                res.json({ status: false, message: terms.data_not_found });
                return 0;
            }
        });
    }
    else {
        res.json({ status: false, message: terms.data_not_found });
        return 0;
    }
}