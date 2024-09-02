let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
const config = require('./configAPI/jwt.config.js');
const Auth = require("./components/auth/auth.js");
const auth = require('./components/auth/authController.js');
const User = require('./components/settings/users/users');
const CompanyUserRoleSchema = require('./components/settings/user-company-role/schema.js');


exports.checkToken = async (req, res, next) => {


  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token)
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  if (token) {

    var user = await Auth.findOne({ token: token }).exec()
    if (!user) {
      res.json({
        status: false,
        success: false,
        message: "Token is not valid"
      });
      return 0;
    }
    var findUser = await User.findOne({ _id: user.user }).exec()
    if (findUser) {
      if (!findUser.active) {
        res.json({
          status: false,
          message: "You are banded"
        });
        return 0;
      }
    }
    else {
      res.json({
        status: false,
        message: "You are not user"
      });
      return 0;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          success: false,
          message: 'Token is not valid'
        });
        return 0;
      } else {
        req.query.userID = findUser._id
        req.decoded = decoded;
        next();

      }
    });
  } else {
    res.json({
      status: false,
      message: 'Auth token is not supplied'
    });
    return 0;
  }
};
exports.checkAccess = async (req, res, next) => {
  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  } else {
    var company_user_roles = await CompanyUserRoleSchema.find({ $and: [{ user_id: userInfo._id }, { deleted_at: null }] }).exec()

    if (company_user_roles.length == 0) {
      res.json({ status: false, message: "You are not authorized!" });
      return 0;
    }

    var search_companies = []
    if (req.query.companies) {
      for (let index = 0; index < req.query.companies.split(',').length; index++) {
        if (mongoose.Types.ObjectId.isValid(req.query.companies.split(',')[index]))
          search_companies.push(mongoose.Types.ObjectId(req.query.companies.split(',')[index]))
      }
    }
 


    var user_companies = []
    req.query.resources = ""
    for (let index = 0; index < company_user_roles.length; index++) {
      if (company_user_roles[index].resources.includes(req.query.access)) {
        user_companies.push(mongoose.Types.ObjectId(company_user_roles[index].company_id))
        req.query.resources += (company_user_roles[index]['resources'] + ',')
      }
    }
    req.query.userID = mongoose.Types.ObjectId(userInfo._id)
    req.query.userFullName = userInfo.full_name
    req.query.profile_photo = userInfo.profile_photo

    if (req.query.skip == 'undefined' || !req.query.skip) { req.query.skip = 0 } else { req.query.skip = parseInt(req.query.skip) }
    if (req.query.limit == 'undefined' || !req.query.limit) { req.query.limit = 20 } else { req.query.limit = parseInt(req.query.limit) }
    if (req.query.sort == 'undefined' || !req.query.sort) {
      req.query.sort = { 'created_at': -1 }
    } else {
      var sort = {}
      if (req.query.sort) {

        if (req.query.sort.split('-')[0] == '') {
          sort[req.query.sort.split('-')[1]] = -1
        } else {
          sort[req.query.sort.split('-')[0]] = 1
        }
      } else {
        sort = { created_at: -1 }
      }
      req.query.sort = sort
    }
    await User.updateOne({_id: req.query.userID},{$set:{last_activity:Date.now()}})

    // var company_permission = []
    // for (let index = 0; index < userInfo.companies.length; index++) {
    //   company_permission.push(mongoose.Types.ObjectId(userInfo.companies[index].company_id));
    // }
    req.query.search_companies = search_companies
    req.query.company_permission = user_companies

    next();
  }
};
exports.AddQueryData = async (req, res, next) => {
  let userInfo = await auth.userInfo(req.headers);
  if (!userInfo) {
    res.json({ status: false, message: "You are not authorized!" });
    return 0;
  } else {
    var company_user_roles = await CompanyUserRoleSchema.find({ $and: [{ user_id: userInfo._id }, { deleted_at: null }] }).exec()
    if (company_user_roles.length == 0) {
      res.json({ status: false, message: "You are not authorized!" });
      return 0;
    }
    var user_companies = []
    req.query.resources = ""

    for (let index = 0; index < company_user_roles.length; index++) {
      user_companies.push(mongoose.Types.ObjectId(company_user_roles[index].company_id))
      req.query.resources += (company_user_roles[index]['resources'] + ',')
    }

    var search_companies = []
    if (req.query.companies)
      for (let index = 0; index < req.query.companies.split(',').length; index++) {
        if (mongoose.Types.ObjectId.isValid(req.query.companies.split(',')[index]))
          search_companies.push(mongoose.Types.ObjectId(req.query.companies.split(',')[index]))
      }

    req.query.userID = mongoose.Types.ObjectId(userInfo._id)
    req.query.userFullName = userInfo.full_name
    req.query.profile_photo = userInfo.profile_photo

    if (req.query.skip == 'undefined' || !req.query.skip) { req.query.skip = 0 } else { req.query.skip = parseInt(req.query.skip) }
    if (req.query.limit == 'undefined' || !req.query.limit) { req.query.limit = 20 } else { req.query.limit = parseInt(req.query.limit) }
    if (req.query.sort == 'undefined' || !req.query.sort) {
      req.query.sort = { 'created_at': -1 }
    }
    else {
      var sort = {}
      if (req.query.sort) {
        if (req.query.sort.split('-')[0] == '') {
          sort[req.query.sort.split('-')[1]] = -1
        } else {
          sort[req.query.sort.split('-')[0]] = 1
        }
      } else {
        sort = { created_at: -1 }
      }
      req.query.sort = sort
    }

    // var company_permission = []
    // for (let index = 0; index < userInfo.companies.length; index++) {
    //   company_permission.push(mongoose.Types.ObjectId(userInfo.companies[index].company_id));
    // }
    req.query.search_companies = search_companies
    req.query.company_permission = user_companies

    next();
  }
};

exports.logout = async (req, res, next) => {
  let userInfo = await auth.userInfo(req.headers);

  var data = await Auth.remove({ user: userInfo._id }).exec()
  if (data) {
    res.json({ status: true, message: "User logout successfully" })
    return
  } else {
    res.json({ status: false, message: "Error please try agin" })
    return
  }
};
exports.addParams = async (req, res, next) => {
  let userInfo = await auth.userInfo(req.headers);

  req.query.userID = mongoose.Types.ObjectId(userInfo._id)
  req.query.userFullName = userInfo.full_name

  if (req.method == "GET") {
    if (req.query.skip == 'undefined' || !req.query.skip) { req.query.skip = 0 } else { req.query.skip = parseInt(req.query.skip) }
    if (req.query.limit == 'undefined' || !req.query.limit) { req.query.limit = 20 } else { req.query.limit = parseInt(req.query.limit) }
    if (req.query.sort == 'undefined' || !req.query.sort) { req.query.sort = '-created_at' } else { req.query.sort = req.query.sort }
  }
  next();

};


// exports.logout = async (req, res) => {

//   let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
//   if (token)
//     if (token.startsWith('Bearer ')) {
//       // Remove Bearer from string
//       token = token.slice(7, token.length);
//     }




//   res.json({ success: true })
//   return
// }



exports.afterCheck = async (req, res) => {
  res.json({
    success: true,
    message: 'Index page'
  });
}

exports.getIterfacesIP = async (req, res) => {


  if (req.socket.localPort != 3501) {
    res.json({ status: false, message: "Access denied" })
    return
  }

  const { networkInterfaces } = require('os');

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
}
exports.testToken = async (req, res) => {


  let userInfo = await auth.userInfo(req.headers);

  if (userInfo) {
    res.json({
      status: true,
      success: true,
      message: "Authenticated successfully"
    });
    return 0;

  } else {
    res.json({
      status: false,
      success: false,
      message: "Token is not valid"
    });
    return 0;
  }


}

