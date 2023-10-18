const express = require("express")
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./DB/database");
const cors = require("cors")
const path = require("path")

app.use(express.static(path.resolve(__dirname, "dist")))
//cors
app.use(cors())
//dotenv
dotenv.config();

//middlewares
app.use(express.json())

//Database
connectDB();

//routes
app.use("/api/data/", require("./routes/dataRoutes"))

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running at ${port}`))