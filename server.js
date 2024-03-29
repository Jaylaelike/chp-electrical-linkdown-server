var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const moment = require("moment");
require("dotenv").config();


const { HOST_SQL, USER_SQL, PASSWORD_SQL, DATABASE_SQL, PORT } = process.env;

///Connection Config jj
const connection = mysql.createConnection({
  host: HOST_SQL,
  user: USER_SQL,
  password: PASSWORD_SQL,
  database: DATABASE_SQL,
  port: PORT,
  timezone: "utc",
  dateStrings: "true",
  ssl: {
    rejectUnauthorized: true,
  }
});

var app = express();
app.use(cors());
app.use(express.json());



app.get("/api/electrics", function (req, res, next) {
  connection.query(
    "SELECT `id`, `station`, `typestaion`, `facility`, `startdate`, `enddate`, `duration`, `detail`, `users`, `downtime` FROM `electric` WHERE 1 ORDER BY id DESC LIMIT 50;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/electrics/count", function (req, res, next) {
  connection.query(
    "SELECT COUNT(*) AS counter FROM electric;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/electrics/count/downtime", function (req, res, next) {
  connection.query(
    "SELECT COUNT(`downtime`) AS counter FROM `electric` WHERE `downtime`='ออกอากาศไม่ได้';",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/electrics/count/sumhr", function (req, res, next) {
  connection.query(
    "SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( `duration` ) ) ) AS counter FROM `electric` WHERE 1;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/electrics/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `electric` WHERE `id` = ?",
    [id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to Get users id !!!" });
        }
        return res.status(200).json({
          message: `GET users id ${id} successfully.`,
          status: "ok",
          user: results[0],
        });
      }
      //res.json(results);
    }
  );
});

app.post("/api/electrics/create", function (req, res, next) {
  connection.query(
    "INSERT INTO `electric` (`station`, `typestaion` , `facility`, `startdate`, `enddate`, `detail`, `users`, `downtime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.station,
      req.body.typestaion,
      req.body.facility,
      req.body.startdate,
      req.body.enddate,
      req.body.detail,
      req.body.users,
      req.body.downtime,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to create users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Create data successfully.", status: "ok" });
      }
      //res.json(results);
      // res.json({ results: results, status: "ok" });
    }
  );
});

app.put("/api/electrics/update", function (req, res, next) {
  connection.query(
    "UPDATE `electric` SET `station`=?, `typestaion`=?, `facility`=?, `startdate`=?, `enddate`=?, `detail`=?, `users`=?, `downtime`=? WHERE id = ?",
    [
      req.body.station,
      req.body.typestaion,
      req.body.facility,
      req.body.startdate,
      req.body.enddate,
      req.body.detail,
      req.body.users,
      req.body.downtime,
      req.body.id,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to update users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Updated data successfully.", status: "ok" });
      }
      // res.json(results);
    }
  );
});

app.delete("/api/electrics/delete", function (req, res, next) {
  connection.query(
    "DELETE FROM `electric` WHERE id = ?",
    [req.body.id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to delete users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Delete data successfully.", status: "ok" });
      }

      //res.json(results);
    }
  );
});

//Link NT

app.get("/api/nt", function (req, res, next) {
  connection.query(
    "SELECT * FROM `nt_down` WHERE 1 ORDER BY id DESC;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/nt/count", function (req, res, next) {
  connection.query(
    "SELECT COUNT(*) AS counter FROM nt_down;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/nt/count/downtime", function (req, res, next) {
  connection.query(
    "SELECT COUNT(`downtime`) AS counter FROM `nt_down` WHERE `downtime`='ออกอากาศไม่ได้';",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/nt/count/sumhr", function (req, res, next) {
  connection.query(
    "SELECT SEC_TO_TIME( SUM( TIME_TO_SEC( `duration` ) ) ) AS counter FROM `nt_down` WHERE 1;",
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

app.get("/api/nt/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `nt_down` WHERE `id` = ?",
    [id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to Get users id !!!" });
        }
        return res.status(200).json({
          message: `GET users id ${id} successfully.`,
          status: "ok",
          user: results[0],
        });
      }
      //res.json(results);
    }
  );
});

app.post("/api/nt/create", function (req, res, next) {
  connection.query(
    "INSERT INTO `nt_down` (`station`, `typestaion` , `facility`, `startdate`, `enddate`, `detail`, `users`, `downtime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.station,
      req.body.typestaion,
      req.body.facility,
      req.body.startdate,
      req.body.enddate,
      req.body.detail,
      req.body.users,
      req.body.downtime,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to create users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Create data successfully.", status: "ok" });
      }
      //res.json(results);
      // res.json({ results: results, status: "ok" });
    }
  );
});

app.put("/api/nt/update", function (req, res, next) {
  connection.query(
    "UPDATE `nt_down` SET `station`=?, `typestaion`=?, `facility`=?, `startdate`=?, `enddate`=?, `detail`=?, `users`=?, `downtime`=? WHERE id = ?",
    [
      req.body.station,
      req.body.typestaion,
      req.body.facility,
      req.body.startdate,
      req.body.enddate,
      req.body.detail,
      req.body.users,
      req.body.downtime,
      req.body.id,
    ],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to update users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Updated data successfully.", status: "ok" });
      }
      // res.json(results);
    }
  );
});

app.delete("/api/nt/delete", function (req, res, next) {
  connection.query(
    "DELETE FROM `nt_down` WHERE id = ?",
    [req.body.id],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to delete users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Delete data successfully.", status: "ok" });
      }

      //res.json(results);
    }
  );
});

//Query by date range for electrics filter Datetime function
app.get("/api/electrics/:start/:end", function (req, res, next) {
  const start = req.params.start;
  const end = req.params.end;
  connection.query(
    "SELECT * FROM `electric` WHERE `enddate` BETWEEN ? AND ?",
    [start, end],
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

//Query by date range for LinkDown filter Datetime function
app.get("/api/nt/:start/:end", function (req, res, next) {
  const start = req.params.start;
  const end = req.params.end;
  connection.query(
    "SELECT * FROM `nt_down` WHERE `enddate` BETWEEN ? AND ?",
    [start, end],
    function (err, results, fields) {
      res.json(results);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
});

//Query fo select station and typestation and facility

app.get("/selectors/:station", function (req, res, next) {
  const station = req.params.station;
  connection.query(
    "SELECT DISTINCT `facility`, `typestaion` FROM `electric` WHERE `station` = ?;",
    [station],
    // check rows of query result is empty or not
    function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database query failed" });
      }

      console.log(results); // results contains rows returned by server
      console.log(results.length); // results contains rows returned by server
      return res.status(200).json({
        message: `GET users id ${station} successfully.`,
        status: "ok",
        data: results,
      });
    }
  );
});

app.get("/nt/selectors/:station", function (req, res, next) {
  const station = req.params.station;
  connection.query(
    "SELECT DISTINCT `facility`, `typestaion` FROM `nt_down` WHERE `station` = ?;",
    [station],
    // check rows of query result is empty or not
    function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database query failed" });
      }

      console.log(results); // results contains rows returned by server
      console.log(results.length); // results contains rows returned by server
      return res.status(200).json({
        message: `GET users id ${station} successfully.`,
        status: "ok",
        data: results,
      });
    }
  );
});

//update state of linenotify have time_update and state is bool
app.put("/api/update/notify", function (req, res, next) {
  //new Datetime to update time_update

  const time_update = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(time_update);
  connection.query(
    "UPDATE `state_linenotify` SET `times_update`=?, `state`=? WHERE id = 1",
    [time_update, req.body.state],
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to update users !!!" });
        }
        return res
          .status(200)
          .json({ message: "Updated data successfully.", status: "ok", state: req.body.state });
      }
      // res.json(results);
    }
  );
});

//get state of linenotify have time_update and state is bool
app.get("/api/get/notify", function (req, res, next) {
  connection.query(
    "SELECT * FROM `state_linenotify` WHERE 1",
    function (err, results) {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Error to update users !!!" });
        }

        // if state === 0 resluts is false and state === 1 resluts is true
        if (results[0].state === 0) {
          return res.status(200).json({
            message: "GET data successfully.",
            status: "ok",
            time: results[0].times_update,
            state: false,
          });
        } else {
          return res.status(200).json({
            message: "GET data successfully.",
            status: "ok",
            time: results[0].times_update,
            state: true,
          });
        }
      }
    }
  );
});

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
