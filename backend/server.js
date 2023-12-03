require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const requestTime = require("./middleware/request-time");

console.log("Booting Server...");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(requestTime);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "static")));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const rootRoutes = require("./routes/rootRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loggedinRoutes = require("./routes/loggedinRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/", rootRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/loggedin", loggedinRoutes);
app.use("/chat", chatRoutes);

// Socket.IO logic for chat
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR\n\r", err.stack);
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

console.log("Server Booted!");
