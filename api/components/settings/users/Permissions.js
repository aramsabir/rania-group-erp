var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var PermissionSchema = mongoose.Schema({
    company_id :{ type: mongoose.Schema.ObjectId, ref: 'Companies', default: null },
    part :{ type:String },
    user_id:{ type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    owner_id: {type: mongoose.Schema.ObjectId, ref: 'User', default: null},   
    created_at : {
        type: Date,
        default: Date.now()
    },
    updated_at : {
        type: Date,
        default: Date.now()
    }
});

PermissionSchema.virtual('Permission', {
    ref: 'Permission', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
 


// create the model for users and expose it to our app
module.exports = mongoose.model('Permission', PermissionSchema);