const fetch = require("node-fetch");

const fetchUserData = async () => {
  try {
    const userProfiles = await fetch(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
    ).then((res) => res.json());
    const users = await fetch(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    ).then((res) => res.json());
    return { userProfiles, users };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { userProfiles: [], users: [] };
  }
};

module.exports = fetchUserData;
