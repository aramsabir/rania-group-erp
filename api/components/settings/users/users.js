var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
var userSchema = mongoose.Schema({
  user_name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: { type: String },
  code: { type: String },
  full_name: {
    type: String,
  },
  date_of_birth: {
    type: Date,
    default: null,
  },
  gender: { type: String, enum: ["Male", "Female"] },
  email: {
    type: String,
    lowercase: true,
    default: "",
  },
  phone: { type: Number },
  address: { type: String },
  job_title: {
    type: mongoose.Schema.ObjectId,
    ref: "JobTitle",
    default: null,
  },
  department_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
    default: null,
  },
  manager_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  worksite: { type: String },
  date_of_hire: {
    type: Date,
    default: null,
  },
  employement_type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary'],
    default: 'Full-Time',
  },
  employement_date: {
    type: Date,
    default: null,
  },
  contract_date: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  salary_hours_rate: {
    type: Number,
    default: 0,
  },
  benefits_enrollment: {
    type: String,
    default: 'No',
  },
  emergency_contact_name: {
    type: String,
    default: '',
  },
  emergency_contact_phone: {
    type: Number,
    default: 0,
  },
  emergency_contact_relation: {
    type: String,
    default: '',
  },
  education_degree: {
    type: String,
    enum: ['Student', 'Deploma', 'Bachelor', 'Master', 'Doctorate',],
    default: 'Bachelor',
  },
  languages: [
    {
      name: {
        type: mongoose.Schema.ObjectId,
        ref: "Language",
        default: null,
      },
    },
  ],
  certifications: [
    {
      title: { type: String },
    },
  ],
  skills: [
    {
      title: { type: String },
    },
  ],
  bussiness_type: {
    type: String,
    default: ''
    // enum:[ 'Public Sector','Private Sector','Non-Profit Organization', ],
    // default: 'Private Sector',
  },
  notes: {
    type: String,
    default: '',
  },
  bank_account_details: {
    type: String,
    default: '',
  },
  work_permit_or_visa_details: {
    type: String,
    default: '',
  },
  probation_period_end_date: {
    type: Date,
    default: null,
  },
  retirement_date: {
    type: Date,
    default: null,
  },
  blood_group: {
    type: String,
    enum: ['','A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: '',
  },
  remote_work_eligibility: {
    type: String,
    default: ""
  },
  safety_training_certification: {
    type: String,
    default: ""
  },
  termination_date: {
    type: Date,
    default: null,
  },
  punishment_date: {
    type: Date,
    default: null,
  },
  rewards: [
    {
      title: { type: String },
      amount: { type: Number, default: 0 },
      description: { type: String },
      date: { type: Date },
    },
  ],
  gender: { type: String },
  ref_link: { type: String },
  profile_photo: {
    type: String,
    default: "avatar.png",
  },
  main_company_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
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
