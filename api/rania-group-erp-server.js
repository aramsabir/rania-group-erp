const express = require('express');
const bodyParser = require('body-parser');
// let jwt = require('jsonwebtoken');
// let config = require('./components/auth/config.js');
// let middleware = require('./middleware');
var routes = require('./router/routes');
const cors = require('cors');
// const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const useragent = require('express-useragent');
const db = require('./configDB/mongo.js');
const mongoose = require('mongoose');
var path = require('path');
// var auth = require('./components/auth/authController');
var app = express();
var http = require('http').Server(app);
var http2 = require('http').Server(app);
var https = require('https')
var fs = require('fs');
const helmet = require("helmet");
const { mainPath } = require('./configDB/public_paths')



mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

// var routes = require('./router/routes');

var corsSettings = {
  origin: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true
};

app.use(helmet());

app.use(cors(corsSettings));
app.use(useragent.express());
// app.use(bodyParser());
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(bodyParser.json({ limit: "5mb" }));

routes(app);
// headers and content type
// app.use("/public", express.static(path.join(__dirname, 'public')))
app.use("/public", express.static(path.join(mainPath)))

app.use(express.static(__dirname));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// Configure Express application.
app.use(require('morgan')('dev'));

// const httpsOption = {
//   cert: fs.readFileSync(path.join(__dirname, '../../ssl/server.crt',), 'utf8'),
//   key: fs.readFileSync(path.join(__dirname, '../../ssl/server.key',), 'utf8'),


// }

let port = 3000;
// https.createServer(httpsOption, app).listen(port, function () {
//   console.log('HTTPS Server listening on %s:%s', "https://localhost", port);
// })

var server = http.listen(port, () => {
  console.log('server is running on port', server.address().port);
});
// var server2 = http2.listen(port+1, () => {
//   console.log('server is running on port', server2.address().port);
// });


