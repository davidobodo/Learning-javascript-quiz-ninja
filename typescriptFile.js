var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var url = "https://spbooks.github.io/jsninja2/questions.json";
fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (quiz) {
    view.start.addEventListener('click', function () { return game.start(quiz.questions); }, false);
    view.response.addEventListener('click', function (e) { return game.check(e); }, false);
});
function random(a, b) {
    var _a;
    if (b === void 0) { b = 1; }
    if (b === 1) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}
function shuffle(array) {
    var _a;
    for (var i = array.length; i; i--) {
        var j = random(i) - 1;
        _a = [array[j], array[i - 1]], array[i - 1] = _a[0], array[j] = _a[1];
    }
}
//controlling all display in the app
var view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    response: document.querySelector('#response'),
    timer: document.querySelector('#timer strong'),
    show: function (element) {
        element.style.display = 'block';
    },
    hide: function (element) {
        element.style.display = 'none';
    },
    render: function (target, content, attributes) {
        for (var key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    setup: function () {
        // console.log(this) // refers to view object
        console.log(this.score);
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score, game.score);
        this.render(this.result, '');
        this.render(this.info, '');
    },
    teardown: function () {
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    buttons: function (array) {
        return array.map(function (value) { return "<button>" + value + "</button>"; }).join('');
    }
};
var game = {
    secondsRemaining: 20,
    score: 0,
    start: function (quiz) {
        this.questions = __spreadArrays(quiz);
        view.setup();
        this.ask();
        this.timer = setInterval(this.countdown, 1000);
    },
    ask: function () {
        if (this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            var options = [
                this.questions[0].realName,
                this.questions[1].realName,
                this.question.realName,
            ];
            shuffle(options);
            var question = "What is " + this.question.name + "'s real name?";
            view.render(view.question, question);
            view.render(view.response, view.buttons(options));
        }
        else {
            this.gameOver();
        }
    },
    countdown: function () {
        // console.log(this) // refers to window object
        game.secondsRemaining--;
        view.render(view.timer, game.secondsRemaining);
        if (game.secondsRemaining <= 0) {
            game.gameOver();
        }
    },
    check: function (e) {
        var response = e.target.textContent;
        var answer = this.question.realName;
        if (response === answer) {
            view.render(view.result, 'Correct!', { 'class': 'correct' });
            game.score++;
            view.render(view.score, game.score);
        }
        else {
            view.render(view.result, "Wrong! The correct answer was " + answer, { 'class': 'wrong' });
        }
        this.ask();
    },
    gameOver: function () {
        view.render(view.info, "Game Over, you scored " + game.score + " point" + (game.score !== 1 ? 's' : ''));
        view.teardown();
        clearInterval(this.timer);
        this.hiScore();
    },
    hiScore: function () {
        console.log("hehehe");
        var hi = localStorage.getItem('highScore') || 0;
        if (this.score > hi || hi === 0) {
            // localStorage.setItem('highScore', game.score);
        }
        return localStorage.getItem('highScore');
    }
};
