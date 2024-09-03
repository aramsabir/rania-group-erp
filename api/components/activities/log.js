var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    user_name: { type: String, default: "" },
    ip: { type: String, default: "" },
    event: { type: String, default: "" },
    before: { type: String, default: "" },
    after: { type: String, default: "" },
    record_id: { type: mongoose.Schema.Types.ObjectId, },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
});


logSchema.virtual('Activity', {
    ref: 'Activity', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});


module.exports = mongoose.model('Activity', logSchema);