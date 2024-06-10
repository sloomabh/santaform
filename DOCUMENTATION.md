# Santa App

The Santa App is a Node.js application built on Express that allows users to submit their Christmas wishes to Santa. It handles user data, validates age, stores pending requests, and sends email notifications using Node.js modules and third-party packages.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Packages Used](#packages-used)
- [How to Run the Project](#how-to-run-the-project)
- [Conclusion](#conclusion)

## Project Overview

The Santa App is structured following the MVC (Model-View-Controller) architecture for better organization and separation of concerns:

- **Model**: Handles data logic, including fetching user data and calculating age.
- **View**: Contains EJS templates for rendering HTML views.
- **Controller**: Manages user requests, processes data from the model, and renders views.

## Project Structure

The directory structure of the project is as follows:
.
├── controllers
│ └── formController.js
├── db
│ └── pendingRequests.json
├── models
│ └── UserProfile.js
├── public
│ ├── client.js
│ └── style.css
├── utils
│ ├── errorHandler.js
│ ├── emailSender.js
│ ├── fileHandler.js
│ ├── calculateAge.js
│ └── fetchUserData.js
├── views
│ ├── emailTemplate.ejs
│ ├── error.ejs
│ └── index.html
├── .env
├── package.json
└── server.js

### Explanation of Directories and Files

- **controllers/**: Contains the `formController.js` file, which handles HTTP requests, interacts with the model, and renders views.
- **db/**: Stores `pendingRequests.json`, a JSON file used to store pending wish requests.
- **models/**: Includes `UserProfile.js` for handling user data operations, including fetching data from external APIs.
- **public/**: Contains static files like `client.js` and `style.css` for client-side functionality and styling.
- **utils/**: Houses utility functions like error handling, email sending, file handling, and age calculation.
- **views/**: Holds EJS templates (`emailTemplate.ejs`, `error.ejs`, `index.html`) for rendering HTML views.

## Packages Used

### EJS (Embedded JavaScript templates)

- **Purpose**: EJS is used as the view engine to render dynamic HTML pages with data from the server.
- **Usage**: Templates like `emailTemplate.ejs` and `error.ejs` utilize EJS syntax to inject data into HTML.

### Node-fetch

- **Purpose**: Node-fetch is employed to make HTTP requests to external APIs (GitHub URLs) for fetching user profiles and user data.
- **Usage**: `UserProfile.js` module uses `node-fetch` to retrieve JSON data asynchronously.

### Nodemailer

- **Purpose**: Nodemailer facilitates email sending functionality within the application.
- **Usage**: `emailSender.js` uses Nodemailer to compose and send emails with pending requests to Santa's email address.

### Jest and Supertest

- **Purpose**: Jest is a testing framework, and Supertest is used for HTTP assertions during testing.
- **Usage**: `formController.test.js` file employs Jest and Supertest to test form submission routes and verify expected behaviors.

## How to Run the Project

1. **Clone the Repository**: `git clone https://github.com/your-username/santa-app.git`
2. **Install Dependencies**: `cd santa-app` then `npm install`
3. **Set Environment Variables**: Create a `.env` file with `ETHEREAL_USER` and `ETHEREAL_PASS` for Nodemailer setup.
4. **Start the Server**: `npm start`
5. **Access the App**: Open `http://localhost:3000` in your web browser.

## Conclusion

The Santa App demonstrates the implementation of MVC architecture in a Node.js application, enhancing code modularity, maintainability, and scalability. It effectively utilizes various Node.js modules and third-party packages to achieve its functionality, making it a robust solution for managing Christmas wish submissions.
