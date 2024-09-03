var Log = require('./log');


exports.saveLog = async (req, record_id, user_name, user_id, event, before, after) => {

    var ip = req.connection.remoteAddress
    var newLog = new Log();
    newLog.event = event
    newLog.record_id = record_id
    newLog.user_name = user_name
    newLog.user_id = user_id
    newLog.ip = ip
    newLog.before = before
    newLog.after = after
    newLog.date = Date.now()
    newLog.save(function (err, response) {
        if (err) throw err;
        if (response) {
            return { message: "Log saved", status: true }
        } else {
            return { message: "Log not saved", status: false }
        }
    })
}

exports.getLogsOfRecord = async (req, res) => {

    if (!req.query.record_id) {
        return { status: false, message: "record_id is required" }
    }

    var data = await Log.find({ record_id: req.query.record_id })
        .populate('user_id')
        .exec()

    if (data) {
        return { status: true, data: data }
    }
    return { status: false, message: "No logs found" }

}