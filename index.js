require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db/index");
const path = require("path");

//App Config
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("connection is made");
});

app.get("/readings", async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM sensors"
    );
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

app.post("/readings", async (req, res) => {
  try {
    const { id, temperature } = req.body;
    const time = (new Date(Date.now())).toString()
     const result = await pool.query(
      `INSERT INTO sensors (sensor_id, reading_taken_on, temperature) VALUES ($1, $2, $3) RETURNING *`,
      [id, time, temperature]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))
});

app.listen(port, () => console.log(`listening on localhost:${port}`));