let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let main = document.getElementById("main");
let tempImg;
let state;

function display_section() {

    main.style.opacity = 1;
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

                main.style.opacity = 0;
            }
        }

    } catch (err) { console.log(err); };
};