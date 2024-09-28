// const User = require('../components/users/usersController')
const Auth = require('../components/auth/authController')
let middleware = require('../middleware');
const userController = require('../components/settings/users/usersController')
const companyController = require('../components/settings/company/controller')
const userCompanyController = require('../components/settings/user-company-role/controller')
const departmentController = require('../components/settings/department/controller')
const basicDataController = require('../components/settings/basic-data/controller')
const documentController = require('../components/document/controller')
const allocationController = require('../components/time_off/allocations/allocation_controller')
const timeoffController = require('../components/time_off/time_off/controller')
const timeOffTypeController = require('../components/time_off/time_off_types/controller')
const recruitmentController = require('../components/recruitment/controller')
const resources = require('../components/event_and_resources/resources');

var logController = require('../components/activities/logController')


module.exports = function (app) {


    var checkAccess = middleware.checkAccess;
    var AddQueryData = middleware.AddQueryData;
    var checkExpireToken = middleware.checkToken;

    app.post('/login', Auth.login);
    app.post('/logout', middleware.logout);

    app.set('trust proxy', 1)


    //  users
    app.post('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeWrite) }, checkAccess, userController.newUser)
        .get('/employees', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.List)
        .get('/employees-settings', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, userController.ListSettings)
        .put('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.editUser)
        .delete('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeDelete) }, checkAccess, userController.delete)
        .get('/employee-one', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.FindOne)
        .get('/employee', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.FindOneByID)
        .put('/upload_profile_employee', checkExpireToken, userController.upload, userController.EditUserProfile)
        .get('/available_employees', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeRead) }, checkAccess, userController.Available)
        .put("/change_my_password", checkExpireToken, userController.changemypassword)
        .post("/reset_password", checkExpireToken, userController.restPasswordForUser)
        .put("/update-employee-activation", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.updateUserStatus)
        .post("/add-lang-employee", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.pushLanguageForEmployee)
        .put("/pull-lang-employee", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeDelete) }, checkAccess, userController.popLanguageForEmployee)
        .post("/add-certificate-employee", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeUpdate) }, checkAccess, userController.pushCertificateForEmployee)
        .put("/pull-certificate-employee", checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeDelete) }, checkAccess, userController.popCertificateForEmployee)
        .get('/employee/:_id', checkExpireToken, userController.userInformation)
        .get('/employee_data', checkExpireToken, userController.userInformation)
        .put("/employee_photo", checkExpireToken, userController.uploadProfile, userController.EditMyProfile)
        .put("/userInformationserphoto/:_id", checkExpireToken, userController.uploadProfile, userController.EditMyProfile)
        // .post('/forgetpassword', userController.forGetPass)
        // .post('/submitresetingpass', userController.submitreset)
        .get('/userinfo', checkExpireToken, AddQueryData, userController.userInformation)
        .get('/my-roles', checkExpireToken, AddQueryData, userController.myRoles)
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


    //  Company

    app.get('/companies', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, companyController.List)
        .get('/available_companies', checkExpireToken, AddQueryData, companyController.Available)
        .get('/company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, companyController.One)
        .post('/company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsWrite) }, checkAccess, companyController.New)
        .put('/company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsUpdate) }, checkAccess, companyController.Update)
        .delete('/company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsUpdate) }, checkAccess, companyController.Delete)

    //  Department
    app.get('/departments', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, departmentController.List)
        .get('/available_departments', checkExpireToken, AddQueryData, departmentController.Available)
        .get('/department', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, departmentController.One)
        .post('/department', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, departmentController.New)
        .put('/department', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, departmentController.Update)
        .delete('/department', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, departmentController.Delete)

    //     //  Attachments
    app.get('/employee-documents', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.DocumentRead) }, checkAccess, documentController.ListForEmployee)
        .get('/count-employee-documents', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.DocumentRead) }, checkAccess, documentController.CountEmployeeDocuments)
        // .get('/available_job_titles', checkExpireToken, AddQueryData, jobTitleController.Available)
        // .get('/job_title', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, jobTitleController.One)
        .post('/document', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.DocumentWrite) }, checkAccess, documentController.upload, documentController.New)
        .get('/download-document', documentController.downloadDoc)
        // .put('/job_title', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, jobTitleController.Update)
        .delete('/document', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.DocumentDelete) }, checkAccess, documentController.Delete)

    //  Basic Data
    app.get('/basic_datas', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, basicDataController.List)
        .get('/available_basic_datas', checkExpireToken, AddQueryData, basicDataController.Available)
        .get('/basic_data', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, basicDataController.One)
        .post('/basic_data', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, basicDataController.New)
        .put('/basic_data', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, basicDataController.Update)
        .delete('/basic_data', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.EmployeeAdmin) }, checkAccess, basicDataController.Delete)

    //  Basic Data
    app.get('/time_off_types', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeOffTypeController.List)
        .get('/available_time_off_types', checkExpireToken, AddQueryData, timeOffTypeController.Available)
        .get('/time_off_type', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeOffTypeController.One)
        .post('/time_off_type', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeOffTypeController.New)
        .put('/time_off_type', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeOffTypeController.Update)
        .delete('/time_off_type', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeOffTypeController.Delete)

    //  Allocations
    app.get('/allocations', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, allocationController.List)
        .get('/available_allocations', checkExpireToken, AddQueryData, allocationController.Available)
        .get('/my-grouped-allocations', checkExpireToken, AddQueryData, allocationController.MyGroupedAllocations)
        .get('/employee-grouped-allocations', checkExpireToken, AddQueryData, allocationController.EmployeeGroupedAllocations)
        .get('/allocation', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, allocationController.One)
        .post('/allocation', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, allocationController.New)
        .put('/allocation', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, allocationController.Update)
        .delete('/allocation', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, allocationController.Delete)

    //  Allocations
    app.get('/time-offs', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, timeoffController.List)
        .get('/my-time-off-per-year', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, timeoffController.MyTimeOffPerYear)
        .get('/employee-time-off-per-year', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, timeoffController.EmployeeTimeOffPerYear)
        .get('/count-employee-time-offs', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, timeoffController.CountEmployeeTimeOffPerYear)
        .get('/time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffRead) }, checkAccess, timeoffController.One)
        .post('/time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.New)
        .put('/time-off-approve', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.Approve)
        .put('/time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.Update)
        .post('/employee-time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.NewEmployeeTimeOff)
        .put('/employee-time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.UpdateEmployeeTimeOff)
        .delete('/time-off', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.TimeOffAdmin) }, checkAccess, timeoffController.Delete)



    app.get('/user_companies', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, userCompanyController.List)
        .get('/my_companies', checkExpireToken, AddQueryData, userCompanyController.MyCompanies)
        .get('/available_companies', checkExpireToken, AddQueryData, userCompanyController.Available)
        .get('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, userCompanyController.FindByID)
        .get('/user_company_one', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsRead) }, checkAccess, userCompanyController.FindOne)
        .post('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsWrite) }, checkAccess, userCompanyController.New)
        .put('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsUpdate) }, checkAccess, userCompanyController.Update)
        .put('/user_company_resources', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsUpdate) }, checkAccess, userCompanyController.UpdateResources)
        .delete('/user_company', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.SettingsUpdate) }, checkAccess, userCompanyController.Delete)



    // recruitment api 

    app.post('/recruitments', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsRead) }, checkAccess, recruitmentController.allData)
        .get('/recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsRead) }, checkAccess, recruitmentController.getOne)
        .post('/post-board', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsRead) }, checkAccess, recruitmentController.postBoard)
        .post('/recruitment-candidates', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsWrite) }, checkAccess, recruitmentController.UploadCandidates)
        .post('/change-level-candidate', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsUpdate) }, checkAccess, recruitmentController.updateLevel)
        .post('/update-candidate', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsUpdate) }, checkAccess, recruitmentController.updateCandidate)
        .get('/recruitment-for-edit', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsRead) }, checkAccess, recruitmentController.findByID)
        .get('/recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsRead) }, checkAccess, recruitmentController.findOne)
        .post('/recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsWrite) }, checkAccess, recruitmentController.newData)
        .put('/recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsUpdate) }, checkAccess, recruitmentController.updateData)
        .post('/undo-approve-recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsApprove) }, checkAccess, recruitmentController.undoApprovePost)
        .post('/approve-recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsApprove) }, checkAccess, recruitmentController.approvePost)
        .delete('/recruitment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsDelete) }, checkAccess, recruitmentController.delete)
        .post('/post-attachment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsUpdate) }, checkAccess, recruitmentController.UploadCV)
        .delete('/post-attachment', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.RecruitmentsDelete) }, checkAccess, recruitmentController.removeCV)
        .get('/download-post-attachment', recruitmentController.downloadFile)

        .post('/recruitments/post-attachment-public', recruitmentController.uploadPublic, recruitmentController.UploadCVPublic)
        .get('/recruitments/post', recruitmentController.onePosttForPublic)
        .get('/recruitments/posts', recruitmentController.availablePoststForPublic)




    //  check access token and expiration
    app.get('/check', checkExpireToken, middleware.afterCheck);
    // app.get('/send_sms', userController.sendSMS);
    app.get('/', checkExpireToken, middleware.testToken);
    app.get('/ip', middleware.getIterfacesIP);

    app.get('/logs', checkExpireToken, (req, res, cb) => { addHeader(req, res, cb, resources.LogRead) }, checkAccess, logController.getLogsOfRecord)

    function addHeader(req, res, cb, access) {
        req.query.access = access; cb()
    }

}