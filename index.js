const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const hbsHelper = require("./handlers/handlebars");
const notificationRoutes = require("./routes/notifications");

const PORT = process.env.PORT || 8000;

const app = express();

const hbs = exphbs.create({
  helpers: hbsHelper,
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(notificationRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://test:test@cluster0-jfgbm.mongodb.net/notifications",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log("Server has been started...");
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

start();
