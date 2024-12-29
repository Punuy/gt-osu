let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let bg = document.getElementById("bg");
let tempImg;
let state;

function display_section() {
    bg.style.opacity = 1;
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
                bg.style.opacity = 0;
            }
        }

        if (tempImg !== data.menu.bm.path.full) {
            tempImg = data.menu.bm.path.full
            data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25')
            bg.setAttribute('src', `http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`)
        }
    } catch (err) { console.log(err); };
};