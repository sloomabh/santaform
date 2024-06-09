const fetch = require("node-fetch");

const fetchUserData = async () => {
  const userProfiles = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.jsondd"
  ).then((res) => res.json());
  const users = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userjyjys.json"
  ).then((res) => res.json());
  return { userProfiles, users };
};

module.exports = fetchUserData;
