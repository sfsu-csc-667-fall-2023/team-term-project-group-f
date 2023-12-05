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
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

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
  secret: true,
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
});

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

app.use((_request, _response, next) => {
  next(createError(404));
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
