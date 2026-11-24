const { Router } = require("express")
const edus = Router()

const { postRegister } = require("../controllers/edu.controller")

edus.post("/register", postRegister)

module.exports = { edus }