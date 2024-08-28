const https = require("https");
const fs = require("fs");
const path = require("path");

module.exports = {
    'scd': 'https://scd.halabjagroup.com:3000/',
    'hrd': 'https://hr.halabjagroup.com:3028/',
    'commercial': 'https://commercial.halabjagroup.com:3035/',
    'finance': 'https://finance.halabjagroup.com:3033/',
    'reporting': 'https://finance.halabjagroup.com:3034/',
    'pmo': 'https://pmo.halabjagroup.com:3015/',
    'safety': 'https://safety.halabjagroup.com:3026/',
    'accounting': 'https://accounting.halabjagroup.com:3032/',
    'landscape': 'https://landscape.halabjagroup.com:3100/',
    'machines': 'https://machines.halabjagroup.com:3019/',
    'legald': 'https://legal.halabjagroup.com:3012/',
    'itd': 'https://itd.halabjagroup.com:3500/',
    'booking': 'https://booking.halabjagroup.com:3024/',
    'property': 'https://property.halabjagroup.com:3036/',
    'abf': 'https://abf.halabjagroup.com:3003/api/restapi/v1/',
    'hbf': 'https://hbf.halabjagroup.com:3002/api/restapi/v1/',
    'hcnt': 'https://hcnt.halabjagroup.com:3007/',
    'pax_gym': 'https://pax_gym.halabjagroup.com:3008/',
    
    // 'legald': 'https://localhost:3012/',
    // 'hrd': 'https://localhost:3028/',
    // 'itd': 'https://localhost:3500/',
    // 'scd': 'https://localhost:3000/',
    // 'abf': 'https://localhost:3003/api/restapi/v1/',
    // 'hbf': 'https://localhost:3002/api/restapi/v1/',
    // 'hcnt': 'https://localhost:3007/',
    // 'pax_gym': 'https://localhost:3008/',
    // 'commercial': 'https://localhost:3035/',
    // 'finance': 'https://localhost:3033/',
    // 'landscape': 'https://localhost:3100/',
    // 'pmo': 'https://localhost:3015/',
    // 'safety': 'https://localhost:3026/',
    // 'reporting': 'https://localhost:3034/',
    // 'machines': 'https://localhost:3019/',
    // 'accounting': 'https://localhost:3032/',
    // 'booking': 'https://localhost:3024/',
    // 'property': 'https://localhost:3036/',

    
    "https_options" :{
        url: '',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        method: 'GET',
        httpsAgent : new https.Agent({
          rejectUnauthorized:false,
            cert: fs.readFileSync(path.join(__dirname,'../../../ssl/server.crt', ),'utf8'),
            key: fs.readFileSync(path.join(__dirname,'../../../ssl/server.key', ),'utf8'),
        })
    }
};

