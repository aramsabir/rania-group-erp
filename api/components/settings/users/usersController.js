const User = require("./users");
const Auth = require("../../auth/authController");
const auth = require("../../auth/authController");
var multer = require("multer");
var resources = require("../../event_and_resources/resources");
var mongoose = require("mongoose");
const { ProfilePhoto } = require('../../../configDB/public_paths')
const events = require('../../event_and_resources/events')
const terms = require('../../event_and_resources/terms')
const log = require('../../log/logController')
const Company = require('../company/schema')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ProfilePhoto);
  },
  filename: function (req, file, cb) {
    var moment = require("moment");

    var datetimestamp = moment(Date.now()).format("YYYY_MM_DD_HH_mm_ss");

    const ext = file.originalname.split(".")[1];
    var nameImage = file.originalname.split(".")[0];
    nameImage = nameImage + datetimestamp + "." + ext;
    req.body.photo_id = nameImage;
    cb(null, nameImage);
  },
});

(exports.upload = multer({ storage: storage }).single("file")),
  function (req, res) {
    if (req) {
    }
    req.body.photo_id = req.body.file.originalname;
  };

exports.EditUserProfile = async (req, res) => {
  let userInfo = await Auth.userInfo(req.headers);

  if (!userInfo.role_id.resource.split(",").includes(resources.UserWrite)) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  }

  await User.findById(req.body._id).exec(function (
    error,
    response
  ) {
    if (error) throw error;
    if (response) {
      var new_user = User.countDocuments({
        user_name: req.body.user_name,
      }).exec();

      if (new_user > 1) {
        res.json({ status: false, message: "user name Dublicated" });
        return 0;
      } else {
        var new_user2 = User.countDocuments({
          full_name: req.body.full_name,
        }).exec();
        if (new_user2 > 1) {
          res.json({ status: false, message: "Full name Dublicated" });
          return 0;
        } else {
          var new_user3 = User.countDocuments({
            email: req.body.email,
          }).exec();
          if (new_user3 > 1) {
            res.json({ status: false, message: "Email Dublicated" });
            return 0;
          } else {
            response.profile_photo = req.body.photo_id;
            response.email = req.body.email;
            response.user_name = req.body.user_name;
            response.role_id = req.body.role_id;
            response.phone = req.body.phone;
            response.part = req.body.part;
            response.creator = userInfo._id;
            if (req.body.password)
              response.password = response.generateHash(req.body.password);
            response.save(function (err, update) {
              if (err) throw err;
              if (update) {
                res.json({ status: true, message: "User updated" });
                return 0;
              } else {
                res.json({ status: false, message: "error" });
                return 0;
              }
            });
          }
        }
      }
    } else {
      res.json({ status: false, message: "User not found" });
      return 0;
    }
  });
};

(exports.uploadProfile = multer({ storage: storage }).single("file")),
  function (req, res) {
    if (req) {
    }
    req.body.photo_id = req.body.file.originalname;
  };

exports.EditMyProfile = async (req, res) => {
  let userInfo = await Auth.userInfo(req.headers);

  await User.findById(userInfo._id).exec(function (
    error,
    response
  ) {
    if (error) throw error;
    if (response) {

      // response.set(req.body);
      response.profile_photo = req.body.photo_id;
      response.save(function (err, update) {
        if (err) throw err;
        if (update) {
          res.json({ status: true, message: "User updated" });
          return 0;
        } else {
          res.json({ status: false, message: "error" });
          return 0;
        }
      });
    } else {
      res.json({ status: false, message: "User not found" });
      return 0;
    }
  });
};

exports.newUser = async (req, res) => {

  if (!req.body.full_name) {
    res.json({ status: false, message: "Full Name Require" });
    return 0;
  }
  if (!req.body.user_name) {
    res.json({ status: false, message: "User Name Require" });
    return 0;
  }
  if (!req.body.email) {
    res.json({ status: false, message: "Email required" });
    return 0;
  }

  if (!validEmail(req.body.email)) {
    res.json({ status: false, message: "Email not valid" });
    return 0;
  }
  if (!req.body.phone) {
    res.json({ status: false, message: "Phone required" });
    return 0;
  }
  if (new String(req.body.phone).valueOf().length != 10 && new String(req.body.phone).valueOf().length != 11) {
    res.json({ status: false, message: "Phone not valid" });
    return 0;
  }
  if (!validPhone(req.body.phone)) {
    res.json({ status: false, message: "Phone not valid!" });
    return 0;
  }
  if (!req.body.password) {
    res.json({ status: false, message: "User Password required" });
    return 0;
  }


  var new_user = await User.countDocuments({
    $and: [
      {
        $or: [
          { user_name: req.body.user_name },
          { email: req.body.email },
        ]
      },
      { deleted_at: null },
    ],
  }).exec();

  if (new_user >= 1) {
    res.json({ status: false, message: "User name or email Dublicated" });
    return 0;
  } else {
    var user = new User(req.body);
    user.password = user.generateHash(req.body.password);
    user.type = req.body.type
    user.job_title = req.body.job_title;
    user.creator = req.query.userID;
    user.created_at = Date.now();
    user.updated_at = Date.now();
    user.save(function (err) {
      if (err) throw err;
      else res.json({ status: true, message: "user inserted" });
    });
  }
};

exports.newEmployee = async (req, res) => {

  if (!req.body.full_name) {
    res.json({ status: false, message: "Full Name Require" });
    return 0;
  }
  if (!req.body.user_name) {
    res.json({ status: false, message: "User Name Require" });
    return 0;
  }
  if (!req.body.email) {
    res.json({ status: false, message: "Email required" });
    return 0;
  }
  if (!validEmail(req.body.email)) {
    res.json({ status: false, message: "Email not valid" });
    return 0;
  }
  if (!req.body.phone) {
    res.json({ status: false, message: "Phone required" });
    return 0;
  }
  if (new String(req.body.phone).valueOf().length != 10 && new String(req.body.phone).valueOf().length != 11) {
    res.json({ status: false, message: "Phone not valid" });
    return 0;
  }
  if (!validPhone(req.body.phone)) {
    res.json({ status: false, message: "Phone not valid!" });
    return 0;
  }
  if (!req.body.password) {
    res.json({ status: false, message: "User Password required" });
    return 0;
  }
  // if (!['Employee', 'Staff', 'HR'].includes(req.body.type)) {
  //   res.json({ status: false, message: "type required" });
  //   return 0;
  // }

  var new_user = await User.countDocuments({
    $and: [
      { user_name: req.body.user_name },
      { deleted_at: null },
    ],
  }).exec();

  if (new_user >= 1) {
    res.json({ status: false, message: "User name Dublicated" });
    return 0;
  } else {
    var user = new User(req.body);
    user.password = user.generateHash(req.body.password);
    user.type = req.body.type
    user.job_title = req.body.job_title;
    user.creator = req.query.userID;
    user.created_at = Date.now();
    user.updated_at = Date.now();
    user.save(function (err) {
      if (err) throw err;
      else res.json({ status: true, message: "user inserted" });
    });
  }
};

function validEmail(email) {
  // const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  // return regex.test(email);
  var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return reg.test(email);
}
function validPhone(phone) {
  const regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
  return regex.test(phone);
}
function validPhoneIsInIraq(phone) {

  if (new String(phone).valueOf().substring(0, 1) != 0 && new String(phone).valueOf().length == 11)
    return false
  if (new String(phone).valueOf().substring(1, 2) != 7 && new String(phone).valueOf().length == 11)
    return false
  if (new String(phone).valueOf().substring(0, 1) != 7 && new String(phone).valueOf().length == 10)
    return false
  return true
}

exports.updateUserStatus = async (req, res) => {
 

  if (!req.body._id) {
    res.json({ status: false, message: "Unknown user" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    res.json({ status: false, message: "Unknown user" });
    return 0;
  }
  if (req.body.active != true) {
    if (req.body.active != false) {
      res.json({ status: false, message: "User state required" });
      return 0;
    }
  }

  await User.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { active: req.body.active } }
  ).exec(function (e, r) {
    if (e) throw e;
    if (r) {
      res.json({ status: true, message: "User activity has been updated" });
      return 0;
    } else {
      res.json({ status: false, message: "Activity not updated" });
      return 0;
    }
  });
};


exports.changemypassword = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo) {
    res.json({ status: false, message: "You have not permision" });
    return 0;
  }

  if (!req.body.password) {
    res.json({ status: false, message: "Old password required" });
    return 0;
  }


  if (!req.body.n_password) {
    res.json({ status: false, message: "New password required" });
    return 0;
  }

  if (!req.body.r_n_password) {
    res.json({ status: false, message: "Re-new password required" });
    return 0;
  }

  if (req.body.n_password != req.body.r_n_password) {
    res.json({ status: false, message: "Password not matched" });
    return 0;
  }

  var user = await User.findById(userInfo._id).exec();
  if (!user.validPassword(req.body.password)) {
    res.json({ status: false, message: "Old password not matched" });
    return 0;
  }
  if (user) {
    user.password = user.generateHash(req.body.n_password);
    user.save();
    res.json({ status: true, message: "Password updated" });
    return 0;
  } else {
    res.json({ status: false, message: "User not found" });
    return 0;
  }
};

exports.restPasswordForUser = async (req, res) => {

  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo) {
    res.json({ status: false, message: "You have not permision" });
    return 0;
  }
  if (!userInfo.role_id.resource.split(",").includes(resources.UserUpdate)) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  }

  var user = await User.findById(req.body._id).exec();

  if (user) {
    user.password = user.generateHash("System#12345");
    user.save();
    res.json({ status: true, message: "Password updated" });
    return 0;
  } else {
    res.json({ status: false, message: "user not found" });

  }
};

exports.List = async (req, res) => {
   


  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let sort = req.query.sort;

  // console.log(req.query.search_companies );
  
  
  await User.find({ $and: [{ deleted_at: null }, { main_company_id: { $in: req.query.company_permission } }, { main_company_id: { $in: req.query.search_companies } }] })
    .populate("main_company_id")
    .populate("department_id")
    .populate({ path: "creator", select: { password: 0 } })
    .select({ password: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec(function (err, response) {
      if (response) {
        User.countDocuments({ $and: [{ deleted_at: null }, { main_company_id: { $in: req.query.company_permission } },{ main_company_id: { $in: req.query.search_companies } }] }).exec(function (err, count) {
          res.json({
            status: true,
            data: response,
            count: count,
          });
        });
      } else {
        console.log(err);
        res.json({ status: false })
      }
    });
};

exports.Available = async (req, res) => {
   

  
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let sort = req.query.sort;

  await User.find({ $and: [{ deleted_at: null },{ main_company_id: { $in: req.query.company_permission } }] })
    .populate("main_company_id")
    .populate("department_id")
    .populate({ path: "creator", select: { password: 0 } })
    .select({ password: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec(function (err, response) {
      if (response) {
        User.countDocuments({ $and: [{ deleted_at: null }] }).exec(function (err, count) {
          res.json({
            status: true,
            data: response,
            count: count,
          });
        });
      } else {
        console.log(err);
        res.json({ status: false })
      }
    });
};

exports.getEmployees = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  }

  if (userInfo.role_id) {
    if (!userInfo.role_id.resource.split(",").includes(resources.EmployeeRead)) {
      res.json({ status: false, message: "You are not authorized!" });
      return 0;
    }
  } else {
    res.json({ status: false, message: "You have not role!" });
    return 0;
  }

  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let sort = req.query.sort;

  await User.find({
    $and: [{ deleted_at: null }, {
      $or: [
        { type: 'Employee' },
        { type: 'HR' },
      ]
    }]
  })
    .populate("role_id")
    .populate({ path: "creator", select: { password: 0 } })
    .select({ password: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec(function (err, response) {
      if (response) {
        User.countDocuments({ $and: [{ deleted_at: null }] }).exec(function (err, count) {
          res.json({
            status: true,
            data: response,
            count: count,
          });
        });
      }
    });
};



exports.getAllUsers = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);

  if (!userInfo.role_id.resource.split(",").includes(resources.UserRead)) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  }

  await User.find({ deleted_at: null }).exec(function (err, response) {
    if (response) {

      res.json({ status: true, data: response });
    }
  });
};


exports.editUser = async (req, res) => {

  if (!req.query._id) {
    res.json({ status: false, message: "Unknown user" });
    return 0
  }
  if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
    res.json({ status: false, message: "Unknown user" });
    return 0;
  }

  if (!req.body.full_name) {
    res.json({ status: false, message: "Full Name Require" });
    return 0;
  }

  if (!req.body.user_name) {
    res.json({ status: false, message: "User Name Require" });
    return 0;
  }
  if (!req.body.email) {
    res.json({ status: false, message: "Email required" });
    return 0;
  }

  if (!req.body.phone) {
    res.json({ status: false, message: "Phone required" });
    return 0;
  }


  await User.findById(req.query._id).exec(function (error, response) {
    if (error) throw error;
    if (response) {
      response.set(req.body);
      if (req.body.password)
        response.password = response.generateHash(req.body.password);
      response.editor = req.query.userID;
      response.updated_at = Date.now();
      response.save(function (err, update) {
        if (err) throw err;
        if (update) {
          res.json({ status: true, message: "User updated" });
        } else {
          res.json({ status: true, message: "error" });
        }
      });
    }
  });
};

exports.getCompanyListForUser = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);
  // if (!userInfo.role_id.resource.split(",").includes(resources.UserRead)) {
  //   res.json({ status: false, message: "You are not authorized!" });
  //   return 0;
  // }

  if (!req.query._id) {
    res.json({ status: false, message: "Unknown user" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
    res.json({ status: false, message: "Unknown user" });
    return 0;
  }

  var userFinder = await User.findOne({ _id: req.query._id }).exec()
  var companyListUser = []

  if (userFinder)
    for (let index = 0; index < userFinder.companies.length; index++) {
      companyListUser.push(mongoose.Types.ObjectId(userFinder.companies[index].company_id))
    }


  var companies = await Company.aggregate([
    {
      $project: {
        en_name: 1,
        ar_name: 1,
        type: 1,
        company_status:
        {
          $cond: [{ $in: ["$_id", companyListUser] }, true, false]
        }
      }
    },
    {
      $sort: { company_status: 1 }
    }
  ])
  res.json({ status: true, data: companies })
  return 0
}

exports.pushCompanyForUser = async (req, res) => {

  if (!req.body._id) {
    res.json({ status: false, message: "User required" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    res.json({ status: false, message: "Invalid user" });
    return 0;
  }

  if (!req.body.company_id) {
    res.json({ status: false, message: "company required" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.company_id)) {
    res.json({ status: false, message: "Invalid company" });
    return 0;
  }

  var user = await User.aggregate([
    {
      $match: { $and: [{ 'companies.company_id': mongoose.Types.ObjectId(req.body.company_id) }, { _id: mongoose.Types.ObjectId(req.body._id) }] }
    },
    {
      $unwind: "$companies"
    },
    {
      $match: { $and: [{ 'companies.company_id': mongoose.Types.ObjectId(req.body.company_id) }] }
    }
  ])
  if (user.length > 0) {
    res.json({ status: false, message: "company alredy exist" });
    return 0;
  }

  var update = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { companies: { company_id: req.body.company_id, part: req.body.type, creator: req.query.userID, created_at: Date.now() } } }).exec()

  if (update) {
    res.json({ status: true, message: "company added successfully" })
    return 0
  } else {
    res.json({ status: false, message: "Error company was not added" })
    return 0
  }
}
exports.popCompanyForUser = async (req, res) => {


  if (!req.body._id) {
    res.json({ status: false, message: "User required" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    res.json({ status: false, message: "Invalid user" });
    return 0;
  }

  if (!req.body.company_id) {
    res.json({ status: false, message: "company required" });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.company_id)) {
    res.json({ status: false, message: "Invalid company" });
    return 0;
  }

  var userFinder = await User.findOne({ $and: [{ 'companies.company_id': req.body.company_id }, { _id: req.body._id }] }).exec()

  if (userFinder != null) {


    var update = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { "companies": { company_id: req.body.company_id, } } }).exec()

    if (update) {
      res.json({ status: true, message: "company removed successfully" })
      return 0
    } else {
      res.json({ status: false, message: "Error, company was not removed" })
      return 0
    }
  } else {
    res.json({ status: false, message: "company does not exist" });
    return 0;
  }
}


exports.delete = async (req, res) => {

  if (!req.query._id) {
    res.json({ status: false, message: terms.id_required });
    return 0;
  }
  if (!mongoose.Types.ObjectId.isValid(req.query._id)) {
    res.json({ status: false, message: terms.invalid_data });
    return 0;
  }


  var data = await User.findOne({ $and: [{ deleted_at: null }, { _id: req.query._id }] })
    .exec();

  if (data) {
    await User.findOneAndUpdate(
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
        log.saveLog(req, req.query.userFullName, req.query.userID, events.DeleteUser, '', r)
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

exports.userInformation = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);

  var search = {};
  if (req.params._id) {
    if (!req.params._id) {
      res.json({ status: false, message: "Unknown user" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      res.json({ status: false, message: "Unknown user" });
      return;
    }
    search = { _id: req.params._id };
  } else {
    search = { _id: userInfo._id };
  }

  var user = await User.findOne(search).select({ password: 0 }).exec();

  if (user) {
    res.json({ data: user, status: true });
    return 0;
  } else {
    res.json({ status: false });
    return 0;
  }
};
exports.myRoles = async (req, res) => {


    
    res.json({ resources:req.query.resources,data:{profile_photo:req.query.profile_photo,full_name:req.query.userFullName}, status: true });
    return 0;
 
};

exports.one = async (req, res) => {
  let userInfo = await auth.userInfo(req.headers);


  if (!req.query._id) {
    res.json({ status: false, message: "Unknown user" });
    return;
  }
  var user = await User.findOne({ _id: req.query._id }).select({ password: 0 }).exec();

  if (user) {
    res.json({ data: user, status: true });
    return 0;
  } else {
    res.json({ status: false });
    return 0;
  }
};
