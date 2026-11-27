const { Router } = require("express")
const edus = Router()

const { postRegister, getEdus, deleteEdu, getEduById, updateEdu, searchEdu } = require("../controllers/edu.controller")

edus.post("/register", postRegister)
edus.get("/getEdus", getEdus)
edus.delete("/deleteEdu/:id", deleteEdu)
edus.get("/getEduById/:id", getEduById)
edus.put("/updateEdu/:id", updateEdu)
edus.get("/searchEdu", searchEdu)

module.exports = { edus }