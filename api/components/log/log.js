var mongoose = require('mongoose');
 
var schema = mongoose.Schema({
    user_name: { type: String ,default:""  },
    ip: { type: String ,default:""  },
    event: { type: String ,default:""  },
    before: { type: String ,default:""  },
    after: { type: String ,default:""  },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
});


schema.virtual('Activity', {
    ref: 'Activity', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});


module.exports = mongoose.model('Activity', schema);