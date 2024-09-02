
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    
    name: { type: String, default: '' },
    file_name: { type: String, default: '' },
    model_id: { type: mongoose.Schema.ObjectId,  default: null },
    model_name: { type: String, default: '' },
    work_space: { type: String, default: '' },
   
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

Schema.virtual('Document', {
    ref: 'Document', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('Document', Schema);
