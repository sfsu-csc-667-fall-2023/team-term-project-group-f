require("dotenv").config();

const path = require("path");

const express = require("express");
const session = require("express-session");
const { createServer } = require("http");
const { Server } = require("socket.io");
const passport = require("passport");
const methodOverride = require("method-override");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const initializePassport = require("./routes/passport-config");
const flash = require("express-flash");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id),
);
const users = [];

const {
  viewSessionData,
  sessionLocals,
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middleware/");

const app = express();
const httpServer = createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh(`/`);
    }, 100);
  });

  app.use(connectLiveReload());
}

const sessionMiddleware = session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || "key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV !== "development" },
});
app.use(sessionMiddleware);

const io = new Server(httpServer);
io.engine.use(sessionMiddleware);
app.set("io", io);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
if (process.env.NODE_ENV === "development") {
  app.use(viewSessionData);
}

app.use(sessionLocals);
// const io = require('socket.io')(httpServer)
app.use(express.static(path.join(__dirname, "views")));
app.use("/routes", express.static(path.join(__dirname, "routes")));
let socketsConected = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
  console.log("Socket connected", socket.id);
  socketsConected.add(socket.id);
  io.emit("clients-total", socketsConected.size);

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
    socketsConected.delete(socket.id);
    io.emit("clients-total", socketsConected.size);
  });

  socket.on("message", (data) => {
    // console.log(data)
    socket.broadcast.emit("chat-message", data);
  });
}

const authenticationRoutes = require("./routes/authentication");
// const globalLobbyRoutes = require("./routes/global_lobby");
const setNewgameRoutes = require("./routes/set_newgame");
const joinGameRoutes = require("./routes/join_game");
const waitingRoomRoutes = require("./routes/waiting_room");
const unoRulesRoutes = require("./routes/uno_rules");
const gameRoutes = require("./routes/game");

// const chatRoutes = require("./routes/chat");
// app.use("/chat", chatRoutes);

app.use("/", authenticationRoutes);
// app.use("/lobby", globalLobbyRoutes);
app.use("/set_newgame", setNewgameRoutes);
app.use("/join_game", joinGameRoutes);
app.use("/waiting_room", waitingRoomRoutes);
app.use("/uno_rules", unoRulesRoutes);
app.use("/game", gameRoutes);

app.use((_request, _response, next) => {
  next(createError(404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
