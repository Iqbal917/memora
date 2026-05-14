import express from 'express';
import jwt from 'jsonwebtoken';
import {connectDB} from "./db.js";
import UserModel from "./models/User.js";
import {JWT_SECRET} from "./config.js";
import ContentModel from "./models/Content.js";
import {userMiddleware} from "./middleware.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

async function startServer() {
    await connectDB();
    app.listen(3000, () => console.log("Server started on port 3000"));
}

startServer().catch((error) => {
    console.log("Failed to start server", error);
    process.exit(1);
});

app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation, hash the password
    try {
        const {username, password} = req.body;

        const existingUser = await UserModel.findOne({
            username: username,
        })

        if (existingUser) {
            return res.status(409).json({
                message: "User already exist",
            })
        }

        await UserModel.create({
            username,
            password,
        })

        res.json({
            message: "User successfully created!",
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating User",
            error: error,
        })
    }
})

app.post("/api/v1/signin",  async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({
            username: username,
            password: password,
        })
        if (!user) {
            return res.status(401).json({
                message: "Incorrect username or password",
            })
        }

        const token = jwt.sign({
                id: user._id,
            }, JWT_SECRET
        )

        res.json({
            message: "User successfully logged in",
            token: token,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Error signing in",
        })
    }
})

app.post("/api/v1/content", userMiddleware,async (req, res) => {
    const link = req.body.link
    const type = req.body.type
    await ContentModel.create({
        link,
        type,
        userId: new mongoose.Types.ObjectId(req.userId),
        tags: []
    })

    res.json({
        message: "Content successfully added!",
    })
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content,
    })
})

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: new mongoose.Types.ObjectId(contentId),
        userId: new mongoose.Types.ObjectId(req.userId),
    })

    res.json({
        message: "Content successfully deleted!",
    })
})

app.post("/api/v1/brain/share", (req, res) => {
})

app.get("/api/v1/brain/:shareLink", (req, res) => {
})

