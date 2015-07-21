// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html

// **************************************************************/
// var result = [];

// var requestHandler = function(request, response) {

//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = "text/plain";

//   if(request.url !== '/classes/messages'){
//     response.writeHead(404, headers);
//     response.end();
//   }

//   if(request.method === "POST"){

//     console.log("Serving request type " + request.method + " for url " + request.url);
    
//     request.on('data', function(chunk) {
//       result.push(JSON.parse(chunk));
//     });
    
//     request.on('end', function() {

//       response.writeHead(201, "OK", {'Content-Type': 'text/html'});
//       response.end();
//     });

//   }
//   else if(request.method === "GET"){
//     // The outgoing status.
//     response.writeHead(200, headers);
//     response.end(JSON.stringify({
//       results: result
//     }));
//   }
// };


// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };

// module.exports = requestHandler;
