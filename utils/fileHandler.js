const fs = require("fs");
const path = require("path");
const pendingRequestsPath = path.join(__dirname, "../db/pendingRequests.json");

const readPendingRequests = async () => {
  try {
    if (!fs.existsSync(pendingRequestsPath)) {
      await fs.promises.writeFile(pendingRequestsPath, JSON.stringify([]));
    }
    const data = await fs.promises.readFile(pendingRequestsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading pending requests:", error);
    return [];
  }
};

const addPendingRequest = async (request) => {
  try {
    const requests = await readPendingRequests();
    requests.push(request);
    await fs.promises.writeFile(
      pendingRequestsPath,
      JSON.stringify(requests, null, 2)
    );
  } catch (error) {
    console.error("Error adding pending request:", error);
  }
};

const clearPendingRequests = async () => {
  try {
    await fs.promises.writeFile(pendingRequestsPath, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing pending requests:", error);
  }
};

module.exports = {
  readPendingRequests,
  addPendingRequest,
  clearPendingRequests,
};
