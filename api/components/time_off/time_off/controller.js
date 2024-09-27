var UserSchema = require('../../settings/users/users')
var mongoose = require('mongoose');
var Schema = require('./schema')
var AllocationController = require('../allocations/allocation_controller')
const resources = require('../../event_and_resources/resources');
const events = require('../../event_and_resources/events');
const log = require('../../activities/logController')
const terms = require('../../event_and_resources/terms');
const { leaveTypes } = require('../../event_and_resources/constants');
var Employee = require('../../settings/users/users')


exports.New = async (req, res) => {

    req.body.employee_id = req.query.userID
    if (!req.body.employee_id) {
        res.json({ status: false, message: "Employee " + terms.required })
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


    if (req.body.type == 'Hours') {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Date " + terms.required })
            return 0
        }
        if (!req.body.start_time) {
            res.json({ status: false, message: "Start time " + terms.required })
            return 0
        }
        if (!req.body.end_time) {
            res.json({ status: false, message: "End time " + terms.required })
            return 0
        }
        req.body.end_date = req.body.start_date
        req.body.start_date = req.body.start_date + 'T' + req.body.start_time
        req.body.end_date = req.body.end_date + 'T' + req.body.end_time

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start time must be less than end time" })
            return 0
        }
    } else {


        if (!req.body.start_date) {
            res.json({ status: false, message: "Start date " + terms.required })
            return 0
        }
        if (!req.body.end_date) {
            res.json({ status: false, message: "End date " + terms.required })
            return 0
        }


        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start date must be less than end date" })
            return 0
        }


        var getDaysArray = function (start, end) {
            const arr = [];
            for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {

                arr.push({ start_date: new Date(dt), end_date: new Date(dt) });
            }
            return arr;
        };

        var daylist = getDaysArray(new Date(req.body.start_date), new Date(req.body.end_date));
        daylist.map((v) => { start_date = new Date(new Date(v.start_date.setHours(8, 0, 0))).toISOString().slice(0, 10), end_date = new Date(new Date(v.end_date.setHours(23, 59, 0)).getMinutes() + 0).toISOString().slice(0, 10) }).join("")
        req.body.rangeDate = daylist
    }

    if (req.body.duration_hours <= 0 && req.body.duration_minutes <= 0) {
        res.json({ status: false, message: "Duration " + terms.required })
        return 0
    }



    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    // req.body.duration_hours = new Date(req.body.end_date) - new Date(req.body.start_date) 
    var duration = (req.body.duration_days * 8) + req.body.duration_hours + (req.body.duration_minutes /60)
    req.body.duration_in_days = duration  
    duration = duration / 8
    req.body.duration_in_hours = duration 

    var remain = await AllocationController.AllocationsForEmployee(req.body)
    if (remain < duration) {
        res.json({ status: false, message: terms.not_enough_leave_hours })
        return 0
    }


    await Schema.findOne({
        $or: [
            {
                $and: [
                    {
                        leave_type: req.body.leave_type
                    },
                    {
                        duration_hours: req.body.duration_hours
                    },
                    {
                        type: req.body.type
                    },
                    {
                        start_date: req.body.start_date
                    },
                    {
                        end_date: req.body.end_date
                    },
                    {
                        deleted_at: null
                    }
                ]
            },

        ]
    })

        .exec(function (err, found) {
            if (err) throw err
            if (found) {
                res.json({ status: false, message: terms.duplicated })
            } else {
                if (req.body.type == 'Hours') {
                    var newRecord = new Schema(req.body)
                    newRecord.creator = req.query.userID
                    newRecord.created_at = Date.now()
                    newRecord.updated_at = Date.now()
                    newRecord.save()
                    log.saveLog(req, newRecord._id, req.query.userFullName, req.query.userID, events.CreateCompany, '', newRecord)
                    res.json({ status: true, message: terms.success })
                    return 0
                } else {
                    for (let index = 0; index < req.body.rangeDate.length; index++) {
                        req.body.start_date = req.body.rangeDate[index].start_date
                        req.body.end_date = req.body.rangeDate[index].end_date
                        req.body.duration_hours = 8
                        req.body.duration_days = 1

                        var newRecord = new Schema(req.body)
                        newRecord.creator = req.query.userID
                        newRecord.created_at = Date.now()
                        newRecord.updated_at = Date.now()
                        newRecord.save()
                        if (index == req.body.rangeDate.length - 1) {
                            log.saveLog(req, newRecord._id, req.query.userFullName, req.query.userID, events.CreateCompany, '', newRecord)
                            res.json({ status: true, message: terms.success })
                            return 0
                        }
                    }
                }
            }
        })

}

exports.NewEmployeeTimeOff = async (req, res) => {

    if (!req.query.employee_id) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.query.employee_id)) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    req.body.employee_id = mongoose.Types.ObjectId(req.params.employee_id)

    if (!req.body.employee_id) {
        res.json({ status: false, message: "Employee " + terms.required })
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


    if (req.body.type == 'Hours') {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Date " + terms.required })
            return 0
        }
        if (!req.body.start_time) {
            res.json({ status: false, message: "Start time " + terms.required })
            return 0
        }
        if (!req.body.end_time) {
            res.json({ status: false, message: "End time " + terms.required })
            return 0
        }
        req.body.end_date = req.body.start_date
        req.body.start_date = req.body.start_date + 'T' + req.body.start_time
        req.body.end_date = req.body.end_date + 'T' + req.body.end_time

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start time must be less than end time" })
            return 0
        }
    } else {


        if (!req.body.start_date) {
            res.json({ status: false, message: "Start date " + terms.required })
            return 0
        }
        if (!req.body.end_date) {
            res.json({ status: false, message: "End date " + terms.required })
            return 0
        }


        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start date must be less than end date" })
            return 0
        }


        var getDaysArray = function (start, end) {
            const arr = [];
            for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {

                arr.push({ start_date: new Date(dt), end_date: new Date(dt) });
            }
            return arr;
        };

        var daylist = getDaysArray(new Date(req.body.start_date), new Date(req.body.end_date));
        daylist.map((v) => { start_date = new Date(new Date(v.start_date.setHours(8, 0, 0))).toISOString().slice(0, 10), end_date = new Date(new Date(v.end_date.setHours(23, 59, 0)).getMinutes() + 0).toISOString().slice(0, 10) }).join("")
        req.body.rangeDate = daylist
    }

    if (req.body.duration_hours <= 0 && req.body.duration_minutes <= 0) {
        res.json({ status: false, message: "Duration " + terms.required })
        return 0
    }



    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    // req.body.duration_hours = new Date(req.body.end_date) - new Date(req.body.start_date) 
    var duration = (req.body.duration_days * 8) + req.body.duration_hours + (req.body.duration_minutes /60)
    duration = duration / 8
    var remain = await AllocationController.AllocationsForEmployee(req.body)
    if (remain < duration) {
        res.json({ status: false, message: terms.not_enough_leave_hours })
        return 0
    }


    await Schema.findOne({
        $or: [
            {
                $and: [
                    {
                        leave_type: req.body.leave_type
                    },
                    {
                        duration_hours: req.body.duration_hours
                    },
                    {
                        type: req.body.type
                    },
                    {
                        start_date: req.body.start_date
                    },
                    {
                        end_date: req.body.end_date
                    },
                    {
                        deleted_at: null
                    }
                ]
            },

        ]
    })

        .exec(function (err, found) {
            if (err) throw err
            if (found) {
                res.json({ status: false, message: terms.duplicated })
            } else {
                if (req.body.type == 'Hours') {
                    var newRecord = new Schema(req.body)
                    newRecord.creator = req.query.userID
                    newRecord.created_at = Date.now()
                    newRecord.updated_at = Date.now()
                    newRecord.save()
                    log.saveLog(req, newRecord._id, req.query.userFullName, req.query.userID, events.CreateCompany, '', newRecord)
                    res.json({ status: true, message: terms.success })
                    return 0
                } else {
                    for (let index = 0; index < req.body.rangeDate.length; index++) {
                        req.body.start_date = req.body.rangeDate[index].start_date
                        req.body.end_date = req.body.rangeDate[index].end_date
                        req.body.duration_hours = 8
                        req.body.duration_days = 1

                        var newRecord = new Schema(req.body)
                        newRecord.creator = req.query.userID
                        newRecord.created_at = Date.now()
                        newRecord.updated_at = Date.now()
                        newRecord.save()
                        if (index == req.body.rangeDate.length - 1) {
                            log.saveLog(req, newRecord._id, req.query.userFullName, req.query.userID, events.CreateCompany, '', newRecord)
                            res.json({ status: true, message: terms.success })
                            return 0
                        }
                    }
                }
            }
        })

}




exports.MyTimeOffPerYear = async (req, res) => {

    var search = {}
    if (req.query.search && req.query.search !== 'undefined') {
        const regex = new RegExp(req.query.search, 'i'); // 'i' flag for case-insensitive matching
        search = {

        }
    }


    var data = await Schema.aggregate([
        {
            $match: {
                $and: [
                    {
                        status: {
                            $in:["Approved",'Pending']
                        }
                    },
                    {
                        employee_id: req.query.userID
                    },
                    {
                        start_date: {
                            $gte: new Date(req.query.year, 0, 1),
                            $lt: new Date(parseInt(req.query.year) + 1, 0, 1)
                        }
                    },
                    {
                        deleted_at: null
                    }
                ]
            }
        },
        {
            $lookup: {
                from: 'hr_leave_types',
                localField: 'leave_type_id',
                foreignField: '_id',
                as: 'leave_type_id'
            }
        },
        {
            $unwind: "$leave_type_id"
        },
        {
            $project: {
                title: '$leave_type_id.name',
                start: "$start_date",
                end: "$end_date",
                hours: "$duration_hours",
                minutes: "$duration_minutes",
                color: '$leave_type_id.primary_color',
                secondary: '$leave_type_id.secondary_color',
            }
        },
        {
            $sort:{
                hours:-1
            }
        }
    ])


    res.json({ status: true, data: data })


}

exports.EmployeeTimeOffPerYear = async (req, res) => {

    var search = {}
    if (req.query.search && req.query.search !== 'undefined') {
        const regex = new RegExp(req.query.search, 'i'); // 'i' flag for case-insensitive matching
        search = {

        }
    }
    if (!req.query.employee_id) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.query.employee_id)) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    var employee_id = mongoose.Types.ObjectId(req.query.employee_id)

    var employee = await UserSchema.findOne({ _id: employee_id })
        .select({ full_name: 1 })
    var data = await Schema.aggregate([
        {
            $match: {
                $and: [
                    {
                        status: {
                            $in:["Approved",'Pending']
                        }
                    },
                    {
                        employee_id: employee_id
                    },
                    {
                        start_date: {
                            $gte: new Date(req.query.year, 0, 1),
                            $lt: new Date(parseInt(req.query.year) + 1, 0, 1)
                        }
                    },
                    {
                        deleted_at: null
                    }
                ]
            }
        },
        {
            $lookup: {
                from: 'hr_leave_types',
                localField: 'leave_type_id',
                foreignField: '_id',
                as: 'leave_type_id'
            }
        },
        {
            $unwind: "$leave_type_id"
        },
        {
            $project: {
                title: '$leave_type_id.name',
                start: "$start_date",
                end: "$end_date",
                hours: "$duration_hours",
                minutes: "$duration_minutes",
                color: '$leave_type_id.primary_color',
                secondary: '$leave_type_id.secondary_color',
            }
        },
        {
            $sort:{
                hours:-1
            }
        }
    ])


    res.json({ status: true, data: data, employee })


}

exports.CountEmployeeTimeOffPerYear = async (req, res) => {


    if (!req.query._id) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    var employee_id = mongoose.Types.ObjectId(req.query._id)
    req.query.year = new Date().getFullYear()
    var count = await Schema.countDocuments(
        {
            $and: [
                {
                    employee_id: employee_id
                },
                {
                    start_date: {
                        $gte: new Date(req.query.year, 0, 1),
                        $lt: new Date(parseInt(req.query.year) + 1, 0, 1)
                    }
                },
                {
                    deleted_at: null
                }
            ]
        },

    )


    res.json({ status: true, count: count })


}

exports.List = async (req, res) => {

    var search = {}
    if (req.query.search && req.query.search !== 'undefined') {
        const regex = new RegExp(req.query.search, 'i'); // 'i' flag for case-insensitive matching
        search = {
            $or: [
                {
                    "full_name": { $regex: regex }
                },
            ]
        }
    }

    var searchPermissions = {}
    if (req.query.resources.split(',').includes('employee:admin')) {
        searchPermissions = {}
    } else {
        searchPermissions = {
            $or: [
                { _id: req.query.userID },
                { coach_id: req.query.userID },
                { manager_id: req.query.userID },
                { main_company_id: req.query.search_companies },
                { main_company_id: req.query.company_permission }
            ]
        }
    }


    var employees = await UserSchema.find({
        $and: [
            { main_company_id: req.query.search_companies },
            { main_company_id: req.query.company_permission },
            search,
            {
                deleted_at: null
            },
            searchPermissions
        ]
    })
    var emp_ids = employees.map(el => { return mongoose.Types.ObjectId(el._id) })



    var count = await Schema.countDocuments({
        $and: [
            { employee_id: { $in: emp_ids } },
            {
                deleted_at: null
            }
        ]
    }).exec()
    var data = await Schema.find({
        $and: [
            { employee_id: { $in: emp_ids } },
            {
                deleted_at: null
            }
        ]
    })
        .populate('leave_type_id')
        .populate('employee_id')
        .populate('company_id')
        .populate('creator')
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
            $or: [
                {
                    "en_name": { $regex: regex }
                },
                {
                    "ar_name": { $regex: regex }
                },
            ]
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
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort(req.query.sort)
        .exec()

    res.json({ status: true, data: data })


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

    if (!req.body._id) {
        res.json({ status: false, message: terms.id_required });
        return 0;
    }

    req.body.employee_id = req.query.userID
    if (!req.body.employee_id) {
        res.json({ status: false, message: "Employee " + terms.required })
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


    if (req.body.type == 'Hours') {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Date " + terms.required })
            return 0
        }
        if (!req.body.start_time) {
            res.json({ status: false, message: "Start time " + terms.required })
            return 0
        }
        if (!req.body.end_time) {
            res.json({ status: false, message: "End time " + terms.required })
            return 0
        }
        req.body.end_date = req.body.start_date
        req.body.start_date = req.body.start_date + 'T' + req.body.start_time
        req.body.end_date = req.body.end_date + 'T' + req.body.end_time

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start time must be less than end time" })
            return 0
        }
    } else {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Start date " + terms.required })
            return 0
        }
        if (!req.body.end_date) {
            res.json({ status: false, message: "End date " + terms.required })
            return 0
        }

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start date must be less than end date" })
            return 0
        }
    }

    if (req.body.duration_hours <= 0 && req.body.duration_minutes <= 0) {
        res.json({ status: false, message: "Duration " + terms.required })
        return 0
    }

    var old = await Schema.findById(mongoose.Types.ObjectId(req.body._id))

    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    // req.body.duration_hours = new Date(req.body.end_date) - new Date(req.body.start_date) 
    var old_duration = (old.duration_days * 8) + old.duration_hours  + (old.duration_minutes /60)

    var duration = (req.body.duration_days * 8) + req.body.duration_hours + (req.body.duration_minutes /60)
    req.body.duration_in_hours = duration 
    duration = duration / 8
    req.body.duration_in_days = duration  
  
    var remain = await AllocationController.AllocationsForEmployee(req.body)
    if (remain + old_duration < duration) {
        res.json({ status: false, message: terms.not_enough_leave_hours })
        return 0
    }


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
                    log.saveLog(req, old._id, req.query.userFullName, req.query.userID, events.UpdateCompany, old, update)
                    res.json({ status: true, message: terms.data_has_been_updated })

                } else {
                    res.json({ status: true, message: terms.error })
                }
            })
        }
    })
}

exports.UpdateEmployeeTimeOff = async (req, res) => {

    if (!req.body._id) {
        res.json({ status: false, message: terms.id_required });
        return 0;
    }

    if (!req.query.employee_id) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.query.employee_id)) {
        res.json({ status: false, message: "Employee ID is required" })
        return 0
    }
    req.body.employee_id = mongoose.Types.ObjectId(req.params.employee_id)

    if (!req.body.leave_type_id) {
        res.json({ status: false, message: "Leave type " + terms.required })
        return 0
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.leave_type_id)) {
        res.json({ status: false, message: "Leave type " + terms.not_valid })
        return 0
    }


    if (req.body.type == 'Hours') {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Date " + terms.required })
            return 0
        }
        if (!req.body.start_time) {
            res.json({ status: false, message: "Start time " + terms.required })
            return 0
        }
        if (!req.body.end_time) {
            res.json({ status: false, message: "End time " + terms.required })
            return 0
        }
        req.body.end_date = req.body.start_date
        req.body.start_date = req.body.start_date + 'T' + req.body.start_time
        req.body.end_date = req.body.end_date + 'T' + req.body.end_time

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start time must be less than end time" })
            return 0
        }
    } else {
        if (!req.body.start_date) {
            res.json({ status: false, message: "Start date " + terms.required })
            return 0
        }
        if (!req.body.end_date) {
            res.json({ status: false, message: "End date " + terms.required })
            return 0
        }

        if (new Date(req.body.start_date) > new Date(req.body.end_date)) {
            res.json({ status: false, message: "Start date must be less than end date" })
            return 0
        }
    }

    if (req.body.duration_hours <= 0 && req.body.duration_minutes <= 0) {
        res.json({ status: false, message: "Duration " + terms.required })
        return 0
    }

    var old = await Schema.findById(mongoose.Types.ObjectId(req.body._id))

    var user = await Employee.findOne({ _id: req.body.employee_id })

    req.body.department_id = user.department_id
    req.body.company_id = user.main_company_id

    // req.body.duration_hours = new Date(req.body.end_date) - new Date(req.body.start_date) 
    var old_duration = (old.duration_days * 8) + old.duration_hours  + (old.duration_minutes /60)
    var duration = (req.body.duration_days * 8) + req.body.duration_hours + (req.body.duration_minutes /60)
    req.body.duration_in_days = duration  
    duration = duration / 8
    req.body.duration_in_hours = duration 

    
    var remain = await AllocationController.AllocationsForEmployee(req.body)
    if (remain + old_duration < duration) {
        res.json({ status: false, message: terms.not_enough_leave_hours })
        return 0
    }


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
                    log.saveLog(req, old._id, req.query.userFullName, req.query.userID, events.UpdateCompany, old, update)
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
                log.saveLog(req, data._id, req.query.userFullName, req.query.userID, events.DeleteCompany, '', r)
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