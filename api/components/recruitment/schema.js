var mongoose = require('mongoose');
const { Recruitment, User, Companies, BasicData, Employee } = require('../event_and_resources/tables');
mongoose.Promise = global.Promise;
var schema = mongoose.Schema({
    no: { type: Number, default: 1 },
    company_id: { type: mongoose.Schema.ObjectId, ref: "Company", default: null },
    department_id: { type: mongoose.Schema.ObjectId, ref: "Department", default: null },
    prev_emp_id: { type: mongoose.Schema.ObjectId, ref: "User", default: null },
    post_id: { type: mongoose.Schema.ObjectId, ref: BasicData, default: null },
    unfilled_reason_id: { type: mongoose.Schema.ObjectId, ref: BasicData, default: null },
    reference: { type: String, default: "" },
    grade_days: { type: Number },
    salary: { type: Number, default: 0 },
    date_request: { type: Date, default: null },
    date_filled: { type: Date, default: null },
    date_quit: { type: Date, default: null },
    gender: { type: String, default: "N/A", enum: ['N/A', 'Male', 'Female'] },
    status: { type: String, default: "Process", enum: ['Process', 'Completed', 'Suspended', 'Canceled'] },
    done_by: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    done_at: { type: Date, default: Date.now() },
    days_between_request_and_hired: { type: Number, default: 0 },
    hiring_reason: { type: String, default: 'New post', enum: ['New post', 'Alternative'] },
    note: { type: String },
    request_type: { type: String, default: 'Letter', enum: ['Letter', 'Email', 'Oral'] },
    applications: [
        {
            level: { type: String, default: "Application" },
            candidate_name: { type: String, default: "" },
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            cv: { type: String, default: "" },
            interview_type: { type: String, default: "In-person", enum: ['In-person', 'Online', 'On-phone'] },
            reject_reason_id: { type: mongoose.Schema.ObjectId, ref: BasicData, default: null },
            offers: [
                {
                    date: { type: Date, default: null, },
                    salary: { type: Number, default: 0, },
                    status: { type: Boolean, default: false },
                    note: { type: String, default: "", },
                }
            ],
            application_date: { type: Date, default: null, },
            screening_date: { type: Date, default: null, },
            shortlist_date: { type: Date, default: null, },
            phone_screen_date: { type: Date, default: null, },
            interview_date: { type: Date, default: null, },
            second_round_interview_date: { type: Date, default: null, },
            offer_date: { type: Date, default: null, },
            hiring_date: { type: Date, default: null, },
            joining_date: { type: Date, default: null, },
            probationary_date: { type: Date, default: null, },
            note: { type: String, default: "", },
            status: { type: Boolean, default: false },
        }
    ],
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null },
    editor: { type: mongoose.Schema.ObjectId, ref: User, default: null },
    creator: { type: mongoose.Schema.ObjectId, ref: User, default: null }
});

schema.virtual(Recruitment, {
    ref: Recruitment, // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    justOne: false
});
module.exports = mongoose.model(Recruitment, schema);
