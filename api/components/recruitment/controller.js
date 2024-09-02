var Auth = require('../auth/authController')
var fs = require('fs');
var mongoose = require('mongoose');
var path = require('path');
var Schema = require('./schema')
var BasicData = require('../settings/basic_data/schema')
var UserSchema = require('../settings/users/users')
const resources = require('../event_and_resources/resources');


exports.newData = async (req, res) => {
    if (!req.body.company_id) {
        res.json({ status: false, message: "Company required" })
        return
    }
    if (!req.body.department_id) {
        res.json({ status: false, message: "Department required" })
        return
    }
    if (!req.body.post_id) {
        res.json({ status: false, message: "Post required" })
        return
    }
    if (!req.body.grade_id) {
        res.json({ status: false, message: "Grade required" })
        return
    }
    if (!req.body.date_request) {
        res.json({ status: false, message: "Date request required" })
        return
    }
    if (!req.body.gender) {
        res.json({ status: false, message: "Gender required" })
        return
    }
    if (!req.body.reject_reason_id) {
        req.body.reject_reason_id = null
    }


    var grade_finder = await BasicData.findOne({ _id: req.body.grade_id })
    if (grade_finder) {
        req.body.grade_days = grade_finder.days
    }

    var list = await Schema.find({}).sort({ no: -1 }).limit(2)
    var no = (list.length > 0 ? list[0].no : 0) + 1

    await Schema.findOne({
        $and: [
            { company_id: req.body.company_id },
            { department_id: req.body.department_id },
            { post_id: req.body.post_id },
            { date_request: req.body.date_request },
            { grade_id: req.body.grade_id },
            { gender: req.body.gender },
        ]
    }).exec(function (err, found) {
        if (err) throw err
        if (found) {
            res.json({ status: false, message: 'Duplicated post' })
            return 0
        } else {
            var newRecord = new Schema(req.body)
            newRecord.taskID = no
            newRecord.creator = req.query.userID
            newRecord.created_at = Date.now()
            newRecord.updated_at = Date.now()
            newRecord.save()
            res.json({ status: true, _id: newRecord._id, message: 'Post added successfully' })
            return 0
        }
    })
}
exports.changeLevelCandidate = async (req, res) => {

    var searchID = {}
    if (!req.query._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    if (!req.body.doc_id) {
        res.json({ status: false, message: "candidate ID required" })
        return
    }


    searchID = { _id: mongoose.Types.ObjectId(req.query._id) }



    await Schema.findOneAndUpdate(
        {
            $and: [
                { deleted_at: null },
                searchID,
                searchPermission
            ]
        },
        {
            $push: {
                applications: {
                    candidate_name: req.body.candidate_name,
                    email: req.body.email,
                    level: req.body.level,
                    level: req.body.level,
                    description: req.body.description,
                    creator: req.query.userID,
                    created_at: Date.now()
                }
            }
        }).exec(function (error, response) {
            if (error) throw error;
            if (response) {
                res.json({ status: true, data: response, message: "Comment has been added successfully" })
                return 0
            } else {
                res.json({ status: false, message: "error" })
                return 0
            }
        })

}

exports.postBoard = async (req, res) => {


    var searchID = {}
    if (!req.body._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    searchID = { $and: [{ '_id': mongoose.Types.ObjectId(req.body._id) },] }

    var total_companies = []
    if (req.body.companies) {
        for (let index = 0; index < req.body.companies.length; index++) {
            total_companies.push(mongoose.Types.ObjectId(req.body.companies[index]));
        }
    }
    var searchCompanies = {}
    if (req.body.companies && req.body.companies.length > 0) {
        searchCompanies = { 'company_id': { $in: total_companies } }
    }


    var total_departments = []
    if (req.body.departments) {
        for (let index = 0; index < req.body.departments.length; index++) {
            total_departments.push(mongoose.Types.ObjectId(req.body.departments[index]));
        }
    }
    var searchDepartments = {}
    if (req.body.departments && req.body.departments.length > 0) {
        searchDepartments = { 'unit': { $in: total_departments } }
    }


    var searchDate = {}
    if (req.body.from && req.body.to) {

        var from = req.body.from ? new Date(req.body.from) : new Date(new Date().setDate(1))
        var to = req.body.to ? new Date(req.body.to) : new Date(new Date().setDate(1))

        to = new Date(to.setMonth(new Date(to).getMonth() + 1))

        searchDate = {
            $and: [
                { date_request: { $gte: from } }, { to: { $lt: to } }
            ]
        }
    }


    var data = await Schema.findOne({ $and: [{ deleted_at: null }, searchID, searchCompanies, searchDepartments, searchDate] })

    // var application = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Application" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var screening = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Screening" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var shortlist = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Shortlist" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var phone_screen = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Phone screen" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var interview = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Interview" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var second_round_interview = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Second round interview" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var offer = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Offer" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var hire = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Hire" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])
    // var probationary = await Schema.aggregate([
    //     {
    //         $match: { $and: [searchID, searchDepartments, searchCompanies, searchDate] }
    //     },
    //     {
    //         $unwind: "$applications"
    //     },
    //     {
    //         $match: { "$applications.level": "Probationary" }
    //     },
    //     {
    //         $lookup: {
    //             from: 'basicdatas',
    //             localField: 'applications.reject_reason',
    //             foreignField: '_id',
    //             as: 'applications.reject_reason'
    //         },
    //     },
    //     {
    //         $unwind: { path: "$applications.reject_reason", preserveNullAndEmptyArrays: true }
    //     },
    // ])

    // res.json({ status: true, data, application, screening, shortlist, phone_screen, interview, second_round_interview, offer, hire, probationary })

    res.json({ status: true, data, application: [], screening: [], shortlist: [], phone_screen: [], interview: [], second_round_interview: [], offer: [], hire: [], probationary: [] })
    return

}

exports.getOne = async (req, res) => {


    var searchID = {}
    if (!req.query._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    searchID = { $and: [{ '_id': mongoose.Types.ObjectId(req.query._id) },] }


    // var data = await Schema.findOne({ $and: [{ deleted_at: null }, searchID, searchCompanies, searchDepartments, searchDate] })
    var data = []
    try {
        data = await Schema.aggregate([
            {
                $match: { $and: [{ deleted_at: null }, searchID] }
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'company_id',
                    foreignField: '_id',
                    as: 'company_id'
                },
            },
            {
                $unwind: { path: "$company_id", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'basicdatas',
                    localField: 'department_id',
                    foreignField: '_id',
                    as: 'department_id'
                },
            },
            {
                $unwind: { path: "$department_id", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'basicdatas',
                    localField: 'post_id',
                    foreignField: '_id',
                    as: 'post_id'
                },
            },
            {
                $unwind: { path: "$post_id", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'basicdatas',
                    localField: 'grade_id',
                    foreignField: '_id',
                    as: 'grade_id'
                },
            },
            {
                $unwind: { path: "$grade_id", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'basicdatas',
                    localField: 'unfilled_reason_id',
                    foreignField: '_id',
                    as: 'unfilled_reason_id'
                },
            },
            {
                $unwind: { path: "$unfilled_reason_id", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'prev_emp_id',
                    foreignField: '_id',
                    as: 'prev_emp_id'
                },
            },
            {
                $unwind: { path: "$prev_emp_id", preserveNullAndEmptyArrays: true }
            },
        ])
        if (data.length > 0) {
            data = data[0]
            data.applications = data.applications.reduce((group, applicant) => {
                const { level } = applicant;
                group[level] = group[level] ?? [];
                group[level].push(applicant);
                return group;
            }, {});
            data.applications.Application = data.applications.Application ?? []
            data.applications.Screening = data.applications.Screening ?? []
            data.applications.Shortlist = data.applications.Shortlist ?? []
            data.applications['Phone screen'] = data.applications['Phone screen'] ?? []
            data.applications.Interview = data.applications.Interview ?? []
            data.applications['Second round interview'] = data.applications['Second round interview'] ?? []
            data.applications.Offer = data.applications.Offer ?? []
            data.applications.Hire = data.applications.Hire ?? []
            data.applications.Probationary = data.applications.Probationary ?? []

        }

    } catch (error) {
        console.log(error);
        res.json({ status: false, message: 'error' })
        return
    }

    res.json({ status: true, data, })
    return

}

exports.allData = async (req, res) => {

    var total_companies = []
    if (req.body.companies) {
        for (let index = 0; index < req.body.companies.length; index++) {
            total_companies.push(mongoose.Types.ObjectId(req.body.companies[index]));
        }
    }
    var searchCompanies = {}
    if (req.body.companies)
        if (req.body.companies.length > 0) {
            searchCompanies = { 'company_id': { $in: total_companies } }
        }


    var total_departments = []
    if (req.body.departments) {
        for (let index = 0; index < req.body.departments.length; index++) {
            total_departments.push(mongoose.Types.ObjectId(req.body.departments[index]));
        }
    }
    var searchDepartments = {}
    if (req.body.departments)
        if (req.body.departments.length > 0) {
            searchDepartments = { 'unit': { $in: total_departments } }
        }


    var searchDate = {}
    var from = req.body.from ? new Date(req.body.from) : new Date(new Date().setDate(1))
    var to = req.body.to ? new Date(req.body.to) : new Date(new Date().setDate(1))

    to = new Date(to.setMonth(new Date(to).getMonth() + 1))

    var count = await Schema.countDocuments({ $and: [{ deleted_at: null }, searchCompanies, searchDate, searchDepartments] })

    var data = await Schema.find({ $and: [{ deleted_at: null }, searchCompanies, searchDate, searchDepartments] })
        .populate('company_id')
        .populate('department_id')
        .populate('grade_id')
        .populate('post_id')
        .populate('creator')

    res.json({ status: true, count: count, data: data })
    return

}

exports.findByID = async (req, res) => {

    var searchID = {}
    if (!req.query._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    searchID = { _id: mongoose.Types.ObjectId(req.query._id) }


    var data = await Schema.findOne({ $and: [searchID, { deleted_at: null }] })

    res.json({ status: true, data: data })
    return

}

exports.findOne = async (req, res) => {


    var searchID = {}
    if (!req.query._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    searchID = { _id: mongoose.Types.ObjectId(req.query._id) }





    var data = await Schema.findOne({ $and: [searchID, { deleted_at: null }] })
        .populate('company_id')
        .populate('applications.reject_type')
        .populate('department_id')
        .populate('post_id')
        .populate('creator')
        .exec()


    res.json({ status: true, data: data })
    return

}

exports.updateLevel = async (req, res) => {



    if (!req.query._id) {
        res.json({ status: false, message: "Post ID required" })
        return
    }


    if (!req.body.doc_id) {
        res.json({ status: false, message: "Candidate required" })
        return
    }

    if (!req.body.level || !["Application", "Screening", "Shortlist", "Phone screen", "Interview", "Second round interview", "Offer", "Hire", "Probationary"].includes(req.body.level)) {
        res.json({ status: false, message: "Post status required or not valid" })
        return
    }
    var finder = await Schema.findOne({ $and: [{ _id: req.query._id }, { deleted_at: null }] }).exec()
    if (finder.status == "Completed") {
        res.json({ status: false, message: "Post is completed, you can not do any action" })
        return
    }

    await Schema.updateOne({ $and: [{ _id: req.query._id }, { "applications._id": req.body.doc_id }] }, { $set: { "applications.$.level": req.body.level } }).exec(async function (error, response) {
        if (error) throw error;
        if (response) {
            res.json({ status: true, _id: response._id, message: "Application status has been changed" })
            return
        } else {
            res.json({ status: false, _id: response._id, message: "Application status has not been changed" })
            return
        }
    })
}

exports.updateCandidate = async (req, res) => {



    if (!req.query._id) {
        res.json({ status: false, message: "Post ID required" })
        return
    }


    if (!req.query.doc_id) {
        res.json({ status: false, message: "Candidate required" })
        return
    }

    if (req.body.offers.length > 0) {
        for (let i = 0; i < req.body.offers.length; i++) {
            const offer = req.body.offers[i];
            if (!offer.date) {
                return res.json({ status: false, message: 'Offer date required' })
            }
            if (!offer.salary || offer.salary == '0') {
                return res.json({ status: false, message: 'Offer salary required' })
            }
        }
    }

    if (!req.body.interview_type || !['In-person', 'Online', 'On-phone'].includes(req.body.interview_type)) {
        res.json({ status: false, message: "Interview type required or not valid" })
        return
    }

    if (!req.body.level || !["Application", "Screening", "Shortlist", "Phone screen", "Interview", "Second round interview", "Offer", "Hire", "Probationary"].includes(req.body.level)) {
        res.json({ status: false, message: "Post status required or not valid" })
        return
    }
    var finder = await Schema.findOne({ $and: [{ _id: req.query._id }, { deleted_at: null }] }).exec()
    if (finder.status == "Completed") {
        res.json({ status: false, message: "Post is completed, you can not do any action" })
        return
    }

    try {
        if (req.body.is_selected != 'Existing') {
            var file_name = `${Date.now()}.${req.body.file_type}`
            var file_path = `${CVBankAttachment}/${file_name}`
            let buffer = Buffer.from(req.body.file.split(',')[1], "base64")
            fs.writeFileSync(path.join(file_path), buffer)
            req.body.file_name = file_name
        } else {
            req.body.file_name = req.body.cv
        }





        await Schema.updateOne({
            $and: [{ _id: req.query._id }, { "applications._id": req.query.doc_id }]
        },
            {
                $set: {
                    "applications.$.level": req.body.level,
                    "applications.$.candidate_name": req.body.candidate_name,
                    "applications.$.email": req.body.email,
                    "applications.$.phone": req.body.phone,
                    "applications.$.cv": req.body.file_name,
                    "applications.$.interview_type": req.body.interview_type,
                    "applications.$.reject_reason_id": req.body.reject_reason_id,
                    "applications.$.hiring_date": req.body.hiring_date,
                    "applications.$.joining_date": req.body.joining_date,
                    "applications.$.probationary_date": req.body.probationary_date,
                    "applications.$.note": req.body.note,
                    "applications.$.status": req.body.status,
                    "applications.$.offers": req.body.offers,
                }
            }).exec(async function (error, response) {
                if (error) throw error;
                if (response) {
                    res.json({ status: true, _id: response._id, message: "Candidate has been updated" })
                    return 0
                } else {
                    res.json({ status: false, _id: response._id, message: "Candidate has not been updated" })
                    return 0
                }
            })
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: "something went wrong" })
        return 0
    }

}

exports.approvePost = async (req, res) => {


    if (!req.query._id) {
        res.json({ status: false, message: "Post ID required" })
        return
    }

    var finder = await Schema.findOne({
        $and: [
            { _id: req.query._id },
            { deleted_at: null },
        ]
    })

    if (finder) {
        if (response.status == "Completed") {
            res.json({ status: false, message: "Post is completed, you can not do any action" })
            return
        }

        await Schema.findById(req.query._id).exec(async function (error, response) {
            if (error) throw error;
            if (response) {

                response.status = "Done"
                response.done_at = Date.now()
                response.done_by = req.query.userID
                response.save(function (err, update) {
                    if (err) throw err;
                    if (update) {
                        res.json({ status: true, _id: response._id, message: "Data has been completed" })
                        return
                    } else {
                        res.json({ status: true, message: "error" })
                    }
                })
            }
        })
    } else {
        res.json({ status: false, message: "Post not found" })
        return
    }
}

exports.undoApprovePost = async (req, res) => {


    if (!req.query._id) {
        res.json({ status: false, message: "Post ID required" })
        return
    }

    var finder = await Schema.findOne({
        $and: [
            { _id: req.query._id },
            { deleted_at: null },
        ]
    })

    if (finder) {
        if (finder.status != "Completed") {
            res.json({ status: false, message: "Post was not completed" })
            return
        }
    }

    if (finder) {

        await Schema.findById(req.query._id).exec(async function (error, response) {
            if (error) throw error;
            if (response) {

                response.approved = false
                response.approved_at = null
                response.approved_by = null
                response.save(function (err, update) {
                    if (err) throw err;
                    if (update) {
                        res.json({ status: true, _id: response._id, message: "Approval has been undoed" })
                        return
                    } else {
                        res.json({ status: true, message: "error" })
                    }
                })
            }
        })
    } else {
        res.json({ status: false, message: "Post not found" })
        return
    }
}

exports.updateData = async (req, res) => {


    if (!req.body.company_id) {
        res.json({ status: false, message: "Company required" })
        return
    }
    if (!req.body.department_id) {
        res.json({ status: false, message: "Department required" })
        return
    }
    if (!req.body.post_id) {
        res.json({ status: false, message: "Post required" })
        return
    }
    if (!req.body.grade_id) {
        res.json({ status: false, message: "Grade required" })
        return
    }
    if (!req.body.date_request) {
        res.json({ status: false, message: "Date request required" })
        return
    }
    if (!req.body.gender) {
        res.json({ status: false, message: "Gender required" })
        return
    }

    var grade_finder = await BasicData.findOne({ _id: req.body.grade_id })
    if (grade_finder) {
        req.body.grade_days = grade_finder.days
    }
    var doublicate = await Schema.findOne({
        $and: [
            { _id: { $ne: req.query._id } },
            { company_id: req.body.company_id },
            { department_id: req.body.department_id },
            { post_id: req.body.post_id },
            { date_request: req.body.date_request },
            { grade_id: req.body.grade_id },
            { gender: req.body.gender },
        ]
    })

    if (doublicate) {
        res.json({ status: false, message: "Doublicated data" })
        return
    }


    await Schema.findById(req.body._id).exec(async function (error, response) {
        if (error) throw error;
        if (response) {
            if (response) {
                if (response.status == "Completed" && req.body.status == 'Completed') {
                    res.json({ status: false, message: "Post is completed, you can not do any action" })
                    return
                }
            }



            response.set(req.body);
            response.updated_at = Date.now()
            response.editor = req.query.userID
            response.save(function (err, update) {
                if (err) throw err;
                if (update) {
                    res.json({ status: true, _id: response._id, message: "Data has been updated" })
                    return
                } else {
                    res.json({ status: true, message: "error" })
                }
            })
        }
    })
}

exports.delete = async (req, res) => {

    if (!req.query._id) {
        res.json({ status: false, message: "ID required" })
        return
    }
    if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
        res.json({ status: false, message: "Unknown ID" })
        return
    }

    await Schema.findOneAndUpdate(
        { _id: req.query._id },
        {
            $set: {
                editor: req.query.userID,
                deleted_at: Date.now(),
            },
        }
    ).exec(function (e, r) {
        if (e) throw e;
        if (r) {
            res.json({ status: true, message: "Data has been deleted" });
            return 0;
        } else {
            res.json({ status: false, message: "Data not found" });
            return 0;
        }
    });
}


var moment = require("moment");
var fs = require("fs");
var multer = require("multer");
const { CVBankAttachment } = require('../../configDB/public_paths');
const terms = require('../event_and_resources/terms');
const log = require('../log/log');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, CVBankAttachment);
    },
    filename: function (req, file, cb) {
        var datetimestamp = moment(Date.now()).format("YYYY_MM_DD_HH_mm_ss");

        const ext = file.originalname.split(".")[1];
        nameImage = "CV_" + datetimestamp + "." + ext;
        req.body.name = file.originalname.split(".")[0];
        req.body.file_name = nameImage;
        cb(null, nameImage);
    },
});

(exports.upload = multer({ storage: storage, limits: { fieldSize: 20 * 1024 * 1024 } }).single("file")),
    function (req, res) {
        if (req) {
        }
        req.body.file_name = req.body.file.originalname;
    };


    exports.UploadCandidates = async (req, res) => {

        if (!req.query._id) {
            res.json({ status: false, message: terms.id_required });
            return 0;
        }
        if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
            res.json({ status: false, message: terms.invalid_data });
            return 0;
        }
    
     
    
        if (!req.body.data) {
            res.json({ status: false, message: "Data required" });
            return 0;
        }
        if (req.body.data.length == 0) {
            res.json({ status: false, message: "Data required" });
            return 0;
        }

        for (let index = 0; index < req.body.data.length; index++) {
            delete req.body.data[index]["#"]
            if (!req.body.data[index].level) {
                res.json({ status: false, message: "Level required" +' in candidate '+(index+1)});
                return 0;
            }
            if (!req.body.data[index].level || !["Application", "Screening", "Shortlist", "Phone screen", "Interview", "Second round interview", "Offer", "Hire", "Probationary"].includes(req.body.data[index].level)) {
                res.json({ status: false, message: "Post status required or not valid" +' in candidate '+(index+1) })
                return
            }
            if (!req.body.data[index].candidate_name) {
                res.json({ status: false, message: "Candidate " + terms.name_required +' in candidate '+(index+1)});
                return 0;
            }
        
            if (!req.body.data[index].email) {
                res.json({ status: false, message: terms.email_required +' in candidate '+(index+1)});
                return 0;
            }
            if (!req.body.data[index].phone) {
                res.json({ status: false, message: terms.phone_required +' in candidate '+(index+1)});
                return 0;
            }

            req.body.data[index].creator= req.query.userID
            req.body.data[index].created_at= Date.now()
            req.body.data[index].updated_at= Date.now()
        }
    
        await Schema.findOneAndUpdate(
            { _id: req.query._id },
            {
                $push: {
                    applications: {
                        $each: req.body.data,
                    }
                },
            }
        ).exec(function (err, r) {
            if (err) throw err;
            else {
                res.json({ status: true, message: "Candidates has been uploaded" });
                return 0;
            }
        });
    }

exports.UploadCV = async (req, res) => {

    if (!req.query._id) {
        res.json({ status: false, message: terms.id_required });
        return 0;
    }
    if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
        res.json({ status: false, message: terms.invalid_data });
        return 0;
    }


    if (!req.body.level) {
        res.json({ status: false, message: "Level required" });
        return 0;
    }

    if (!req.body.candidate_name) {
        res.json({ status: false, message: "Candidate " + terms.name_required });
        return 0;
    }

    if (!req.body.email) {
        res.json({ status: false, message: terms.email_required });
        return 0;
    }
    if (!req.body.phone) {
        res.json({ status: false, message: terms.phone_required });
        return 0;
    }

    if (!req.body.reject_reason_id) {
        req.body.reject_reason_id = null
    }

    if (req.body.file) {
        try {
            var file_name = `${Date.now()}.${req.body.file_type}`
            var file_path = `${CVBankAttachment}/${file_name}`
            let buffer = Buffer.from(req.body.file.split(',')[1], "base64")
            fs.writeFileSync(path.join(file_path), buffer)
            req.body.file_name = file_name
        } catch (error) {
            throw error
        }

    }


    await Schema.findOneAndUpdate(
        { _id: req.query._id },
        {
            $push: {
                applications: {
                    candidate_name: req.body.candidate_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    level: req.body.level,
                    note: req.body.note,
                    reject_reason_id: req.body.reject_reason_id,
                    joining_date: req.body.joining_date,
                    probationary_date: req.body.probationary_date,
                    level: req.body.level,
                    hiring_date: req.body.hiring_date,
                    cv: req.body.is_selected ? req.body.file_name_path : req.body.file_name ? req.body.file_name : "",
                    creator: req.query.userID,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                }
            },
        }
    ).exec(function (err, r) {
        if (err) throw err;
        else {
            res.json({ status: true, message: "Attachment has been created" });
            return 0;
        }
    });
}


exports.downloadFile = async (req, res) => {
    var fs = require('fs')
    var file = fs.createReadStream(CVBankAttachment + '/' + req.query.file_name);
    var stat = fs.statSync(CVBankAttachment + '/' + req.query.file_name);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${req.query.file_name}`);
    file.pipe(res);

};


exports.removeCV = async (req, res) => {
    if (!req.query._id) {
        res.json({ status: false, message: "ID required" });
        return 0;
    }

    var search = { "applications._id": mongoose.Types.ObjectId(req.query._id) }


    var data = await Schema.aggregate([
        {
            $match: search
        },
        {
            $unwind: "$applications"
        },
        {
            $match: search
        },
    ])

    if (data.length > 0) {
        if (data[0].applications)
            if (fs.existsSync(taskapplications + '/' + data[0].applications.file_name))
                fs.unlinkSync(taskapplications + '/' + data[0].applications.file_name)

        await Schema.findOneAndUpdate(
            search,
            { $pull: { "applications": { _id: data[0].applications._id } } }).exec()


        res.json({ status: true, message: "CV removed successfully" })
        return 0
    } else {
        res.json({ status: false, message: "Error CV not removed" })
        return 0
    }


};





exports.report = async (req, res) => {

    var total_companies = []
    if (req.body.companies) {
        for (let index = 0; index < req.body.companies.length; index++) {
            if (mongoose.Types.ObjectId.isValid(req.body.companies[index]))
                total_companies.push(mongoose.Types.ObjectId(req.body.companies[index]));
        }
    }
    var searchCompanies = {}
    if (req.body.companies)
        if (req.body.companies.length > 0) {
            searchCompanies = { 'company_id': { $in: total_companies } }
        }


    var total_departments = []
    if (req.body.departments) {
        for (let index = 0; index < req.body.departments.length; index++) {
            if (mongoose.Types.ObjectId.isValid(req.body.departments[index]))
                total_departments.push(mongoose.Types.ObjectId(req.body.departments[index]));
        }
    }
    var searchDepartments = {}
    if (req.body.departments)
        if (req.body.departments.length > 0) {
            searchDepartments = { 'department_id': { $in: total_departments } }
        }

    var total_posts = []
    if (req.body.posts) {
        for (let index = 0; index < req.body.posts.length; index++) {
            if (mongoose.Types.ObjectId.isValid(req.body.posts[index]))
                total_posts.push(mongoose.Types.ObjectId(req.body.posts[index]));
        }
    }

    var searchposts = {}
    if (req.body.posts)
        if (req.body.posts.length > 0) {
            searchposts = { 'post_id': { $in: total_posts } }
        }


    var searchDate = {}
    var from = req.body.from ? new Date(req.body.from) : new Date(new Date().setDate(1))
    var to = req.body.to ? new Date(req.body.to) : new Date(new Date().setDate(new Date().getDate() + 30))

    // to = new Date(to.setMonth(new Date(to).getMonth() + 1))

    searchDate = {
        date_request: { $gte: from, $lt: to }
    }


    var count = await Schema.countDocuments({ $and: [{ deleted_at: null }, searchCompanies, searchDate, searchposts, searchDepartments] })

    var data = await Schema.find({ $and: [{ deleted_at: null }, searchCompanies, searchDate, searchposts, searchDepartments] })
        .populate('company_id')
        .populate('department_id')
        .populate('grade_id')
        .populate('applications.reject_reason_id')
        .populate('post_id')
        .populate('creator')

    res.json({ status: true, count: count, data: data })
    return

}