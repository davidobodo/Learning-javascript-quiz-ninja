const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    ];

const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    response: document.querySelector('#response'),
    timer: document.querySelector('#timer strong'),
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    },
    render(target, content, attributes){
        for(const key in attributes){
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
    },
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score, game.score);
        this.render(this.result, '');
        this.render(this,info, '');
        this.resetForm();
    },
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    }
}

const game = {
    start(quiz){
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.ask();
        this.secondsRemaining = 20;
        this.timer = setInterval(this.countdown, 1000);
    },

    ask(){
        if(this.questions.length > 0){
            this.question = this.questions.pop();
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question,question);
        }else{
            this.gameOver();
        }
    },

    countdown(){
        game.secondsRemaining--;
        view.render(view.timer, game.secondsRemaining);
        if(game.secondsRemaining < 0){
            game.gameOver();
        }
    },

    check(e){
        e.preventDefault();
        const response = view.response.answer.value;
        const answer = this.question.realName;
        if(response === answer){
            view.render(view.result, 'Correct!', {'class': 'correct'});
            this.scroe++;
            view.render(view.score,this.score);
        } else{
            view.render(view.result,`Wrong! The correct answer was ${answer}`, {'class': 'wrong'});
        }
        view.resetForm();
        this.ask();
    },

    gameOver(){
        view.render(view.info, `Game Over, you scored ${this.score} point${this.score !==1 ? 's' : ''}` );
        view.teardown();
        clearInterval(this.timer);
    }
}

view.start.addEventListener('click', () => 
    game.start(quiz), false);


view.response.addEventListener('submit', (e) => 
    game.check(e), false);

view.hide(view.response);



