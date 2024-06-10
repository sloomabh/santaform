const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const formRouter = require("../controllers/formController");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", formRouter); // Assuming formRouter handles routes at '/'

// Mocking res.render for view rendering
const mockRender = jest.fn();
const mockRes = {
  render: mockRender,
};

describe("Form Controller", () => {
  test("should return success page for valid user", async () => {
    const mockReq = { body: { userid: "charlie.brown", wish: "Toy Train" } };

    mockRender.mockImplementation((viewName, data) => {
      expect(viewName).toBe("success"); // Ensure it renders 'success' view
      expect(data).toEqual({}); // Assuming no data is passed to the view
    });

    await request(app).post("/").send(mockReq);

    // Assuming the response status code should be 200 for success
    expect(mockRes.statusCode).toBe(200);
  });

  test("should return error for non-registered user", async () => {
    // Mocking fetchUserData to return an empty userProfiles and users array
    jest.mock("../utils/fetchUserData", () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValueOnce({ userProfiles: [], users: [] }),
    }));

    const mockReq = { body: { userid: "unknown.user", wish: "Toy Train" } };

    mockRender.mockImplementation((viewName, data) => {
      expect(viewName).toBe("error"); // Ensure it renders 'error' view for non-registered user
      expect(data.errorMessage).toBe("User not registered.");
    });

    await request(app).post("/").send(mockReq);

    // Assuming the response status code should be 404 for non-registered user
    expect(mockRes.statusCode).toBe(404);
  });

  test("should return error for user older than 10 years", async () => {
    // Mocking calculateAge to return 11 years
    jest.mock("../utils/calculateAge", () => ({
      __esModule: true,
      default: jest.fn().mockReturnValueOnce(11),
    }));

    const mockReq = { body: { userid: "charlie.brown", wish: "Toy Train" } };

    mockRender.mockImplementation((viewName, data) => {
      expect(viewName).toBe("error"); // Ensure it renders 'error' view for user older than 10 years
      expect(data.errorMessage).toBe("User is older than 10 years.");
    });

    await request(app).post("/").send(mockReq);

    // Assuming the response status code should be 400 for user older than 10 years
    expect(mockRes.statusCode).toBe(400);
  });

  // Add more test cases as needed
});
