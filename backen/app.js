require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/config");
// const rateLimit = require('express-rate-limit')
const authRouter = require("./router/authRoutes");
const userRouter = require("./router/userRoutes");
const resourceRouter = require("./router/resourceRouter");
// const taskRouter = require("./router/taskRoutes");

// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   limit: 5, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests please try again later',
// });

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/resources", resourceRouter);

// Server and Database Connection
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Failed to connect Database:", error.message);
        process.exit(1);
    }
};

startServer();