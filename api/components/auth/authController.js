var User = require("../settings/users/users");
var CompanyUserRoleSchema = require("../settings/user-company-role/schema");
var Auth = require("./auth");
var mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let config = require("../../configAPI/jwt.config");
var log = require('../activities/logController');
const events = require("../event_and_resources/events");


exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!req.body.email) {
    res.json({
      success: false,
      message: "Authentication failed! Please check user or password",
    });
    return 0;
  }
  if (!req.body.password) {
    res.json({
      success: false,
      message: "Authentication failed! Please check user or password",
    });
    return 0;
  }

  await User.findOne({ $and: [{ $or: [{ email: email }, { user_name: email }] }, { deleted_at: null }] }).exec(function (err, user) {

    if (user) {

      if (user.validPassword(req.body.password)) {
        if (user.active) {
          var auth = new Auth();
          auth.user = user._id;
          auth.token = auth.randomString();
          auth.agent = auth.generateHash(req.useragent.source);
          Auth.findOne({ user: auth.user, agent: auth.agent },async function (
            err,
            row
          ) {
            if (row) {

              var company_user_roles = await CompanyUserRoleSchema.find({ user_id: user._id }).exec()
              var user_companies = []
              req.query.resources = ""
              for (let index = 0; index < company_user_roles.length; index++) {
                    user_companies.push(mongoose.Types.ObjectId(company_user_roles[index].company_id))
                    req.query.resources += (company_user_roles[index]['resources'] +',')
              }

              let token = jwt.sign({ userID: user._id }, config.secret, {
                expiresIn: "300h", // expires in 24 hours,
              });
              auth.token = token;
              auth.save(async function (err) {
                if (err) throw err;
                log.saveLog(req,user._id, user.user_name, user._id, events.LoginSuccess, ("email: " + req.body.email), '')
                await User.updateOne({_id: user._id},{$set:{last_login:Date.now()}})
                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  resources:req.query.resources,
                  companies:user_companies,
                  email: user.email,
                  type: user.type,
                  B_token: auth.token,
                  name: user.name,
                  role: user.role,
                });
                return 0;
              });

            } else {
              var company_user_roles = await CompanyUserRoleSchema.find({ user_id: user._id }).exec()
              var user_companies = []
              req.query.resources = ""
              for (let index = 0; index < company_user_roles.length; index++) {
                    user_companies.push(mongoose.Types.ObjectId(company_user_roles[index].company_id))
                    req.query.resources += (company_user_roles[index]['resources'] +',')
              }


              let token = jwt.sign({ userID: user._id }, config.secret, {
                expiresIn: "300h", // expires in 24 hours,
              });
              jwt.decode()
              auth.token = token;
              auth.save(async function (err) {
                if (err) throw err;

                log.saveLog(req, user._id,user.user_name, user._id, events.LoginSuccess, ("email: " + req.body.email), '')
                await User.updateOne({_id: user._id},{$set:{last_login:Date.now()}})

                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  email: user.email,
                  resources:req.query.resources,
                  companies:user_companies,
                  type: user.type,
                  B_token: auth.token,
                  name: user.name,
                  role: user.role,
                });
                return 0;
              });
            }
          });
        } else {
          log.saveLog(req,user._id, user.user_name, user._id, events.LoginFailedUserActivation, ("email: " + req.body.email), '')
          res.json({
            success: false,
            message: "User banned please call administrator",
          });
          return 0;
        }

      } else {
        log.saveLog(req,user._id, user.user_name, user._id, events.LoginFailedIncorectData, ("email: " + req.body.email), '')

        res.json({
          success: false,
          message: "Incorrect email or password",
        });
        return 0;
      }
    } else {
      log.saveLog(req,null, '', null, events.LoginFailedIncorectData, ("email: " + req.body.email), '')
      res.json({
        success: false,
        message: "Incorrect email or password",
      });
      return 0;
    }
  });
};

exports.loginPredictor = async (req, res) => {
  let phone = req.body.phone
  let password = req.body.password;

  if (!req.body.phone) {
    res.json({
      success: false,
      message: "Authentication failed! Please check phone or password",
    });
    return 0;
  }
  if (!req.body.password) {
    res.json({
      success: false,
      message: "Authentication failed! Please check phone or password",
    });
    return 0;
  }

  var user = await User.findOne({ $and: [{ phone: phone }, { deleted_at: null }] })
  await User.findOne({ $and: [{ phone: phone }, { deleted_at: null }] }).exec(function (err, user) {
    if (user) {
      if (user.validPassword(req.body.password)) {
        if (user.active) {
          var auth = new Auth();
          auth.user = user._id;
          auth.token = auth.randomString();
          auth.agent = auth.generateHash(req.useragent.source);

          Auth.findOne({ user: auth.user, agent: auth.agent }, function (
            err,
            row
          ) {
            if (row) {

              let token = jwt.sign({ userID: user._id }, config.secret, {
                expiresIn: "300h", // expires in 24 hours,
              });
              auth.token = token;
              auth.save(function (err) {
                if (err) throw err;
                log.saveLog(req, user.user_name, user._id, events.LoginSuccess, ("phone: " + req.body.phone), '')

                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  phone: user.phone,
                  type: user.type,
                  B_token: auth.token,
                  name: user.name,
                  role: user.role,
                });
                return 0;
              });

            } else {
              let token = jwt.sign({ userID: user._id }, config.secret, {
                expiresIn: "300h", // expires in 24 hours,
              });
              jwt.decode()
              auth.token = token;
              auth.save(function (err) {
                if (err) throw err;

                log.saveLog(req, user.user_name, user._id, events.LoginSuccess, ("phone: " + req.body.phone), '')

                res.json({
                  success: true,
                  message: "Login to the system successfully",
                  token: token,
                  phone: user.phone,
                  type: user.type,
                  B_token: auth.token,
                  name: user.name,
                  role: user.role,
                });
                return 0;
              });
            }
          });
        } else {
          log.saveLog(req, user.user_name, user._id, events.LoginFailedUserActivation, ("phone: " + req.body.phone), '')
          res.json({
            success: false,
            message: "User banned please call administrator",
          });
          return 0;
        }

      } else {
        log.saveLog(req, user.user_name, user._id, events.LoginFailedIncorectData, ("phone: " + req.body.phone), '')

        res.json({
          success: false,
          message: "Incorrect phone or password",
        });
        return 0;
      }
    } else {
      log.saveLog(req, '', null, events.LoginFailedIncorectData, ("phone: " + req.body.phone), '')
      res.json({
        success: false,
        message: "Incorrect phone or password",
      });
      return 0;
    }
  });
};

exports.findByToken = function (token, req, cb) {
  let auth = new Auth();
  let agent = auth.generateHash(req.useragent.source);

  // console.log('Time2:',  auth.generateHash(req.useragent.source));

  Auth.findOne({ token: token, agent: agent }, function (err, row) {
    if (row) return cb(null, row);
    return cb(null, null);
  });
};

exports.userInfo = async (headers) => {
  if (!headers.authorization) {
    return { role_id: { resource: "" } };
  } else {
    let token = headers.authorization.substr(7);
    let auth = new Auth();
    let agent = auth.generateHash(headers["user-agent"]);

    let userID = await Auth.findOne({ token: token, agent: agent })
      .select({ user: 1, _id: 0 })
      .exec();
    try {
      let userInfo = await User.findById(userID.user)
        // .populate("role_id")
        .select({ password: 0 })
        .exec();
      return userInfo;
    } catch (error) { }
  }
};

exports.checkAcces = {

  Authentication: async function (role, req, res, callback) {
    let err;
    let player;

    if (!req.headers.authorization) {
      return { role_id: { resource: "" } };
    } else {
      let token = req.headers.authorization.substr(7);
      let auth = new Auth();
      let agent = auth.generateHash(req.headers["user-agent"]);

      let userID = await Auth.findOne({ token: token, agent: agent })
        .select({ user: 1, _id: 0 })
        .exec();
      try {
        let userInfo = await User.findById(userID.user)
          .populate("role_id")
          .select({ password: 0 })
          .exec();
        if (!userInfo.role_id.resource.split(",").includes(role)) {
          res.json({
            status: false,
            success: false,
            message: "You are not authorized!"
          });
          return 0;
        }

        return callback(err, true);

      } catch (error) { }
    }


    return callback(null, player);
  }


  // }


}