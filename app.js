const http = require("http");
const fs = require("fs");

// Callback function
function reqListener(req, res) {
  const { url, method } = req;
  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Node.js Server Demo</title></head>");
    res.write(
      '<body style="text-align:center;"><h2>Welcome to homepage server</h2></body>'
    );
    res.write("</html>");
    res.end();
  }

  if (url === "/feedback") {
    res.write("<html>");
    res.write("<head><title>Share feedback</title></head>");
    res.write(
      '<body style="text-align:center;"><h2>Feedback form</h2><hr/><form style="display: flex;flex-direction: column;align-items: center;gap: 1rem;" action="/feedback-received" method="POST"><textarea placeholder="Enter your feedback" rows="4" cols="80" name="feedback"></textarea><button type="submit">Send feedback</button></form></body>'
    );
    res.write("</html>");
    res.end();
  }

  if (url === "/feedback-received") {
    if (method === "POST") {
      // Listens to data received from client in buffer.
      // Callback will work on every data piece
      const bufferData = [];
      req.on("data", (chunk) => {
        bufferData.push(chunk);
      });
      req.on("end", () => {
        const fileName = Date.now() + "";
        const parsedData = Buffer.concat(bufferData).toString();
        const stringData = parsedData.split("=")[1];
        fs.writeFile(fileName + ".md", stringData, (err) => {
          res.write("<html>");
          res.write("<head><title>Feedback received</title></head>");
          res.write(
            '<body style="text-align:center;"><h3>Thank you for your submission!</h3></body>'
          );
          res.write("</html>");
          res.end();
        });
      });
    } else {
      res.writeHead(302, { Location: "/feedback" });
      res.end();
    }
  }
}

const server = http.createServer(reqListener);

server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
