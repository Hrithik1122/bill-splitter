//* NODES *//
const billInput = document.getElementById("bill");
const percentRadios = document.querySelectorAll("input[name=tip-percentage]");
const numberOfPeopleInput = document.getElementById("numberOfPeople");
const customTipInput = document.getElementById("customTip");
const tipPerPersonDisplay = document.getElementById("tipPerPerson");
const billPerPersonDisplay = document.getElementById("billPerPerson");
const resetButton = document.querySelector(".reset-btn");

const billError = document.querySelector(".bill-error");
const numberOfPeopleError = document.querySelector(".numberOfPeople-error");

//* VARIABLES *//
let bill;
let tipPercent;
let numberOfPeople;

let prevSelectedTipNode;
let prevTypedTip;

let billAlertOn;
let numberOfPeopleAlertOn;

//* FUNCTIONS for OPERATION *//
// Remove previous selection - radio
const removePreviousCheck = () => {
  if (prevSelectedTipNode) {
    prevSelectedTipNode.classList.remove("checked");
  }
};

// Remove previous selection - custom
const removePreviousCustomTip = () => {
  if (prevTypedTip) {
    customTipInput.value = null;
  }
};

// Calcalate tip
const calculateTip = () =>
  ((bill * (tipPercent * 0.01)) / numberOfPeople).toFixed(2);

// Calculate bill
const calculateBill = () => (bill / numberOfPeople).toFixed(2);

//* FUNCTIONS for UI *//
// Display results
const displayResults = () => {
  if (bill && tipPercent && numberOfPeople) {
    tipPerPersonDisplay.innerText = calculateTip();
    billPerPersonDisplay.innerText = calculateBill();
  }
};

const showAlert = (errorMsg, id) => {
  const inputElem = document.getElementById(id);
  errorMsg.style.display = "block";
  inputElem.style.boxShadow = "inset 0 0 0 2px #e17457";
};

const removeAlert = (errorMsg, id) => {
  const inputElem = document.getElementById(id);
  errorMsg.style.display = "none";
  inputElem.style.boxShadow = "inset 0 0 0 2px #26c2ae";
};

const removeAlertBorder = (id) => {
  const inputElem = document.getElementById(id);
  inputElem.style.boxShadow = null;
};

//* EVENT LISTENERS *//
// Listen keyup event and save bill amount
billInput.addEventListener("keyup", () => {
  bill = parseInt(billInput.value);
  if (bill > 0 && billAlertOn) {
    removeAlert(billError, "bill");
  }
  displayResults();
});

// Listen click event and save percent in radio check
percentRadios.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    removePreviousCustomTip();

    const radioClass = e.target.parentElement.classList;
    if (radioClass.contains("checked")) {
      e.target.parentElement.classList.remove("checked");
    } else if (!radioClass.contains("checked")) {
      removePreviousCheck();
      // Add checked to class to change div color
      radioClass.add("checked");
      // Save tip percent value
      tipPercent = parseInt(e.target.value);
      // Save the current value for user's future selection.
      prevSelectedTipNode = e.target.parentElement;
      prevTypedTip = null;
      displayResults();
    }
  });
});

// Listen keyup event and save percent in custom input
customTipInput.addEventListener("keyup", (e) => {
  removePreviousCheck();
  tipPercent = parseInt(e.target.value);
  prevTypedTip = e.target.value;
  displayResults();
});

// Listen keyup event and save number of people
numberOfPeopleInput.addEventListener("keyup", () => {
  numberOfPeople = parseInt(numberOfPeopleInput.value);
  if (numberOfPeople > 0 && numberOfPeopleAlertOn) {
    removeAlert(numberOfPeopleError, "numberOfPeople");
  }
  displayResults();
});

// Listen click event and reset the splitter
resetButton.addEventListener("click", () => {
  billInput.value = "";
  bill = 0;
  removePreviousCheck();
  tipPercent = 0;
  numberOfPeopleInput.value = "";
  numberOfPeople = 0;
  tipPerPersonDisplay.innerText = 0;
  billPerPersonDisplay.innerText = 0;
});

billInput.addEventListener("blur", () => {
  if (!bill) {
    showAlert(billError, "bill");
    billAlertOn = true;
  } else if (bill) {
    removeAlertBorder("bill");
  }
});

numberOfPeopleInput.addEventListener("blur", () => {
  if (!numberOfPeople) {
    showAlert(numberOfPeopleError, "numberOfPeople");
    numberOfPeopleAlertOn = true;
  } else if (numberOfPeople) {
    removeAlertBorder("numberOfPeople");
  }
});
