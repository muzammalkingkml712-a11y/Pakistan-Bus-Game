// ==========================================
// PAKISTAN BUS GAME
// CITY + VILLAGE + FAMOUS PLACE SYSTEM
// ==========================================


// ==========================================
// PLAYER DATA
// ==========================================

let player = JSON.parse(
    localStorage.getItem("pakistanBusPlayer")
) || {
    money: 5000,
    xp: 0,
    level: 1,
    downloadedMaps: ["Lahore"]
};


// ==========================================
// GAME VARIABLES
// ==========================================

let currentMode = "";
let currentCity = "";
let currentArea = "";
let currentPlace = "";

let busPosition = 50;
let fuel = 100;
let gameRunning = false;


// ==========================================
// PAKISTAN CITY DATA
// ==========================================

const cities = [

    {
        name: "Lahore",
        size: "250 MB",
        price: 0,

        areas: [
            "Lahore City",
            "Raiwind",
            "Shahdara",
            "Barki"
        ],

        places: [
            "Badshahi Mosque",
            "Minar-e-Pakistan",
            "Lahore Fort",
            "Liberty Market"
        ]
    },


    {
        name: "Karachi",
        size: "300 MB",
        price: 1000,

        areas: [
            "Karachi City",
            "Malir",
            "Gadap",
            "Landhi"
        ],

        places: [
            "Mazar-e-Quaid",
            "Clifton",
            "Sea View",
            "Empress Market"
        ]
    },


    {
        name: "Islamabad",
        size: "250 MB",
        price: 1000,

        areas: [
            "Islamabad City",
            "Bara Kahu",
            "Nilore",
            "Tarnol"
        ],

        places: [
            "Faisal Mosque",
            "Pakistan Monument",
            "Daman-e-Koh",
            "Rawal Lake"
        ]
    },


    {
        name: "Rawalpindi",
        size: "220 MB",
        price: 800,

        areas: [
            "Rawalpindi City",
            "Chakri",
            "Adiala",
            "Gujar Khan Road"
        ],

        places: [
            "Raja Bazaar",
            "Ayub Park",
            "Rawalpindi Railway Station"
        ]
    },


    {
        name: "Faisalabad",
        size: "230 MB",
        price: 800,

        areas: [
            "Faisalabad City",
            "Jaranwala",
            "Samundri",
            "Chak Jhumra"
        ],

        places: [
            "Clock Tower",
            "Jinnah Garden",
            "Gumti Fountain"
        ]
    },


    {
        name: "Multan",
        size: "220 MB",
        price: 700,

        areas: [
            "Multan City",
            "Shujabad",
            "Jalalpur Pirwala",
            "Makhdoom Rashid"
        ],

        places: [
            "Multan Fort",
            "Ghanta Ghar",
            "Shrine of Bahauddin Zakariya"
        ]
    },


    {
        name: "Peshawar",
        size: "250 MB",
        price: 900,

        areas: [
            "Peshawar City",
            "Chamkani",
            "Badaber",
            "Hassan Khel"
        ],

        places: [
            "Bala Hissar Fort",
            "Qissa Khwani Bazaar",
            "Mahabat Khan Mosque"
        ]
    },


    {
        name: "Quetta",
        size: "260 MB",
        price: 900,

        areas: [
            "Quetta City",
            "Kuchlak",
            "Hanna",
            "Sariab"
        ],

        places: [
            "Hanna Lake",
            "Quetta Bazaar",
            "Quetta Railway Station"
        ]
    },


    {
        name: "Gujranwala",
        size: "210 MB",
        price: 700,

        areas: [
            "Gujranwala City",
            "Wazirabad",
            "Kamoke",
            "Nowshera Virkan"
        ],

        places: [
            "Gujranwala Clock Tower",
            "Gujranwala Food Street",
            "Gujranwala Railway Station"
        ]
    },


    {
        name: "Sialkot",
        size: "210 MB",
        price: 700,

        areas: [
            "Sialkot City",
            "Daska",
            "Pasrur",
            "Sambrial"
        ],

        places: [
            "Sialkot Fort",
            "Iqbal Manzil",
            "Sialkot Clock Tower"
        ]
    },


    // ======================================
    // KAMALIA
    // ======================================

    {
        name: "Kamalia",
        size: "180 MB",
        price: 600,

        areas: [

            "Kamalia City",

            "Bahlol Wala",

            "Jandi Wala",

            "Fazil Dewan",

            "Dargahi Shah",

            "Adhi Wal",

            "Baghai Wala",

            "Noor Shah Road",

            "Chichawatni Road",

            "Ravi Side"
        ],

        places: [

            "Old Kamalia City",

            "Jahangiri Period Old Mosque",

            "Shrine of Hazrat Baba Fazil Dewan",

            "Dargahi Shah",

            "Dholar Sharif",

            "Qadir Bakhsh Sharif",

            "Jinnah Park",

            "Zeeshan Colony Park",

            "Kamalia Railway Station",

            "Kamalia General Bus Stand",

            "Main Kalma Chowk",

            "Jhakkar Mor Chowk",

            "Eid Gah Chowk",

            "Ravi Side"
        ]
    }

];


// ==========================================
// SAVE PLAYER
// ==========================================

function savePlayer() {

    localStorage.setItem(
        "pakistanBusPlayer",
        JSON.stringify(player)
    );

}


// ==========================================
// UPDATE MENU
// ==========================================

function updateMenu() {

    document.getElementById("menuMoney")
        .innerText = player.money;

    document.getElementById("menuXP")
        .innerText = player.xp;

    document.getElementById("menuLevel")
        .innerText = player.level;

}


// ==========================================
// OPEN MODE
// ==========================================

function openMode(mode) {

    currentMode = mode;

    document.getElementById("menu")
        .classList.add("hidden");

    document.getElementById("modeScreen")
        .classList.remove("hidden");


    let title =
        document.getElementById("modeTitle");

    let description =
        document.getElementById("modeDescription");


    if (mode === "free") {

        title.innerText =
            "🚍 FREE MODE";

        description.innerText =
            "Select a downloaded city, area and famous place.";

        showCities();
    }


    if (mode === "career") {

        title.innerText =
            "🏆 CAREER MODE";

        description.innerText =
            "Complete routes, collect passengers and earn money.";

        showCareer();
    }


    if (mode === "tour") {

        title.innerText =
            "🗺️ TOUR MODE";

        description.innerText =
            "Travel from one Pakistani city to another.";

        showTour();
    }

}


// ==========================================
// SHOW CITIES
// ==========================================

function showCities() {

    let content =
        document.getElementById("modeContent");

    content.innerHTML =
        `<div class="city-grid"></div>`;

    let grid =
        content.querySelector(".city-grid");


    cities.forEach(city => {

        let downloaded =
            player.downloadedMaps
                .includes(city.name);


        let card =
            document.createElement("div");

        card.className =
            "city-card";


        card.innerHTML = `

            <h3>🇵🇰 ${city.name}</h3>

            <p>
                Map: ${city.size}
            </p>

            <p>
                ${
                    downloaded
                    ? "✅ Downloaded"
                    : "🔒 Map Locked"
                }
            </p>

            <button
                ${downloaded ? "" : "disabled"}
                onclick="openCity('${city.name}')">

                ${
                    downloaded
                    ? "EXPLORE CITY"
                    : "DOWNLOAD FIRST"
                }

            </button>

        `;


        grid.appendChild(card);

    });

}


// ==========================================
// OPEN CITY
// ==========================================

function openCity(cityName) {

    currentCity =
        cityName;


    let city =
        cities.find(
            c => c.name === cityName
        );


    if (!city) return;


    let content =
        document.getElementById("modeContent");


    content.innerHTML = `

        <div class="city-grid">

            <div class="city-card">

                <h2>
                    🏙️ ${city.name}
                </h2>

                <p>
                    Select your destination area.
                </p>

                <select
                    id="areaSelect"
                    style="
                    padding:12px;
                    width:100%;
                    margin:10px 0;
                    background:#111;
                    color:white;
                    border:1px solid #00ff88;
                    border-radius:8px;
                    ">

                    ${city.areas.map(area => `
                        <option value="${area}">
                            ${area}
                        </option>
                    `).join("")}

                </select>

                <select
                    id="placeSelect"
                    style="
                    padding:12px;
                    width:100%;
                    margin:10px 0;
                    background:#111;
                    color:white;
                    border:1px solid #00ff88;
                    border-radius:8px;
                    ">

                    ${city.places.map(place => `
                        <option value="${place}">
                            ${place}
                        </option>
                    `).join("")}

                </select>


                <button
                    onclick="startSelectedRoute()">

                    🚌 START ROUTE

                </button>

            </div>

        </div>

    `;

}


// ==========================================
// START SELECTED ROUTE
// ==========================================

function startSelectedRoute() {

    currentArea =
        document.getElementById(
            "areaSelect"
        ).value;


    currentPlace =
        document.getElementById(
            "placeSelect"
        ).value;


    currentMode =
        "free";


    startGame(
        currentCity
    );

}


// ==========================================
// CAREER MODE
// ==========================================

function showCareer() {

    let content =
        document.getElementById(
            "modeContent"
        );


    content.innerHTML = `

        <div class="career-card">

            <h2>
                🚌 Route 1
            </h2>

            <p>
                Pick up passengers and
                complete a city route.
            </p>

            <p>
                Reward: 💰 500
            </p>

            <p>
                XP: ⭐ 100
            </p>

            <button
                onclick="startCareer()">

                START MISSION

            </button>

        </div>


        <br>


        <div class="career-card">

            <h2>
                🇵🇰 Kamalia Driver
            </h2>

            <p>
                Drive from Kamalia city
                toward the Ravi side.
            </p>

            <p>
                Reward: 💰 1000
            </p>

            <p>
                XP: ⭐ 200
            </p>

            <button
                onclick="startKamaliaCareer()">

                START MISSION

            </button>

        </div>

    `;

}


// ==========================================
// CAREER START
// ==========================================

function startCareer() {

    currentMode =
        "career";

    currentArea =
        "Lahore City";

    currentPlace =
        "Bus Terminal";

    startGame("Lahore");

}


function startKamaliaCareer() {

    currentMode =
        "career";

    currentArea =
        "Kamalia City";

    currentPlace =
        "Jinnah Park";

    startGame("Kamalia");

}


// ==========================================
// TOUR MODE
// ==========================================

function showTour() {

    let content =
        document.getElementById(
            "modeContent"
        );


    if (
        player.downloadedMaps.length < 2
    ) {

        content.innerHTML = `

            <div class="career-card">

                <h2>
                    🗺️ Tour Locked
                </h2>

                <p>
                    Download at least
                    two city maps first.
                </p>

                <button
                    onclick="openMapDownload()">

                    📥 DOWNLOAD MAPS

                </button>

            </div>

        `;

        return;
    }


    content.innerHTML = `

        <div class="career-card">

            <h2>
                🇵🇰 Pakistan Grand Tour
            </h2>

            <p>
                Travel between your
                downloaded cities.
            </p>

            <p>
                Available cities:
                ${player.downloadedMaps.join(
                    " → "
                )}
            </p>

            <button
                onclick="startTour()">

                START TOUR

            </button>

        </div>

    `;

}


// ==========================================
// START TOUR
// ==========================================

function startTour() {

    currentMode =
        "tour";


    currentCity =
        player.downloadedMaps[0];


    currentArea =
        "Main Highway";


    currentPlace =
        "Next City";


    startGame(
        currentCity
    );

}


// ==========================================
// MAP DOWNLOAD SCREEN
// ==========================================

function openMapDownload() {

    document.getElementById("menu")
        .classList.add("hidden");

    document.getElementById("modeScreen")
        .classList.add("hidden");

    document.getElementById("mapScreen")
        .classList.remove("hidden");


    renderMaps();

}


// ==========================================
// RENDER MAPS
// ==========================================

function renderMaps() {

    let list =
        document.getElementById(
            "mapList"
        );


    list.innerHTML = "";


    cities.forEach(city => {

        let downloaded =
            player.downloadedMaps
                .includes(city.name);


        let card =
            document.createElement("div");

        card.className =
            "map-card";


        card.innerHTML = `

            <h3>
                🇵🇰 ${city.name}
            </h3>

            <p>
                Map Pack: ${city.size}
            </p>

            <p>
                ${
                    downloaded
                    ? "✅ Downloaded"
                    : "💰 Price: " +
                      city.price
                }
            </p>

            <button
                ${downloaded ? "disabled" : ""}
                onclick="downloadMap(
                    '${city.name}'
                )">

                ${
                    downloaded
                    ? "DOWNLOADED"
                    : "DOWNLOAD MAP"
                }

            </button>

        `;


        list.appendChild(card);

    });

}


// ==========================================
// DOWNLOAD MAP
// ==========================================

function downloadMap(cityName) {

    let city =
        cities.find(
            c => c.name === cityName
        );


    if (!city) return;


    if (
        player.money <
        city.price
    ) {

        alert(
            "💰 You need more money."
        );

        return;
    }


    player.money -=
        city.price;


    if (
        !player.downloadedMaps
            .includes(cityName)
    ) {

        player.downloadedMaps
            .push(cityName);

    }


    savePlayer();

    updateMenu();

    renderMaps();


    alert(
        "✅ " +
        cityName +
        " map unlocked!"
    );

}


// ==========================================
// START GAME
// ==========================================

function startGame(cityName) {

    currentCity =
        cityName;


    busPosition =
        50;

    fuel =
        100;

    gameRunning =
        true;


    document.getElementById(
        "modeScreen"
    ).classList.add("hidden");


    document.getElementById(
        "mapScreen"
    ).classList.add("hidden");


    document.getElementById(
        "game"
    ).classList.remove("hidden");


    document.getElementById(
        "gameCity"
    ).innerText =
        cityName;


    document.getElementById(
        "gameMode"
    ).innerText =
        currentMode === "free"
        ? "Free Mode"
        : currentMode === "career"
        ? "Career Mode"
        : "Tour Mode";


    showRouteInfo();

    updateGame();

}


// ==========================================
// SHOW ROUTE INFORMATION
// ==========================================

function showRouteInfo() {

    setTimeout(() => {

        if (!gameRunning)
            return;


        alert(

            "📍 Route\n\n" +

            "City: " +
            currentCity +

            "\nArea: " +
            currentArea +

            "\nDestination: " +
            currentPlace

        );

    }, 300);

}


// ==========================================
// MOVE LEFT
// ==========================================

function moveLeft() {

    if (!gameRunning)
        return;


    busPosition -=
        8;


    if (
        busPosition < 12
    ) {

        busPosition =
            12;

    }


    updateBus();

}


// ==========================================
// MOVE RIGHT
// ==========================================

function moveRight() {

    if (!gameRunning)
        return;


    busPosition +=
        8;


    if (
        busPosition > 88
    ) {

        busPosition =
            88;

    }


    updateBus();

}


// ==========================================
// UPDATE BUS
// ==========================================

function updateBus() {

    document.getElementById(
        "bus"
    ).style.left =
        busPosition + "%";

}


// ==========================================
// BRAKE / EARN
// ==========================================

function brakeBus() {

    if (!gameRunning)
        return;


    player.money +=
        10;


    player.xp +=
        5;


    checkLevel();

    savePlayer();

    updateGame();

}


// ==========================================
// FUEL
// ==========================================

setInterval(
    function() {

        if (!gameRunning)
            return;


        fuel -=
            1;


        if (
            fuel <= 0
        ) {

            fuel =
                0;

            gameRunning =
                false;


            alert(
                "⛽ Fuel finished!"
            );

        }


        updateGame();

    },
    3000
);


// ==========================================
// LEVEL SYSTEM
// ==========================================

function checkLevel() {

    let requiredXP =
        player.level *
        100;


    if (
        player.xp >=
        requiredXP
    ) {

        player.xp -=
            requiredXP;

        player.level++;


        alert(

            "🎉 LEVEL UP!\n\n" +

            "Level: " +
            player.level

        );

    }

}


// ==========================================
// UPDATE GAME UI
// ==========================================

function updateGame() {

    document.getElementById(
        "gameMoney"
    ).innerText =
        player.money;


    document.getElementById(
        "gameXP"
    ).innerText =
        player.xp;


    document.getElementById(
        "fuel"
    ).innerText =
        fuel;


    updateMenu();

}


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (!gameRunning)
            return;


        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveLeft();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveRight();

        }


        if (
            event.code ===
            "Space"
        ) {

            brakeBus();

        }

    }
);


// ==========================================
// EXIT GAME
// ==========================================

function exitGame() {

    gameRunning =
        false;


    document.getElementById(
        "game"
    ).classList.add("hidden");


    document.getElementById(
        "menu"
    ).classList.remove("hidden");


    updateMenu();

}


// ==========================================
// BACK TO MENU
// ==========================================

function backToMenu() {

    document.getElementById(
        "modeScreen"
    ).classList.add("hidden");


    document.getElementById(
        "mapScreen"
    ).classList.add("hidden");


    document.getElementById(
        "menu"
    ).classList.remove("hidden");


    updateMenu();

}


// ==========================================
// INITIALIZE
// ==========================================

updateMenu();
