const express = require("express");
const router = express.Router();
const fetchUserData = require("../models/UserProfile");
const calculateAge = require("../utils/calculateAge");
const handleCustomError = require("../utils/errorHandler");
const { addPendingRequest } = require("../utils/fileHandler");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.post("/", async (req, res) => {
  const { userid, wish } = req.body;

  try {
    // Fetch user data
    const { userProfiles, users } = await fetchUserData();

    // Find the user
    const user = users.find((u) => u.username === userid);
    if (!user) {
      return handleCustomError(res, 404, "User not registered.");
    }

    // Find the user profile
    const userProfile = userProfiles.find((up) => up.userUid === user.uid);

    // Check user's age
    const age = calculateAge(userProfile.birthdate);
    if (age > 10) {
      return handleCustomError(res, 400, "User is older than 10 years.");
    }

    // Add to pending requests
    await addPendingRequest({
      username: user.username,
      address: userProfile.address,
      wish: wish,
    });

    // Everything is valid
    res.render("success");
  } catch (error) {
    console.error("Error processing form submission:", error);
    return handleCustomError(res, 500, "Internal Server Error");
  }
});

module.exports = router;
