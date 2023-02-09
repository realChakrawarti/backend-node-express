const http = require("http");

// Callback function
function reqListener(req, res) {
  console.log(req.url, req.method, req.headers);
  // process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node.js Server Demo</title></head>");
  res.write(
    '<body><h2 style="text-align: center;color: red;">Hello from Node.js server</h2></body>'
  );
  res.write("</html>");
  res.end();
}

const server = http.createServer(reqListener);

server.listen(3000);
