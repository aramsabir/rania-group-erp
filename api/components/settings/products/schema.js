var mongoose = require("mongoose");
const { Product } = require("../../event_and_resources/tables");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
  },
  en_name: {
    type: String,
    default: "",
    trim: true,
  },
  sequence: {
    type: Number,
    default: 1,
  },
  status: {
    type: Boolean,
    default: true,
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
        return ({ status: false, message: Product + ' name required or not valid' });
      }
    

      var item_finder = await mongoose.model(Product, schema).findOne({$and:[{ name: body.name },{deleted_at:null}]}).exec();
      if (item_finder) {
        return ({ status: false, message: 'Doublicated data' });
      } else
        return ({ status: true });

    case 'edit':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }
      if (!body.name || body.name == '') {
        return ({ status: false, message: Product + ' name required or not valid' });
      }
  
      var item_finder = await mongoose.model(Product, schema).findOne({ $and: [{ _id: { $ne: body._id } },{ name: body.name },{deleted_at:null}] }).exec();
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
      }else{
        return ({ status: true });
      }
    case 'find':
      if (!body._id) {
        return ({ status: false, message: "ID required" })
      }
      if (!mongoose.Types.ObjectId.isValid(body._id)) {
        return ({ status: false, message: "ID not valid" });
      }else{
        return ({ status: true });
      }

    default:
      break;
  }



}


schema.virtual("Product", {
  ref: "_id", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "Product", // is equal to `foreignField`
  justOne: false,
});


// create the model for users and expose it to our app
module.exports = mongoose.model("Product", schema);
