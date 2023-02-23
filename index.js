import env from "dotenv";
env.config();
import express from "express";
import web from "./routes/web.js";
import admin from "./routes/admin.js";
import vendor from "./routes/vendor.js";
import path from "path";
import CONNECT_DB from "./db/connection.js";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

  const mongoaDBStore = new MongoStore({
    mongoUrl:DB_URL,
    dbName: process.env.DB_NAME
  })
app.use(
  session({
    name: "waqas",
    secret: "awais don",
    store:mongoaDBStore,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
app.use(express.urlencoded({extended:true}));
app.use("/", web);

app.use("/vendor", vendor);

app.use("/admin", admin);


app.set("view engine", "ejs");

CONNECT_DB(DB_URL);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



  


