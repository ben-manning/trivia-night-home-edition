// https://opentdb.com/api_config.php --> API resource

let openSourceTriviaURLs = {
  twentyEasyQuestions: 'https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple',
}

// variables for gameplay
let triviaQuestions;
let questionNumber;
let selections;

// page elements
const questionHeader = document.querySelector('.question');
const button = document.querySelector('button');
const playButton = document.querySelector('.play-button');
const optionOneDisplay = document.querySelector('.option-one');
const optionTwoDisplay = document.querySelector('.option-two');
const optionThreeDisplay = document.querySelector('.option-three');
const optionFourDisplay = document.querySelector('.option-four');

button.addEventListener('click', async () => {
  const triviaAPIResponse = await fetch(openSourceTriviaURLs.twentyEasyQuestions);
  const jsonData = await triviaAPIResponse.json();
  triviaQuestions = jsonData.results;
  console.log(triviaQuestions);
  button.style.visibility = 'hidden';
  playButton.style.visibility = 'visible';
});

playButton.addEventListener('click', () => {
  current = 0;
  questionHeader.innerText = `${triviaQuestions[current].question}`;
  selections = [...triviaQuestions[current].incorrect_answers, triviaQuestions[current].correct_answer];
  optionOneDisplay.innerText = selections[0];
  optionTwoDisplay.innerText = selections[1];
  optionThreeDisplay.innerText = selections[2];
  optionFourDisplay.innerText = selections[3];
});





// // logic to display the options onto the page


// const clickableButtons = document.querySelectorAll('.selection-button');

// clickableButtons.forEach((button) => {
//   button.addEventListener('click', (evt) => {
//     console.log(evt.currentTarget.innerText);
//   });
// });


