const clock = document.querySelector("#clock");

function printClock() {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hour}:${minutes}:${second}`;
}

printClock();
setInterval(printClock, 1000);
