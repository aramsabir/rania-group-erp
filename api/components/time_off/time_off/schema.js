
var mongoose = require('mongoose');
const { timeOffApprovalStatus } = require('../../event_and_resources/constants');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
    start_time: { type: String, default: null },
    end_time: { type: String, default: null },
    type: { type: String, default: "Hours", enum: ['Day', 'Hours']},
    leave_type_id: { type: mongoose.Schema.ObjectId, ref: 'HR_Leave_Type', default: null },
    duration_days: { type: Number, default: 0 },
    duration_hours: { type: Number, default: 0 },
    duration_minutes: { type: Number, default: 0 },
    duration_in_hours: { type: Number, default: 0 },
    duration_in_days: { type: Number, default: 0 },
    description:{ type:String, default: ""},
    status:{
        type: String,
        default: "Pending",
        enum: timeOffApprovalStatus
    },
    approved_by: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    approved_at: { type: Date, default: null },
    
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    editor: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null  }

});

Schema.virtual('HR_TimeOff', {
    ref: 'HR_TimeOff', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('HR_TimeOff', Schema);
