require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const formRouter = require("./controllers/formController");
const handleCustomError = require("./utils/errorHandler");
const sendEmail = require("./utils/emailSender");
const {
  readPendingRequests,
  clearPendingRequests,
} = require("./utils/fileHandler");

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static("public"));

// Use the form router
app.use("/", formRouter);

// Not Found middleware
app.use((req, res) => {
  handleCustomError(res, 404, "Page Not Found");
});

// Start sending emails every 15 seconds
setInterval(async () => {
  const pendingRequests = await readPendingRequests();
  if (pendingRequests.length > 0) {
    sendEmail(pendingRequests);
    clearPendingRequests();
  }
}, 15000);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
