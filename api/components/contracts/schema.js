
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema({
    company_id: { type: mongoose.Schema.ObjectId, ref: 'Company', default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: 'Department', default: null },
    employee_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
    contract_type:{ type:String,default: "Permanent", enum:[ "Permanent", "Contract" ] },
    hr_responsible_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    is_taxes :{ type:Boolean, default: false},
   
    wage:{ type:Number, default: 0 },
    social_security_allowance:{ type:Number, default: 0 },
    treasure_allowance:{ type:Number, default: 0 },
    phone_allowance:{ type:Number, default: 0 },
    risk_allowance:{ type:Number, default: 0 },
    transportation_allowance:{ type:Number, default: 0 },
    distance_allowance:{ type:Number, default: 0 },
    food_allowance:{ type:Number, default: 0 },
    other_allowance:{ type:Number, default: 0 },

  
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

Schema.virtual('Contract', {
    ref: 'Contract', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model('Contract', Schema);
