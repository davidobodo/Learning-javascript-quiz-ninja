const url = "https://spbooks.github.io/jsninja2/questions.json";

fetch(url)
    .then(res => res.json())
    .then(quiz => {
        view.start.addEventListener('click', () => game.start(quiz.questions), false);
        view.response.addEventListener('click', (e) => game.check(e), false);
    })

function random(a, b = 1) {
    if (b === 1) {
        [a, b] = [b, a];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i) - 1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

//controlling all display in the app
const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    response: document.querySelector('#response'),
    timer: document.querySelector('#timer strong'),
    show(element) {
        element.style.display = 'block';
    },
    hide(element) {
        element.style.display = 'none';
    },
    render(target, content, attributes?: any) {
        for (const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    setup() {
        // console.log(this) // refers to view object
        console.log(this.score)
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score, game.score);
        this.render(this.result, '');
        this.render(this.info, '');
    },
    teardown() {
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    buttons(array) {
        return array.map(value => `<button>${value}</button>`).join('')
    }
}

const game = {
    secondsRemaining: 20,
    score: 0,
    start(quiz: string[]) {
        this.questions = [...quiz];
        view.setup();
        this.ask();
        this.timer = setInterval(this.countdown, 1000);
    },


    ask() {
        if (this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [
                this.questions[0].realName,
                this.questions[1].realName,
                this.question.realName,
            ];
            shuffle(options);
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question, question);
            view.render(view.response, view.buttons(options));
        } else {
            this.gameOver();
        }
    },

    countdown() {
        // console.log(this) // refers to window object
        game.secondsRemaining--;
        view.render(view.timer, game.secondsRemaining);
        if (game.secondsRemaining <= 0) {
            game.gameOver();
        }
    },

    check(e) {
        const response = e.target.textContent;
        const answer = this.question.realName;
        if (response === answer) {
            view.render(view.result, 'Correct!', { 'class': 'correct' });
            game.score++;
            view.render(view.score, game.score);
        } else {
            view.render(view.result, `Wrong! The correct answer was ${answer}`, { 'class': 'wrong' });
        }
        this.ask();
    },

    gameOver() {
        view.render(view.info, `Game Over, you scored ${game.score} point${game.score !== 1 ? 's' : ''}`);
        view.teardown();
        clearInterval(this.timer);
        this.hiScore();
    },

    hiScore() {
        console.log("hehehe")
        const hi = localStorage.getItem('highScore') || 0;
        if (this.score > hi || hi === 0) {
            // localStorage.setItem('highScore', game.score);
        }
        return localStorage.getItem('highScore')
    }
}






