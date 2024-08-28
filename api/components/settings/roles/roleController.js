const Role = require("./roles");
var mongoose = require("mongoose");
const events = require("../../event_and_resources/events");
const log = require("../../log/logController");



exports.newRole = async (req, res) => {
  var newData = new Role(req.body);
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
      log.saveLog(req, req.query.userFullName, req.query.userID, events.CreateRole, '', newData)
      res.json({ status: true, message: "Role created" });
      return 0;
    }
  });
};

exports.roleList = async (req, res) => {

  var search = {}
  if (req.query.search && req.query.search != undefined && req.query.search != 'undefined') {
    search = {
      $or: [
        { name: new RegExp('^' + req.query.search, "i") },
        { description: new RegExp('^' + req.query.search, "i") },
      ]
    }
  }

  var roles = await Role.find({ $and: [{ deleted_at: null }, search] })
    .populate('creator')
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort(req.query.sort)
    .exec();

  var count = await Role.countDocuments({ $and: [{ deleted_at: null }, search] })
    .exec();

  if (roles.length == 0) {
    res.json({ status: false, message: "Role not found" });
    return 0;
  } else {
    res.json({ status: true, count, data: roles, message: "list role" });
    return 0;
  }
};

exports.oneRole = async (req, res) => {
  if (!req.query._id) {
    res.json({ status: false, message: "Role ID required" });
    return 0;
  }
  var _id = req.query._id;

  var roles = await Role.findOne({ $and: [{ deleted_at: null }, { _id: _id }] })
    .exec();
  if (!roles) {
    res.json({ status: false, message: "Role not found" });
    return 0;
  } else {
    res.json({ status: true, data: roles, message: "list role" });
    return 0;
  }
};

exports.updateRole = async (req, res) => {

  var newData = new Role(req.body);

  var validate = await newData.validation(req.body, 'edit')
  if (!validate.status) {
    res.json({ status: false, message: validate.message });
    return 0;
  }

  var old = await Role.findOne({ _id: req.body._id }).exec()

  await Role.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        editor: req.query.userID,
        name: req.body.name,
        description: req.body.description,
        resource: req.body.resource,
        updated_at: Date.now(),
      },
    },
    { new: true }
  ).exec(function (e, r) {
    if (e) throw e;
    if (r) {
      log.saveLog(req, req.query.userFullName, req.query.userID, events.UpdateRole, old, r)
      res.json({ status: true, message: "Role has been updated" });
      return 0;
    } else {
      res.json({ status: false, message: "Role not found" });
      return 0;
    }
  });
};

exports.deleteRole = async (req, res) => {


  if (!req.query._id) {
    res.json({ status: false, message: "Unknown role" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
    res.json({ status: false, message: "Invalid role" });
    return 0;
  }

  await Role.findOneAndUpdate(
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
      log.saveLog(req, req.query.userFullName, req.query.userID, events.DeleteRole, '', r)
      res.json({ status: true, message: "Data has been deleted" });
      return 0;
    } else {
      res.json({ status: false, message: "Data not found" });
      return 0;
    }
  });
};
