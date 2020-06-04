const { Router } = require("express");
const Notification = require("../models/Notification");

const router = Router();

router.get("/", async (req, res) => {
  const notifications = await Notification.find({}, (err) => {
    if (err) throw err;
  });

  res.render("index", {
    title: "Notification list",
    isIndex: true,
    notifications,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Notification",
    isCreate: true,
  });
});

router.post("/create", async (req, res) => {
  const notification = new Notification({
    title: req.body.title,
  }, (err) => {
    if (err) throw err;
  });
  await notification.save();
  res.redirect("/");
});

router.post("/activate", async (req, res) => {
  const notification = await Notification.findById(req.body.id, (err) => {
    if (err) throw err;
  });

  notification.activated = !!req.body.activated;
  notification.assigned = req.body.assigned;
  await notification.save();

  res.redirect("/");
});

router.post("/delete/:id", async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id, (err) => {
    if (err) throw err;
  });

  res.redirect("/");
});

module.exports = router;
