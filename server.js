var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const moment = require('moment');
require('dotenv').config();

const {HOST_SQL , USER_SQL, PASSWORD_SQL, DATABASE_SQL, PORT} = process.env;

///Connection Config
const connection = mysql.createConnection({
  host: HOST_SQL,
  user: USER_SQL,
  password: PASSWORD_SQL,
  database: DATABASE_SQL,
//   timezone: "utc",
//   timezone: "Asia/Bangkok",
// 		dialectOptions: {
// 			timezone: "local",
// 		}
//   dateStrings: "true",
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
        return res
          .status(200)
          .json({ message: `GET users id ${id} successfully.`, status: "ok", user: results[0]});
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
      req.body.downtime
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
        return res
          .status(200)
          .json({ message: `GET users id ${id} successfully.`, status: "ok", user: results[0]});
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
      req.body.downtime
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

app.listen(4000, () => {
 console.log(`Example app listening on port 4000`);
});
