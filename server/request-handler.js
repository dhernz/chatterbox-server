/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html

**************************************************************/
var resultMessages = [];
var resultRoom = [];

var requestHandler = function(request, response) {

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if(request.url === '/classes/messages'){

    if(request.method === "POST"){

      // console.log("Serving request type " + request.method + " for url " + request.url);

      request.on('data', function(chunk) {
        resultMessages.push(JSON.parse(chunk));
      });

      request.on('end', function() {
        headers['Content-Type'] = "text/html"
        response.writeHead(201, "OK", headers);
        response.end();
      });

    } else if(request.method === "GET"){
      // The outgoing status.
      // console.log("Serving request type " + request.method + " for url " + request.url);
      response.writeHead(200, headers);
      response.end(JSON.stringify({results: resultMessages}));
    
    } else if(request.method === "OPTIONS"){

      response.writeHead(200, headers);
      response.end("OK");
    }

  } else if(request.url === '/classes/room1'){
    
    if(request.method === "GET"){
      response.writeHead(200, headers);
      response.end(JSON.stringify({results: resultRoom}));

    } else if(request.method === "POST"){

      // console.log("Serving request type " + request.method + " for url " + request.url);

      request.on('data', function(chunk) {
        resultRoom.push(JSON.parse(chunk));
      });

      request.on('end', function() {
        headers['Content-Type'] = "text/html"
        response.writeHead(201, "OK", headers);
        response.end(JSON.stringify(resultRoom[resultRoom.length - 1]));
      });

    }
  }  

  else{
    response.writeHead(404, headers);
    response.end();
  }

} 


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "accept, x-parse-application-id, x-parse-rest-api-key, content-type",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
