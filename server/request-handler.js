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

      request.on('data', function(chunk) {
        resultMessages.push(JSON.parse(chunk));
      });

      request.on('end', function() {
        headers['Content-Type'] = "text/html"
        response.writeHead(201, "OK", headers);
        endRequest(undefined,response);
      });

    } else if(request.method === "GET"){
      // The outgoing status.
      // console.log("Serving request type " + request.method + " for url " + request.url);
      response.writeHead(200, headers);
      endRequest(JSON.stringify({results: resultMessages}),response);

    } else if(request.method === "OPTIONS"){

      response.writeHead(200, headers);
      endRequest("OK",response);
    }

  } else if(request.url === '/classes/room1'){

    if(request.method === "GET"){
      response.writeHead(200, headers);
      endRequest(JSON.stringify({results: resultRoom}),response);
    } else if(request.method === "POST"){

      request.on('data', function(chunk) {
        resultRoom.push(JSON.parse(chunk));
      });

      request.on('end', function() {
        headers['Content-Type'] = "text/html"
        response.writeHead(201, "OK", headers);
        endRequest(JSON.stringify(resultRoom[resultRoom.length - 1]),response);

      });
    }
  } else{
    response.writeHead(404, headers);
    endRequest(undefined,response);
  }
}

function endRequest(data,response){
  response.end(data);
} 

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "accept, x-parse-application-id, x-parse-rest-api-key, content-type",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
