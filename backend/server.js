require("dotenv").config();

const path = require("path");
const { createServer } = require("http");

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Server } = require("socket.io");

const {
  viewSessionData,
  sessionLocals,
  isAuthenticated,
} = require("./middleware/");

const app = express();
const httpServer = createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV !== "development" },
});

app.use(sessionMiddleware);

if (process.env.NODE_ENV === "development") {
  app.use(viewSessionData);
}

app.use(sessionLocals);

const io = new Server(httpServer);
io.engine.use(sessionMiddleware);
app.set("io", io);

io.on("connection", (socket) => {
  socket.join(socket.request.session.id);

  if (socket.handshake.query !== undefined) {
    socket.join(socket.handshake.query.id);
  }

  // Listen for chat messages
  socket.on("chat:message", ({ roomId, from, timestamp, message, hash }) => {
    // Broadcast the message to everyone in the room
    io.to(roomId).emit("chat:message", { from, timestamp, message, hash });
  });
});

const landingRoutes = require("./routes/landing");
const authRoutes = require("./routes/authentication");
const globalLobbyRoutes = require("./routes/global_lobby");
const setNewgameRoutes = require("./routes/set_newgame");
const unoRulesRoutes = require("./routes/uno_rules");
const gameRoutes = require("./routes/game");

app.use("/", landingRoutes);
app.use("/auth", authRoutes);
app.use("/lobby", globalLobbyRoutes);
app.use("/set_newgame", setNewgameRoutes);
app.use("/uno_rules", unoRulesRoutes);
app.use("/games", gameRoutes);

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