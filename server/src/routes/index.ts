import express from "express";
import mysql from 'mysql2';
import { v4 as uuidv4 } from "uuid";
import { config } from 'dotenv';

const router = express.Router();
config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

//init tables
const sqlInitTables = [
  `CREATE DATABASE IF NOT EXISTS db_tkpm;`,
  `USE db_tkpm;`,
  `CREATE TABLE  IF NOT EXISTS users (
  uuid char(36),
  username varchar(30) NOT NULL,
  password varchar(50) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY(uuid)
  );`,
  `CREATE TABLE  IF NOT EXISTS historys (
  uuid char(36),
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  user_uuid char(36),
  PRIMARY KEY(uuid),
  CONSTRAINT fk_users_historys_from_user FOREIGN KEY (user_uuid) REFERENCES users(uuid)
  );`,
  `CREATE TABLE  IF NOT EXISTS logs (
  uuid char(36),
  number_sentence int,
  sentences text,
  history_uuid char(36),
  created_at timestamp NOT NULL,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY(uuid),
  CONSTRAINT fk_historys_logs_from_history FOREIGN KEY (history_uuid) REFERENCES historys(uuid)
  );`
];

//init database
sqlInitTables.forEach(sql => {
  connection.query(sql, (err, results) => {
    if (err) throw err;
  });
});

interface User {
  uuid: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

//get user by uuid
router.get("/user/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  connection.query(`SELECT * FROM users WHERE uuid = ?`, [uuid], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// register
router.post("/user/register", (req, res) => {
  let user: User = {
    uuid: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    created_at: new Date()
  }
  console.log(user);
  // save user to database
  connection.query(`INSERT INTO users (uuid, username, password, created_at) VALUES (?, ?, ?, ?)`, [user.uuid, user.username, user.password, user.created_at], (err, rows) => {
    if (err) throw err;
  });
  res.send(user);
});


// save conversation 
router.post("/history/save", (req, res) => {
  let history = {
    uuid: uuidv4(),
    created_at: new Date(),
    user_uuid: req.body.user_uuid
  }
  // save history to database
  connection.query(`INSERT INTO historys (uuid, created_at, user_uuid) VALUES (?, ?, ?)`, [history.uuid, history.created_at, history.user_uuid], (err, rows) => {
    if (err) throw err;
  });
  res.send(history);
});

//get history by uuid
router.get("/history/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  connection.query(`SELECT * FROM historys WHERE uuid = ?`, [uuid], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// save log
router.post("/log/save", (req, res) => {
  let log = {
    uuid: uuidv4(),
    number_sentence: req.body.number_sentence,
    sentences: req.body.sentences,
    history_uuid: req.body.history_uuid,
    created_at: new Date()
  }
  // save log to database
  connection.query(`INSERT INTO logs (uuid, number_sentence, sentences, history_uuid, created_at) VALUES (?, ?, ?, ?, ?)`, [log.uuid, log.number_sentence, log.sentences, log.history_uuid, log.created_at], (err, rows) => {
    if (err) throw err;
  });
  res.send(log);
});

//get log by uuid
router.get("/log/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  connection.query(`SELECT * FROM logs WHERE uuid = ?`, [uuid], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

export default router;