
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Configure CORS properly
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

app.use("/api/auth", require("./routes/authroutes"))
app.use("/api/cases", require("./routes/caseRoutes"))
app.use("/api/polls", require("./routes/pollroutes"))

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})

