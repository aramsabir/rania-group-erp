
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    name: { type: String, default: '' },
    order: { type: Number, default: 1 },
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

Schema.virtual('Department', {
    ref: 'Department', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('Department', Schema);
