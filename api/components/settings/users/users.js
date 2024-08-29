var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
var userSchema = mongoose.Schema({
  full_name: {
    type: String,
  },
  user_name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    default: "unnkown@example.com",
  },
 
  password: { type: String },
  code: { type: String },
  job_title: { type: String },
  gender: { type: String },
  phone: { type: Number },
  ref_link: { type: String },
  profile_photo: {
    type: String,
    default: "avatar.png",
  },
  type: { type: String, default: 'Employee', enum: ['Employee', 'Staff', 'HR'] },
  main_company_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    default: null,
  },
  role_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
    default: null,
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
  active: {
    type: Boolean,
    default: true,
  },
  is_use_password_reset: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: Date,
    default: "",
  },
});

userSchema.virtual("User", {
  ref: "User", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "user", // is equal to `foreignField`
  justOne: false,
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
