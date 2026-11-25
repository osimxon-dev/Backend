const { Router } = require("express")
const edus = Router()

const { postRegister, getEdus, deleteEdu } = require("../controllers/edu.controller")

edus.post("/register", postRegister)
edus.get("/getEdus", getEdus)
edus.delete("/deleteEdu/:id", deleteEdu)

module.exports = { edus }