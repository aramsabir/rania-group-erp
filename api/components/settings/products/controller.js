const Schema = require("./schema");
var mongoose = require("mongoose");
const events = require("../../event_and_resources/events");
const log = require("../../log/logController");



exports.New = async (req, res) => {
  var newData = new Schema(req.body);
  var validate = await newData.validation(req.body, 'create')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }
  newData.creator = req.query.userID;
  newData.created_at = Date.now();
  newData.updated_at = Date.now();
  newData.save(function (err, r) {
    if (err) throw err;
    else {
      log.saveLog(req, req.query.userFullName, req.query.userID, events.CreateProduct, '', newData)
      res.json({ status: true, message: "Success" });
      return 0;
    }
  });
};

exports.List = async (req, res) => {

  var search = {}
  if (req.query.search && req.query.search != undefined && req.query.search != 'undefined') {
    search = {
      $or: [
        { name: new RegExp('^' + req.query.search, "i") },
        { en_name: new RegExp('^' + req.query.search, "i") },
      ]
    }
  }

  var data = await Schema.find({ $and: [{ deleted_at: null }, search] })
    .populate('creator')
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort(req.query.sort)
    .exec();

  var count = await Schema.countDocuments({ $and: [{ deleted_at: null }, search] })
    .exec();

  if (data.length == 0) {
    res.json({ status: false, message: "Data not found" });
    return 0;
  } else {
    res.json({ status: true, count, data: data, message: "list of data" });
    return 0;
  }
};

exports.AvailableList = async (req, res) => {

  var search = {}


  var data = await Schema.find({ $and: [{ deleted_at: null }, { status: true }, search] })
    .sort({ sequence: 1, name: 1 })
    .exec();

  if (data.length == 0) {
    res.json({ status: false, message: "Data not found" });
    return 0;
  } else {
    res.json({ status: true, data: data, message: "list of data" });
    return 0;
  }
};

exports.FindOne = async (req, res) => {
  if (!req.query._id) {
    res.json({ status: false, message: "ID required" });
    return 0;
  }
  var _id = req.query._id;

  var data = await Schema.findOne({ $and: [{ deleted_at: null }, { _id: _id }] })
    .exec();
  if (!data) {
    res.json({ status: false, message: "Data not found" });
    return 0;
  } else {
    res.json({ status: true, data: data, message: "list of data" });
    return 0;
  }
};

exports.Update = async (req, res) => {

  var newData = new Schema(req.body);

  var validate = await newData.validation(req.body, 'edit')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  var old = await Schema.findOne({ _id: req.body._id }).exec()

  await Schema.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        editor: req.query.userID,
        updated_at: Date.now(),
        ...req.body,
      },
    },
    { new: true }
  ).exec(function (e, r) {
    if (e) throw e;
    if (r) {
      log.saveLog(req, req.query.userFullName, req.query.userID, events.UpdateProduct, old, r)
      res.json({ status: true, message: "Success" });
      return 0;
    } else {
      res.json({ status: false, message: "Data not found" });
      return 0;
    }
  });
};

exports.delete = async (req, res) => {


  if (!req.query._id) {
    res.json({ status: false, message: "ID required" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
    res.json({ status: false, message: "Invalid data" });
    return 0;
  }

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
      log.saveLog(req, req.query.userFullName, req.query.userID, events.DeleteProduct, '', r)
      res.json({ status: true, message: "Data has been deleted" });
      return 0;
    } else {
      res.json({ status: false, message: "Data not found" });
      return 0;
    }
  });
};
