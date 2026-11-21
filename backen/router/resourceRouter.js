const express = require("express");

const resourceRouter = express.Router();


const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const { createResource, getResources, updateResource, deleteResource } = require("../controller/resourceController")

resourceRouter.post("/", authMiddleware, roleMiddleware("admin", "moderator"), createResource)

resourceRouter.get("/", authMiddleware, getResources)

resourceRouter.put("/:id", authMiddleware, roleMiddleware("admin", "moderator"), updateResource)
resourceRouter.delete(
    "/:id",
   authMiddleware,
   roleMiddleware("admin", "moderator"),
    deleteResource
);

module.exports = resourceRouter;