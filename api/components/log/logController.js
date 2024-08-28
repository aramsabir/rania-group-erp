const { response } = require('express');
var Log = require('./log');


exports.saveLog = async(req,user_name,user_id,event,before,after)=>{
    
    var ip = req.connection.remoteAddress
    var newLog = new Log();
    newLog.event = event
    newLog.user_name = user_name
    newLog.user_id = user_id
    newLog.ip = ip
    newLog.before = before
    newLog.after = after
    newLog.created_at = Date.now()
    newLog.created_at = Date.now()
    newLog.save(function(err,response){
        if(err) throw err;
        if(response){
            return {message:"Log saved",status:true}
        }else{
            return {message:"Log not saved",status:false}
        }
    })
}


exports.allData = async (req, res) => {

    var searchDate = {}
    if (req.query.from && req.query.from !== 'undefined' && req.query.to !== 'undefined' && req.query.to) {
        var from = new Date(req.query.from)
        var to = new Date(req.query.to)
        searchDate = {
            $and: [
                {
                    date: { $gte: from },
                },
                {
                    date: { $lte: to },
                }
            ]
        }
    }

    var search = {}
    if (req.query.search && req.query.search !== 'undefined') {
        const regex = new RegExp(req.query.search, 'i'); // 'i' flag for case-insensitive matching
        search = {
            $or: [
                {
                    user_name: { $regex: regex }
                },
                {
                    event: { $regex: regex }
                },
            ]
        }
    }

    var count = await Log.countDocuments({ $and: [search, searchDate] }).exec()
    var data = await Log.find({ $and: [search, searchDate] })
        .populate('user_id')
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort(req.query.sort)
        .exec()

    res.json({ status: true, count, data: data })


}
