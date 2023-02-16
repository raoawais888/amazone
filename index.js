import env from "dotenv";
env.config();
import express  from "express";
import web from "./routes/web.js";
import path from "path";
const app = express();
const port =  process.env.PORT;


app.use(express.static(path.join(process.cwd(),'public')));
app.use("/",web);
app.set('view engine','ejs')

app.listen(port,()=>{

    console.log(`http://localhost:${port}`);

})