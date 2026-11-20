const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose")
require("dotenv").config();

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://localhost:3001"]
}))

async function connectToDB() {
    try{
        await connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")
    }catch (error) {
        console.error("MongoDB connect failed", error.message)
    }
}

connectToDB()

const { users } = require("./routes/userRoute")
app.use("/users", users)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})