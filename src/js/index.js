const defaultKey = "num23";
let myForm = null;
let btnSet = null;
let btnClear = null;
let inputField = null;
let contentDiv = null;

const init = () => {
  myForm = document.forms["myForm"];
  btnSet = myForm.elements.btnSet;
  btnClear = myForm.elements.btnClear;
  inputField = myForm.elements.inputField;

  myForm.addEventListener("submit", handleFormSubmit);
  btnSet.addEventListener("click", handleBtnSetClick);
  btnClear.addEventListener("click", handleBtnClearClick);
  inputField.addEventListener("input", handleInputChange);
  contentDiv = document.querySelector("#content");

  checkLocalStorage();
};

const handleFormSubmit = event => event.preventDefault();

const handleBtnSetClick = () => {
  setLocalValue(defaultKey, inputField.value);
  clearElementValue(inputField);
  setElementDisabled(btnSet);
};

const handleBtnClearClick = () => {
  removeLocalValue(defaultKey);
  clearElementValue(inputField);
  setElementDisabled(btnSet);
};

const handleInputChange = function() {
  this.value = this.value.replace(/[^0-9]/g, "");
  this.value.length ? setElementEnabled(btnSet) : setElementDisabled(btnSet);
};

const checkLocalStorage = () => {
  try {
    const value = getLocalValue(defaultKey);
    if (value) {
      const bgColor = parseInt(value) % 2 ? "red" : "green";
      createDomElement(value, bgColor);
    }
  } catch (error) {
    console.error(error);
  }
};

const clearElementValue = element => (element.value = "");
const setElementEnabled = element => (element.disabled = false);
const setElementDisabled = element => (element.disabled = true);

const createDomElement = (value, bgColor) => {
  const p = document.createElement("p");
  const node = document.createTextNode(value);

  p.appendChild(node);
  p.classList.add(
    "ui",
    "padded",
    "text",
    "container",
    "segment",
    "inverted",
    "paragraph",
    bgColor
  );
  contentDiv.insertBefore(p, contentDiv.childNodes[0]);
};

const setLocalValue = (key, value) => localStorage.setItem(key, value);
const getLocalValue = key => localStorage.getItem(key);
const removeLocalValue = key => localStorage.removeItem(key);

document.addEventListener("DOMContentLoaded", init);
