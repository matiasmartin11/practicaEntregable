//data

//notifications
const messages = [
    'Selecciona una respuesta y haz click en submit para pasar a la siguiente pregunta',
    'Pregunta enviada correctamente',
    'Has de seleccionar una opción'
];

const types = [
    'info',
    'success',
    'error'
];

//lista o array
const quizData = [
    {
        question: "Pregunta 1",
        a: "Respuesta 1",
        b: "Respuesta 2",
        c: "Respuesta 3",
        d: "Respuesta 4",
        correct: "d"
    },
    {
        question: "Pregunta 2",
        a: "Respuesta 1",
        b: "Respuesta 2",
        c: "Respuesta 3",
        d: "Respuesta 4",
        correct: "a"
    },

];

//identificacion de nodos (DOM) clave
const quiz = document.getElementById('quiz'); 
//radio buttons
const answers = document.querySelectorAll('.answer');
const question = document.getElementById('question');
//labels de las respuestas
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
//boton
const submitBtn = document.getElementById('submit');
//notifications
const toasts = document.getElementById('toasts');

let currentQuiz = 0; //var. globales
let score = 0;

function deselectAnswers() {
    answers.forEach((answer) => answer.checked = false);
}

function loadQuiz() {
    //deseleccionar las respuestas
    deselectAnswers();
    if(currentQuiz== 0){
        createNotification(messages[0], types[0]);
    }
    const currentQuizData = quizData[currentQuiz]; //var. local

    question.innerText = currentQuizData.question;
    //inyeccion de respuestas
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;


}

function getSelected() {
    let answerSelected;
    //recorrido de todas las respuestas
    answers.forEach( (answer) => {
        if (answer.checked) {
            answerSelected = answer.id;  
        }
    });
    
    return answerSelected;

}

submitBtn.addEventListener('click', () => {

    //obtener la respuesta del participante
    const answer = getSelected(); //var. local
    //verificar correccion o no de la respuesta
    if (answer) {
        createNotification(messages[1], types[1]);
        if (answer === quizData[currentQuiz].correct) {
            score += 1; //score = score + 1;
        }

        currentQuiz = currentQuiz + 1; //currentQuiz += 1;
        //frontera - final del quiz
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                    <h2>Usted ha acertado ${score} de ${quizData.length}</h2>
                    <button onclick="location.reload()">Reload</button> 
                ` //backtick
        }
    }else{
        createNotification(messages[2], types[2]);
    }

});

loadQuiz();

//funciones
function createNotification(message = null, type = null) {

    //crear el nodo que representa la notificacion en el DOM
    const notif = document.createElement('div');
    if (notif) {
        notif.classList.add('toast');
        notif.classList.add(type ? type : getRandomType());
        notif.innerText = message ? message : getRandomMessage(); //if ternario

        //añadir el noto creado al DOM
        toasts.appendChild(notif);

        //desaparicion automatica de la notificacion
        setTimeout(() => {
            //toasts.removeChild(notif);
            notif.remove();
        }, 3000);
    }
}

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex]; 
}

function getRandomType() {
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex]; 
}







