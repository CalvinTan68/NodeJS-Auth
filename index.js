require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();

const librariesRoute = require("./routes/librariesRoute");
const authRoute = require("./routes/authRoute");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 0,
  })
);

// ROUTE
app.use("/auth", authRoute);
app.use("/libraries", librariesRoute);

// PUBLIC AREA
app.get("/", async (req, res) => {
  res.end(JSON.stringify({ hello: "WORLD!" }));
});

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
