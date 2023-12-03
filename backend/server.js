const path = require("path");

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.use(morgan("dev"));
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

const landingRoutes = require("./routes/landing");
const authRoutes = require("./routes/authentication");
const globalLobbyRoutes = require("./routes/global_lobby");
const setNewgameRoutes = require("./routes/set_newgame");
const gameRoutes = require("./routes/game");

app.use("/", landingRoutes);
app.use("/auth", authRoutes);
app.use("/lobby", globalLobbyRoutes);
app.use("/set_newgame", setNewgameRoutes);
app.use("/games", gameRoutes);

app.use((_request, _response, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// const path = require("path");

// const express = require("express");
// const createError = require("http-errors");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const {
//   viewSessionData,
//   sessionLocals,
//   isAuthenticated,
// } = require("./middleware/");

// const app = express();

// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "static")));

// const PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV === "development") {
//   require("dotenv").config();

//   const livereload = require("livereload");
//   const connectLiveReload = require("connect-livereload");

//   const liveReloadServer = livereload.createServer();
//   liveReloadServer.watch(path.join(__dirname, "static"));
//   liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//       liveReloadServer.refresh(`/`);
//     }, 100);
//   });

//   app.use(connectLiveReload());
// }

// app.use(
//   session({
//     store: new (require("connect-pg-simple")(session))({
//       createTableIfMissing: true,
//     }),
//     //secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: { secure: process.env.NODE_ENV !== "development" },
//   }),
// );
// if (process.env.NODE_ENV === "development") {
//   app.use(viewSessionData);
// }
// app.use(sessionLocals);

// const Routes = require("./routes");

// app.use("/", Routes.landing);
// app.use("/auth", Routes.authentication);
// app.use("/lobby", isAuthenticated, Routes.lobby);
// app.use("/games", isAuthenticated, Routes.game);

// app.use((_request, _response, next) => {
//   next(createError(404));
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
