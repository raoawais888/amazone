import env from "dotenv";
env.config();
import express  from "express";
import web from "./routes/web.js";
import path from "path";
import CONNECT_DB from "./db/connection.js";
import flash from 'connect-flash'
import session from "express-session";
const app = express();
const port =  process.env.PORT;
const DB_URL = process.env.DB_URL;



app.use(express.static(path.join(process.cwd(),'public')));
app.use(session({
      name: 'waqas',
  secret : 'something',
  cookie: { maxAge: 30000 },
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use((req,res,next)=>{
   res.locals.message = req.flash()
   next()

})
app.use("/",web);
app.set('view engine','ejs')

CONNECT_DB(DB_URL)

app.listen(port,()=>{

    console.log(`http://localhost:${port}`);

})