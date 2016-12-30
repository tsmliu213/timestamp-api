var express = require('express');
var moment = require('moment');
var app = express();
var date;

function isNumber(str) {
    var pattern = /^\d+$/;
    if(pattern.test(str)) {
        var time = parseInt(str);
        date = moment.unix(time);
    }
    else {
        date = moment(str);
    }
}

app.get('/', function(req, res) {
    res.send('Timestamp API');
})

app.get('/:time', function(req, res) {
    isNumber(req.params.time);
    var unixTime;
    var naturalTime;
    if(!date.isValid()){
       unixTime = null;
       naturalTime = null;
    }
    else {
       unixTime = parseInt(date.format('X'));
       naturalTime = date.format('MMMM D, YYYY');
    }
    var result = JSON.stringify({
       "unix": unixTime,
       "natural": naturalTime
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(result);
});
app.listen(8080);