
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
var app = express();
app.use(express.static('../client'));

app.use(bodyParser.json())

var port = 3000;

var ip = "127.0.0.1";

var results = [];

app.get('/classes/messages', function (req, res) {
  res.status(200).send(JSON.stringify({results:results}));
});

app.post('/classes/messages', function (req, res) {
  results.push(req.body);

  fs.writeFile("messages.txt",JSON.stringify(results), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
  
  res.status(201).end();
});

app.options('/classes/messages', function(req, res){
  res.status(200).end();
});


var server = app.listen(port, function () {

  fs.readFile('messages.txt', function (err, data) {
    if (err) throw err;
    results = JSON.parse(data);
  });

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
