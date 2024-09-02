
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
    leave_type: { type: String, default: "Yearly balance", enum: ['Yearly balance', 'Sick leave','Study leave', 'Work leave', 'Unpaid', 'Maternity leave', 'Paternity leave', 'Marriage leave'] },
    duration_hours: { type: Number, default: 0 },
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

Schema.virtual('HR_TimeOff', {
    ref: 'HR_TimeOff', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('HR_TimeOff', Schema);
