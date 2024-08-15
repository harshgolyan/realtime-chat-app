const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const color = require("colors")
const dotenv = require("dotenv")

const app = express()
dotenv.config()
const port = 3000 || process.env.PORT

app.use(express.json());
app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/user'))
app.use(require('./routes/chat'))
app.use(require('./routes/message'))


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected".yellow.italic.underline)
    }
    catch (error) {
        console.log(error)
    }
}

connectDB();
const server = app.listen(port, () => {
    console.log(`server is running at ${port}`.cyan.bold);
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
})
io.on("connection", (socket) => {
    console.log(`connected to socket.io`)

    socket.on("setup", (userData) => {
        socket.join(userData);
        socket.emit("connected");
    })

    socket.on("join chat", (room) => {
        console.log("chat room id: ",room)
        socket.join(room)
    })

    socket.on("new message", (newMessageReceived) => {
        console.log(newMessageReceived)
        const chat = newMessageReceived.chat;

        if (!chat.users) return console.log("Chat users not defined");

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return;
            socket.to(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
})