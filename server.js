// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var myDate = new Date();
var mySecondDate = new Date(myDate.toString());
console.log(mySecondDate.getTime());



app.get("/api/:date?", (req, res) => {
  var newDate;
  //Assign newDate to param or now if no param
  if(!req.params.date){
    newDate = new Date().now();  
  }
  
  newDate = new Date(req.params.date);
  
  //check if param valid
  if(newDate.toString() === "Invalid Date"){  
    //try parsing param is int
    newDate = new Date(parseInt(req.params.date));
  }
  //check again and exit if still invalid
  if(newDate.toString() === "Invalid Date"){
    res.json({
      error: "Invalid Date"
    });
    return
  }
  
  var millisecondsTime = newDate.getTime();
  var utcString = newDate.toUTCString();
  res.json({
    unix: millisecondsTime,
    utc: utcString
  });
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var port = process.env.PORT || 3000
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
