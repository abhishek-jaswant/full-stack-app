const express = require("express")
const userRouter = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")
const { getAllUsers, getUserProfile, updateProfile, UpdateUserRole } = require("../controller/userController")

userRouter.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers)
userRouter.get("/profile", authMiddleware, getUserProfile)
userRouter.put("/profile", authMiddleware, updateProfile)
userRouter.patch("/:id/role", authMiddleware, roleMiddleware("admin"), UpdateUserRole)

module.exports = userRouter;