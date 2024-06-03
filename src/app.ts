import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { connect } from "./config/connect_db";
import studentRouter from "./router/student";
import teacherRouter from "./router/teacher";

const app = express();

// connect db
connect();

// use static file
app.use(express.static(path.join(__dirname, "public")));

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//config user router
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(3000, () => {
  console.log("server is running http://localhost:3000/");
});
