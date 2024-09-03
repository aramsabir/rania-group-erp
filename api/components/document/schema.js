
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    
    name: { type: String, default: '' },
    file_source: { type: String, default: '' },
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


schema.methods.validation = async function (body, key) {
    switch (key) {
        case 'create':
            if (body.company_id) {
                if (!mongoose.Types.ObjectId.isValid(body.company_id)) {
                    return ({ status: false, message: 'Company ID required' });
                }
            }
            if (body.department_id) {
                if (!mongoose.Types.ObjectId.isValid(body.department_id)) {
                    return ({ status: false, message: 'Department ID required' });
                }
            }
            if (body.employee_id) {
                if (!mongoose.Types.ObjectId.isValid(body.employee_id)) {
                    return ({ status: false, message: 'Employee ID required' });
                }
            }
            if (!body.name || body.name == '') {
                return ({ status: false, message: 'File privacy required' });
            }
            // if (!body.file_name || body.file_name == '') {
            //     return ({ status: false, message: 'File name required or not valid' });
            // }

            return ({ status: true });

        case 'edit':
            if (!body._id) {
                return ({ status: false, message: "ID required" })
            }
            if (body.company_id) {
                if (!mongoose.Types.ObjectId.isValid(body.company_id)) {
                    return ({ status: false, message: 'Company ID required' });
                }
            }
            if (body.department_id) {
                if (!mongoose.Types.ObjectId.isValid(body.department_id)) {
                    return ({ status: false, message: 'Department ID required' });
                }
            }
            if (body.employee_id) {
                if (!mongoose.Types.ObjectId.isValid(body.employee_id)) {
                    return ({ status: false, message: 'Employee ID required' });
                }
            }
            if (!body.name || body.name == '') {
                return ({ status: false, message: 'File privacy required' });
            }

            return ({ status: true });

        case 'delete':
            if (!body._id) {
                return ({ status: false, message: "ID required" })
            }
            if (!mongoose.Types.ObjectId.isValid(body._id)) {
                return ({ status: false, message: "ID not valid" });
            }
            return ({ status: true });
        case 'find':
            if (!body._id) {
                return ({ status: false, message: "ID required" })
            }
            if (!mongoose.Types.ObjectId.isValid(body._id)) {
                return ({ status: false, message: "ID not valid" });
            }
            return ({ status: true });
        case 'find_all':
            if (!body.type) {
                return ({ status: false, message: "File type required" })
            }

            return ({ status: true });
        default:
            break;
    }
}


schema.virtual('Document', {
    ref: 'Document', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('Document', schema);
