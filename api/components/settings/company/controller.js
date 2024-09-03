var Auth = require('../../auth/authController')
var mongoose = require('mongoose');
var Schema = require('../../settings/company/schema')
const resources = require('../../event_and_resources/resources');
const events = require('../../event_and_resources/events');
const log = require('../../activities/logController')
const terms = require('../../event_and_resources/terms')


exports.New = async (req, res) => {

    if (!req.body.en_name) {
        res.json({ status: false, message: "English " + terms.name_required })
        return 0
    }

    if (!req.body.ar_name) {
        res.json({ status: false, message: "Arabic " + terms.name_required })
        return 0
    }

    // if (!['Organization', 'Personal', 'Governmental'].includes(req.body.type) || !req.body.type || req.body.type == 'undefined') {
    //     res.json({ status: false, message: "type required or not valid" })
    //     return 0
    // }


    await Schema.findOne({
        $or: [
            {
                $and: [
                    {
                        en_name: req.body.en_name
                    },
                    {
                        deleted_at: null
                    }
                ]
            },
            {
                $and: [
                    {
                        ar_name: req.body.ar_name
                    },
                    {
                        deleted_at: null
                    }
                ]
            }
        ]
    })

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
                log.saveLog(req,newRecord._id, req.query.userFullName, req.query.userID, events.CreateCompany, '', newRecord)
                res.json({ status: true, message: terms.success })
                return 0
            }
        })

}




exports.List = async (req, res) => {

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

    var count = await Schema.countDocuments({
        $and: [
            search,
            {
                deleted_at: null
            }
        ]
    }).exec()
    var data = await Schema.find({
        $and: [
            search,
            {
                deleted_at: null
            }
        ]
    })
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


    if (!req.body.en_name) {
        res.json({ status: false, message: "English " + terms.name_required })
        return 0
    }

    if (!req.body.ar_name) {
        res.json({ status: false, message: "Arabic " + terms.name_required })
        return 0
    }

    if (!req.body.type) {
        res.json({ status: false, message: "Type " + terms.name_required })
        return 0
    }
    // if (!['Organization', 'Personal', 'Governmental'].includes(req.body.type) || !req.body.type || req.body.type == 'undefined') {
    //     res.json({ status: false, message: "type required or not valid" })
    //     return 0
    // }

    var old =  await Schema.findById(mongoose.Types.ObjectId(req.body._id))
    await Schema.findById(mongoose.Types.ObjectId(req.body._id)).exec(function (error, response) {
        if (error) throw error;
        if (response) {
            response.set(req.body);
            response.updated_at = Date.now()
            response.editor = req.query.userID
            response.save(function (err, update) {
                if (err) throw err;
                if (update) {
                    log.saveLog(req,req.body._id, req.query.userFullName, req.query.userID, events.UpdateCompany, old, update)
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
                log.saveLog(req, req.query.userFullName, req.query.userID, events.DeleteCompany, '', r)
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