var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
  name: {
    type: String,
    default:"",
    trim:true,
    required:true
  },
  description: {
    type: String,
    default:""
  },
  resource: {
    type: String,
    default:"activity:self,data:self"
  },
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
          if (!body.name || body.name == '') {
              return ({ status: false, message: 'Role name required or not valid' });
          } else
              if (body.name.length < 2 || body.name.length > 60) {
                  return ({ status: false, message: 'Your input should be in 2 to 60 character for role name' });
              } else {
                  var item_finder = await mongoose.model('Role', schema).findOne({ name: body.name }).exec();
                  if (item_finder) {
                      return ({ status: false, message: 'Doublicated data' });
                  } else
                      return ({ status: true });
              }
      case 'edit':
          if (!body._id) {
              res.json({ status: false, message: "ID required" })
              return 0
          }
          if (!mongoose.Types.ObjectId.isValid(body._id)) {
            res.json({ status: false, message: "ID not valid" });
            return 0;
          }

          if (!body.name || body.name == '') {
              return ({ status: false, message: 'Role name required or not valid' });
          } else
              if (body.name.length < 2 || body.name.length > 60) {
                  return ({ status: false, message: 'Your input should be in 2 to 60 character for role name' });
              } else {
                  var item_finder = await mongoose.model('Role', schema).findOne({ $and: [{ _id: { $ne: body._id } }, { name: body.name }] }).exec();
                  if (item_finder) {
                      return ({ status: false, message: 'Doublicated data' });
                  } else
                      return ({ status: true });
              }
      case 'delete':
          if (!body._id) {
              res.json({ status: false, message: "ID required" })
              return 0
          }
          if (!mongoose.Types.ObjectId.isValid(body._id)) {
            res.json({ status: false, message: "ID not valid" });
            return 0;
          }
      case 'find':
          if (!body._id) {
              res.json({ status: false, message: "ID required" })
              return 0
          }
          if (!mongoose.Types.ObjectId.isValid(body._id)) {
            res.json({ status: false, message: "ID not valid" });
            return 0;
          }
         
      default:
          break;
  }



}

schema.virtual("Role", {
  ref: "_id", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "Role", // is equal to `foreignField`
  justOne: false,
});


// create the model for users and expose it to our app
module.exports = mongoose.model("Role", schema);
