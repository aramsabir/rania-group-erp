var mongoose = require("mongoose");
const { Product } = require("../../event_and_resources/tables");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
  company_id: { type: mongoose.Schema.ObjectId, ref: 'Companies', default: null },
  resources: { type: String, default: "", trim: true },

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  editor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null
  },

});



schema.methods.validation = async function (body, key) {

  switch (key) {

    case 'create':
      if (!body.user_id || body.user_id == '') {
        return ({ status: false, message: 'Employee name required' });
      }
      if (!mongoose.Types.ObjectId.isValid(body.user_id)) {
        return ({ status: false, message: 'Employee name not valid' });
      }
      if (!body.company_id || body.company_id == '') {
        return ({ status: false, message: 'Company name required' });
      }
      if (!mongoose.Types.ObjectId.isValid(body.company_id)) {
        return ({ status: false, message: 'Company name not valid' });
      }
      if (!body.resources || body.resources == '') {
        return ({ status: false, message: 'Resources required' });
      }


      var item_finder = await mongoose.model('User_Company_Role', schema).findOne({ $and: [{ user_id: body.user_id }, { company_id: body.company_id }, { deleted_at: null }] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicated user role' });
      } else
        return ({ status: true });

        
    case 'edit':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }
      if (!body.user_id || body.user_id == '') {
        return ({ status: false, message: 'Employee name required' });
      }
      if (!mongoose.Types.ObjectId.isValid(body.user_id)) {
        return ({ status: false, message: 'Employee name not valid' });
      }
      if (!body.company_id || body.company_id == '') {
        return ({ status: false, message: 'Company name required' });
      }
      if (!mongoose.Types.ObjectId.isValid(body.company_id)) {
        return ({ status: false, message: 'Company name not valid' });
      }
      if (!body.resources || body.resources == '') {
        return ({ status: false, message: 'Resources required' });
      }

      var item_finder = await mongoose.model('User_Company_Role', schema).findOne({ $and: [{ _id: { $ne: body._id } }, { user_id: body.user_id }, { company_id: body.company_id }, { deleted_at: null }] }).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicated data' });
      } else
        return ({ status: true });

    case 'delete':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      } else {
        return ({ status: true });
      }

    case 'find':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      } else {
        return ({ status: true });
      }

    default:
      break;
  }



}


schema.virtual("User_Company_Role", {
  ref: "_id", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "User_Company_Role", // is equal to `foreignField`
  justOne: false,
});


// create the model for users and expose it to our app
module.exports = mongoose.model("User_Company_Role", schema);
