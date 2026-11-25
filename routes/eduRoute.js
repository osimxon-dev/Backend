const { Router } = require("express")
const edus = Router()

const { postRegister, getEdus, deleteEdu, getEduById } = require("../controllers/edu.controller")

edus.post("/register", postRegister)
edus.get("/getEdus", getEdus)
edus.delete("/deleteEdu/:id", deleteEdu)
edus.get("/getEduById/:id", getEduById)

module.exports = { edus }