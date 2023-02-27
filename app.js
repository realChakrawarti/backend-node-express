import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", (req, res, next) => {
  res.send("<h3>Hello from Users page</h3>");
});

app.use("/add-user", (req, res, next) => {
  res.send(
    "<h3>Check username</h3><hr/><form method='POST' action='/check-user'><input type='text' name='username' placeholder='Check username'/><button type='submit'>Check</button></form>"
  );
});

app.post("/check-user", (req, res, next) => {
  console.log("Checking username", req.body);
  res.send(`<h3>${req.body.username} is available! 🎉</h3>`);
});

// By default path is "/"
app.use((req, res, next) => {
  res.send("<h3>Hello from ExpressJS</h3>");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
