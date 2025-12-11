// https://opentdb.com/api_config.php --> API resource

let openSourceTriviaURLs = {
  twentyEasyQuestions: 'https://opentdb.com/api.php?amount=20&category=10&difficulty=easy&type=multiple',
}

let triviaQuestions;

const button = document.querySelector('button');
const playButton = document.querySelector('.play-button');

button.addEventListener('click', async () => {
  const triviaAPIResponse = await fetch(openSourceTriviaURLs.twentyEasyQuestions);
  const jsonData = await triviaAPIResponse.json();
  triviaQuestions = jsonData.results;
  button.style.visibility = 'hidden';
  playButton.style.visibility = 'visible';
});

playButton.addEventListener('click', () => {
  console.log(triviaQuestions);
});

// logic

// questions and answers can be encapsulated in an object

// example object

// logic to display the question
// const questionHeader = document.querySelector('.question');
// questionHeader.innerText = exampleObj.question;

// // logic to grab the options for display
// const optionOneDisplay = document.querySelector('.option-one');
// const optionTwoDisplay = document.querySelector('.option-two');
// const optionThreeDisplay = document.querySelector('.option-three');
// const optionFourDisplay = document.querySelector('.option-four');

// // logic to display the options onto the page
// optionOneDisplay.innerText = exampleObj['option-one'];
// optionTwoDisplay.innerText = exampleObj['option-two'];
// optionThreeDisplay.innerText = exampleObj['option-three'];
// optionFourDisplay.innerText = exampleObj['option-four'];

// const clickableButtons = document.querySelectorAll('.selection-button');

// clickableButtons.forEach((button) => {
//   button.addEventListener('click', (evt) => {
//     console.log(evt.currentTarget.innerText);
//   });
// });


