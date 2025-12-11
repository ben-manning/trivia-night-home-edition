// logic

// questions and answers can be encapsulated in an object

// example object

let exampleObj = {
  "question": "What NFL team is located in Atlanta, Georgia?",
  "option-one": "Jaguars",
  "option-two": "Bulldogs",
  "option-three": "Jets",
  "option-four": "Falcons",
  "answer": "Falcons"
}

// logic to display the question
const questionHeader = document.querySelector('.question');
questionHeader.innerText = exampleObj.question;

// logic to grab the options for display
const optionOneDisplay = document.querySelector('.option-one');
const optionTwoDisplay = document.querySelector('.option-two');
const optionThreeDisplay = document.querySelector('.option-three');
const optionFourDisplay = document.querySelector('.option-four');

// logic to display the options onto the page
optionOneDisplay.innerText = exampleObj['option-one'];
optionTwoDisplay.innerText = exampleObj['option-two'];
optionThreeDisplay.innerText = exampleObj['option-three'];
optionFourDisplay.innerText = exampleObj['option-four'];

const clickableButtons = document.querySelectorAll('.selection-button');

clickableButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log('this button has been clicked');
  });
});


