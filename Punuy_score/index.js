let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let score = document.getElementById("score");
let curScore;

let state;

function display_section() {
    score.style.opacity = 1;
}

socket.onmessage = event => {
    try {
        let data = JSON.parse(event.data);
        let menu = data.menu;
        let play = data.gameplay;

        if (state !== menu.state) {
            state = menu.state;

            if (state == 2) {
                setTimeout(display_section, 1000);
            }
            else {
                score.style.opacity = 0;
            }
        }

        if (curScore !== play.score){
            curScore = play.score;
            score.innerHTML = curScore;
        }

    } catch (err) { console.log(err); };
};