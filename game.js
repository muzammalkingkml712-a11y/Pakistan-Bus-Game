// =========================
// GAME VARIABLES
// =========================

let selectedBus = "";

let busPosition = 50;

let score = 0;

let passengers = 0;

let gameRunning = false;


// =========================
// SELECT BUS
// =========================

function selectBus(bus) {

    selectedBus = bus;

    document.getElementById("selectedBus").innerText =
        "Selected Bus: " + bus;

}


// =========================
// START GAME
// =========================

function startGame() {

    if (selectedBus === "") {

        alert("Please select a bus first!");

        return;
    }


    let city =
        document.getElementById("citySelect").value;


    document.getElementById("menu")
        .classList.add("hidden");


    document.getElementById("game")
        .classList.remove("hidden");


    document.getElementById("cityName")
        .innerText = city;


    document.getElementById("busName")
        .innerText = selectedBus;


    score = 0;

    passengers = 0;

    updateGameInfo();


    gameRunning = true;

}


// =========================
// MOVE LEFT
// =========================

function moveLeft() {

    if (!gameRunning) return;


    busPosition -= 8;


    if (busPosition < 15) {
        busPosition = 15;
    }


    updateBusPosition();

}


// =========================
// MOVE RIGHT
// =========================

function moveRight() {

    if (!gameRunning) return;


    busPosition += 8;


    if (busPosition > 85) {
        busPosition = 85;
    }


    updateBusPosition();

}


// =========================
// UPDATE BUS
// =========================

function updateBusPosition() {

    document.getElementById("playerBus")
        .style.left = busPosition + "%";

}


// =========================
// BRAKE
// =========================

function stopBus() {

    if (!gameRunning) return;


    score += 5;

    updateGameInfo();

}


// =========================
// KEYBOARD CONTROLS
// =========================

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;


    if (event.key === "ArrowLeft") {

        moveLeft();

    }


    if (event.key === "ArrowRight") {

        moveRight();

    }


    if (event.code === "Space") {

        stopBus();

    }

});


// =========================
// GAME SCORE
// =========================

setInterval(function() {

    if (!gameRunning) return;


    score += 1;


    // Every 100 points
    // passenger picked up

    if (score % 100 === 0) {

        passengers += 1;

    }


    updateGameInfo();

}, 1000);


// =========================
// UPDATE INFORMATION
// =========================

function updateGameInfo() {

    document.getElementById("score")
        .innerText = score;


    document.getElementById("passengers")
        .innerText = passengers;

}


// =========================
// BACK TO MENU
// =========================

function backToMenu() {

    gameRunning = false;


    document.getElementById("game")
        .classList.add("hidden");


    document.getElementById("menu")
        .classList.remove("hidden");

}
