// Get the input box element where the calculator's result will be displayed
let input = document.getElementById('inputBox');

// Get all button elements in the calculator
let buttons = document.querySelectorAll('button');

// Initialize an empty string to store the expression input by the user
let string = "";

// Convert the NodeList of buttons into an array for easier manipulation
let arr = Array.from(buttons);

// Add a click event listener to each button
arr.forEach(button => {
  button.addEventListener('click', (e) => {
    // Check if the clicked button is the equal sign
    if(e.target.innerHTML == '=') {
      // Evaluate the expression in the string and display the result in the input box
      string = eval(string);
      input.value = string;
    }
    // Check if the clicked button is for percentage calculation
    else if(e.target.innerHTML == '%') {
      // Handle percentage calculation: % should divide the number before it by 100
      if (string !== "") {
        // Extract the last number from the string
        let lastNumber = extractLastNumber(string);
        // Calculate the percentage value and convert it to string
        let percentageValue = (parseFloat(lastNumber) / 100).toString();
        // Replace the last number in the string with its percentage value
        string = string.replace(lastNumber, percentageValue);
        // Update the input box to show the modified expression
        input.value = string;
      }
    }
    // Check if the clicked button is 'AC' (All Clear)
    else if(e.target.innerHTML == 'AC'){
      // Reset the string and clear the input box
      string = "";
      input.value = string;
    }
    // Check if the clicked button is 'DEL' (Delete last character)
    else if(e.target.innerHTML == 'DEL'){
      // Remove the last character from the string
      string = string.substring(0, string.length - 1);
      // Update the input box to reflect the modified expression
      input.value = string;
    }
    // For all other buttons (numbers and operators)
    else {
      // Append the button's value to the string
      string += e.target.innerHTML;
      // Update the input box to display the current expression
      input.value = string;
    }
  })
});

// Function to extract the last number in the string for percentage calculation
function extractLastNumber(str) {
  // Use a regular expression to find the last number in the string
  let match = str.match(/(\d+\.?\d*)$/);
  // Return the last number found, or "0" if none is found
  return match ? match[0] : "0";
}
