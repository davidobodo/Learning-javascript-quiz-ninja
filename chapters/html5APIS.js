const btn = document.getElementById('rainbow');
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'rebeccapurple', 'violet'];
function change() {
    document.body.style.background = rainbow[Math.floor(7 * Math.random())];
}
btn.addEventListener('click', change);
const form = document.forms[0]; form.addEventListener('submit', factorize, false);

function factorize(event) {
    event.preventDefault();
    document.getElementById('output').innerHTML = '<P>This could take a while...</p>';
    const number = Number(form.number.value);

    if (window.worker) {
        const worker = new worker('html5APIS_worker.js');
        worker.postMessage(number);
        worker.addEventListener('message', e => {
            document.getElementById('output').innerHTML = e.data;
        }, false);
    }
}
