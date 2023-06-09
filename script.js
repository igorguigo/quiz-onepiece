let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetQuiz);

function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.thumb').src = q.thumb;

        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(element => {
            element.addEventListener('click', optionClickEvent)
        });

    }else{
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    document.querySelector('.scorePct').innerHTML = `Você acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`;

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Mais sorte na próxima :(';
        document.querySelector('.scorePct').style.color = '#ff0000';
        document.querySelector('.prizeImage').src = '/img/sad.gif';
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#ffff00';
        document.querySelector('.prizeImage').src = '/img/happy.gif';
    }else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom, parabéns';
        document.querySelector('.scorePct').style.color = '#0d630d';
        document.querySelector('.prizeImage').src = '/img/very_happy.gif';
    }

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetQuiz(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}