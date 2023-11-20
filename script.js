const questions = [
    {
        question:"Which is The Largest Animal in The World ?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"Which is The Capital of IRAN ?",
        answers:[
            {text:"Tehran",correct:true},
            {text:"Qom",correct:false},
            {text:"Isfahan",correct:false},
            {text:"Yazd",correct:false},
        ]
    },
    {
        question:"Which is The Capital of France ?",
        answers:[
            {text:"frankfurt",correct:false},
            {text:"Re du janiorio",correct:false},
            {text:"Paris",correct:true},
            {text:"NYC",correct:false},
        ]
    },
    {
        question:"Which is The Capital of Afghanistan ?",
        answers:[
            {text:"Kabul",correct:true},
            {text:"Samrghand",correct:false},
            {text:"Bukhara",correct:false},
            {text:"Sistan",correct:false},
        ]
    },
    {
        question:"Who Won The 2023 Mr.Olympia ?",
        answers:[
            {text:"Hani Rambod",correct:false},
            {text:"J Cutler",correct:false},
            {text:"Hadi Chopan",correct:false},
            {text:"Drake Lansford",correct:true},
        ]
    },

];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answers-buttons');
const nextButton = document.getElementById('next-btn');
const explainScore = document.getElementById('explain');
explainScore.innerHTML='';

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    explainScore.innerHTML=''
    showQuestion();
}

function showQuestion(){
    restState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct
        }
        button.addEventListener("click",selectAnswer);
    })
}

function restState(){
    nextButton.style.display ='none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore (){
    restState();
    questionElement.innerHTML = 'Youre Score ' + score + " out of " + questions.length + " !";
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"

    const score_description =['you screw it up','So Sorry, Try again!','Not so bad,but its okay try again','Hmm, its okay Move on','Good, Nice Information','Maaaaaaaan You Did really Good Job , you desrved it so bad']

    if(score >= 0 && score <= score_description.length){
        explainScore.innerHTML = score_description[score];
    }else {
        explainScore.innerHTML = '';
    }

}


startQuiz();