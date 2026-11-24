const { Router } = require("express")
const edus = Router()

const { postRegister, getEdus } = require("../controllers/edu.controller")

edus.post("/register", postRegister)
edus.get("/getEdus", getEdus)

module.exports = { edus }