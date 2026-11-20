const { Router } = require("express")
const users = Router()

const { postRegister, getUsers, getUsersBydId, deleteUser, updateUser, searchUser } = require("../controllers/users.controller")

users.post("/register", postRegister)
users.get("/getUsers", getUsers)
users.get("/getUsers/:id", getUsersBydId)
users.delete("/deleteUser/:id", deleteUser)
users.put("/updateUser/:id", updateUser)
users.get("/searchUser", searchUser)

module.exports = { users }