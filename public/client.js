// client-side js
// run by the browser each time your view template is loaded

console.log("hello world :o");

// Define variables that reference elements on our page
const santaForm = document.forms[0];
const useridInput = santaForm.elements["userid"];
const wishTextarea = santaForm.elements["wish"];
const errorContainer = document.getElementById("error-container");

// Function to display errors
function displayError(message) {
  errorContainer.innerText = message;
}

// Function to clear errors
function clearErrors() {
  errorContainer.innerText = "";
}

// Listen for the form to be submitted
santaForm.onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission

  // Clear previous errors
  clearErrors();

  // Validate user ID
  const userid = useridInput.value.trim();
  if (userid === "") {
    displayError("Please enter your name.");
    return;
  }

  // Validate wish
  const wish = wishTextarea.value.trim();
  if (wish === "") {
    displayError("Please enter your wish.");
    return;
  }

  if (wish.length > 100) {
    displayError("Wish should not exceed 100 characters.");
    return;
  }

  // If no errors, submit the form
  santaForm.submit();
};
