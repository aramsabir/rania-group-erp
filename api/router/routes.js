// const User = require('../components/users/usersController')
const Auth = require('../components/auth/authController')
let middleware = require('../middleware');
const userController = require('../components/settings/users/usersController')
const userCompanyController = require('../components/settings/user-company-role/controller')
const resources = require('../components/event_and_resources/resources');
 
var logController = require('../components/log/logController')


module.exports = function (app) {


    var checkAccess = middleware.checkAccess;
    var AddQueryData = middleware.AddQueryData;
    var checkExpireToken = middleware.checkToken;

    app.post('/login', Auth.login);
    app.post('/logout', middleware.logout);

    app.set('trust proxy', 1)

 
    //  users
    app.post('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeWrite) }, checkAccess, userController.newUser)
        .put('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.editUser)
        .delete('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeDelete) }, checkAccess, userController.delete)
        .get('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.one)
        .put('/upload_profile_employee', checkExpireToken, userController.upload, userController.EditUserProfile)
        .get('/employees',  checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.getUsers)
        // .get('/users', checkExpireToken, userController.getAllUsers)
        .put("/change_my_password", checkExpireToken, userController.changemypassword)
        .post("/reset_password", checkExpireToken, userController.restPasswordForUser)
        .put("/employee_status", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.updateUserStatus)
        .get('/employee/:_id', checkExpireToken, userController.userInformation)
        .get('/employee_data', checkExpireToken, userController.userInformation)
        .put("/employee_photo", checkExpireToken, userController.uploadProfile, userController.EditMyProfile)
        .put("/userInformationserphoto/:_id", checkExpireToken, userController.uploadProfile, userController.EditMyProfile)
        // .post('/forgetpassword', userController.forGetPass)
        // .post('/submitresetingpass', userController.submitreset)
        .get('/userinfo', checkExpireToken,AddQueryData, userController.userInformation)
        .get('/my-roles', checkExpireToken,AddQueryData, userController.myRoles)
        .get('/userrole', checkExpireToken, async (req, res) => {
            let userInfo = await Auth.userInfo(req.headers);
            if (userInfo) {
                res.json({ status: true, data: { type: userInfo.type, _id: userInfo._id } })
                return 0
            } else {
                res.json({ status: false })
                return 0
            }
        })


    //  Roles

    app.get('/user_companies', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userCompanyController.List)
        .get('/my_companies', checkExpireToken, AddQueryData, userCompanyController.MyCompanies)
        .get('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userCompanyController.FindOne)
        .post('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeWrite) }, checkAccess, userCompanyController.New)
        .put('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userCompanyController.Update)
        .delete('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userCompanyController.Delete)
 
  


    //  check access token and expiration
    app.get('/check', checkExpireToken, middleware.afterCheck);
    // app.get('/send_sms', userController.sendSMS);
    app.get('/', checkExpireToken, middleware.testToken);
    app.get('/ip', middleware.getIterfacesIP);

    app.get('/logs', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.LogRead) }, checkAccess, logController.allData)

    function addHeader(req, res, cb, access) {
        req.query.access = access; cb()
    }

}