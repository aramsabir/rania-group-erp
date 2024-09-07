
var mongoose = require('mongoose');
const { leaveTypes } = require('../event_and_resources/constants');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    leave_type: { type: String, default: "Yearly balance", enum: leaveTypes },
    hours: { type: Number, default: 0 },
    editor: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }

});

Schema.virtual('HR_Allocation', {
    ref: 'HR_Allocation', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('HR_Allocation', Schema);
