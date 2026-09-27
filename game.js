/* =========================================================
   PAKISTAN BUS GAME
   Cities → Areas → Villages/Chaks → Famous Places
========================================================= */

let player = JSON.parse(localStorage.getItem("pakBusPlayer")) || {
    money: 5000,
    xp: 0,
    level: 1,
    fuel: 100,
    downloadedMaps: ["Lahore"]
};

let currentMode = "";
let currentCity = "";
let currentArea = "";
let currentDestination = "";


/* =========================================================
   CITY DATA
========================================================= */

const cities = [

    {
        name: "Lahore",
        emoji: "🏙️",
        price: 1000,
        mapSize: "250 MB",

        areas: [
            "Lahore City",
            "DHA",
            "Gulberg",
            "Model Town",
            "Johar Town",
            "Shahdara"
        ],

        villages: [
            "Barki",
            "Bedian",
            "Raiwind",
            "Kahna",
            "Kot Abdul Malik"
        ],

        places: [
            "Minar-e-Pakistan",
            "Badshahi Mosque",
            "Lahore Fort",
            "Liberty Market",
            "Lahore Railway Station"
        ]
    },

    {
        name: "Karachi",
        emoji: "🌊",
        price: 1500,
        mapSize: "300 MB",

        areas: [
            "Karachi City",
            "Clifton",
            "Gulshan",
            "North Nazimabad",
            "Korangi",
            "Saddar"
        ],

        villages: [
            "Gadap",
            "Malir",
            "Goth Khando",
            "Memon Goth",
            "Darsano Channa"
        ],

        places: [
            "Mazar-e-Quaid",
            "Clifton Beach",
            "Sea View",
            "Saddar",
            "Port Grand"
        ]
    },

    {
        name: "Islamabad",
        emoji: "🏛️",
        price: 1200,
        mapSize: "220 MB",

        areas: [
            "Islamabad City",
            "F-6",
            "F-7",
            "F-8",
            "G-9",
            "I-8"
        ],

        villages: [
            "Saidpur",
            "Bara Kahu",
            "Nilore",
            "Tarlai",
            "Sihala"
        ],

        places: [
            "Faisal Mosque",
            "Pakistan Monument",
            "Daman-e-Koh",
            "Rawal Lake",
            "Margalla Hills"
        ]
    },

    {
        name: "Rawalpindi",
        emoji: "🏙️",
        price: 1100,
        mapSize: "210 MB",

        areas: [
            "Rawalpindi City",
            "Saddar",
            "Murree Road",
            "Satellite Town",
            "Chaklala",
            "Peshawar Road"
        ],

        villages: [
            "Adiala",
            "Chakri",
            "Kahuta",
            "Koral",
            "Mandra"
        ],

        places: [
            "Raja Bazaar",
            "Ayub Park",
            "Saddar",
            "Rawalpindi Railway Station",
            "Liaquat Bagh"
        ]
    },

    {
        name: "Faisalabad",
        emoji: "🏭",
        price: 1100,
        mapSize: "230 MB",

        areas: [
            "Faisalabad City",
            "D Ground",
            "Peoples Colony",
            "Samanabad",
            "Jaranwala Road",
            "Sargodha Road"
        ],

        villages: [
            "Chak Jhumra",
            "Jaranwala",
            "Samundri",
            "Tandlianwala",
            "Khurrarianwala"
        ],

        places: [
            "Clock Tower",
            "Jinnah Garden",
            "D Ground",
            "Lyallpur Museum",
            "Gumti"
        ]
    },

    {
        name: "Multan",
        emoji: "🕌",
        price: 1000,
        mapSize: "220 MB",

        areas: [
            "Multan City",
            "Cantt",
            "Bosan Road",
            "Gulgasht",
            "Mumtazabad",
            "Shah Rukn-e-Alam"
        ],

        villages: [
            "Shujabad",
            "Jalalpur Pirwala",
            "Qadirpur Ran",
            "Muzaffarabad",
            "Sher Shah"
        ],

        places: [
            "Ghanta Ghar",
            "Shrine of Shah Rukn-e-Alam",
            "Multan Fort",
            "Hussain Agahi",
            "Bahauddin Zakariya Shrine"
        ]
    },

    {
        name: "Peshawar",
        emoji: "🏔️",
        price: 1300,
        mapSize: "250 MB",

        areas: [
            "Peshawar City",
            "University Town",
            "Hayatabad",
            "Saddar",
            "Board Bazaar",
            "Ring Road"
        ],

        villages: [
            "Chamkani",
            "Badaber",
            "Mathra",
            "Regi",
            "Nasir Bagh"
        ],

        places: [
            "Qissa Khwani Bazaar",
            "Bala Hisar Fort",
            "Peshawar Museum",
            "Saddar Bazaar",
            "Mahabat Khan Mosque"
        ]
    },

    {
        name: "Quetta",
        emoji: "⛰️",
        price: 1400,
        mapSize: "260 MB",

        areas: [
            "Quetta City",
            "Jinnah Road",
            "Satellite Town",
            "Sariab Road",
            "Brewery Road",
            "Airport Road"
        ],

        villages: [
            "Kuchlak",
            "Hanna",
            "Nawakilli",
            "Mian Ghundi",
            "Spearzen"
        ],

        places: [
            "Hanna Lake",
            "Quetta Cantonment",
            "Quetta Railway Station",
            "Askari Park",
            "Ziarat Road"
        ]
    },

    {
        name: "Gujranwala",
        emoji: "🏙️",
        price: 1000,
        mapSize: "210 MB",

        areas: [
            "Gujranwala City",
            "Model Town",
            "Satellite Town",
            "GT Road",
            "Civil Lines",
            "Wapda Town"
        ],

        villages: [
            "Aroop",
            "Nowshera Virkan",
            "Qila Didar Singh",
            "Kamoke",
            "Ali Pur Chatha"
        ],

        places: [
            "Gujranwala Clock Tower",
            "Jinnah Stadium",
            "Gujranwala Railway Station",
            "GT Road",
            "Model Town"
        ]
    },

    {
        name: "Sialkot",
        emoji: "🏏",
        price: 1000,
        mapSize: "210 MB",

        areas: [
            "Sialkot City",
            "Cantt",
            "Paris Road",
            "Daska Road",
            "Ugoki Road",
            "Rangpura"
        ],

        villages: [
            "Daska",
            "Sambrial",
            "Pasrur",
            "Ugoki",
            "Marala"
        ],

        places: [
            "Iqbal Manzil",
            "Sialkot Clock Tower",
            "Sialkot Fort",
            "Iqbal Stadium",
            "Sialkot Railway Station"
        ]
    },


    /* =====================================================
       KAMALIA
    ===================================================== */

    {
        name: "Kamalia",
        emoji: "🌾",
        price: 600,
        mapSize: "180 MB",

        areas: [
            "Kamalia City",
            "Bahlol Wala",
            "Jandi Wala",
            "Fazil Dewan",
            "Dargahi Shah",
            "Aadhi Wal",
            "Baghai Wala",
            "Noor Shah",
            "Khursheed Abad",
            "Islam Pura",
            "Madina Abad",
            "Ravi Side"
        ],

        villages: [

            "Chak No. 712 GB",
            "Chak No. 711 GB",
            "Chak No. 710 GB",
            "Chak No. 709 GB",
            "Chak No. 708 GB",
            "Chak No. 707 GB",
            "Chak No. 706 GB",
            "Chak No. 705 GB",

            "Chak No. 713 GB",
            "Chak No. 714 GB",
            "Chak No. 715 GB",
            "Chak No. 716 GB",
            "Chak No. 717 GB",
            "Chak No. 718 GB",

            "Chak No. 724 GB",
            "Chak No. 725 GB",
            "Chak No. 728 GB",
            "Chak No. 731 GB",
            "Chak No. 734 GB",
            "Chak No. 737 GB",
            "Chak No. 739 GB",
            "Chak No. 740 GB",
            "Chak No. 741 GB",
            "Chak No. 742 GB",
            "Chak No. 746 GB",

            "Tibbi Saydan",
            "Bahlol Wala",
            "Jandi Wala",
            "Fazil Dewan",
            "Dargahi Shah",
            "Baghai Wala",
            "Ravi Khokhar",
            "Mouza Waghi",
            "Mouza Mumber",
            "Mouza Jaloka",
            "Marthan Wala",
            "Qadir Bux",
            "Sheikh Burhan"
        ],

        places: [

            "Old Kamalia City",
            "Jahangiri Period Old Mosque",

            "Shrine of Hazrat Baba Fazil Dewan",
            "Dargahi Shah",
            "Dholar Sharif",
            "Qadir Bakhsh Sharif",

            "Jinnah Park",
            "Fazal Dewan Jinnah Park",
            "Zeeshan Colony Park",

            "Kamalia Railway Station",
            "Kamalia General Bus Stand",

            "Main Kalma Chowk",
            "Jhakkar Mor Chowk",
            "Eid Gah Chowk",
            "Sarfaraz Mor Chowk",

            "Ravi Side",
            "Toba Chichawatni Road",
            "Jhakar Kamalia Road"
        ]
    }
];


/* =========================================================
   SAVE PLAYER
========================================================= */

function savePlayer() {
    localStorage.setItem(
        "pakBusPlayer",
        JSON.stringify(player)
    );
}


/* =========================================================
   UPDATE MENU
========================================================= */

function updatePlayerUI() {

    const money = document.getElementById("menuMoney");
    const level = document.getElementById("menuLevel");
    const xp = document.getElementById("menuXP");

    if (money) money.innerText = player.money;
    if (level) level.innerText = player.level;
    if (xp) xp.innerText = player.xp;
}


/* =========================================================
   HIDE ALL SCREENS
========================================================= */

function hideScreens() {

    const screens = [
        "menu",
        "modeScreen",
        "mapScreen",
        "game"
    ];

    screens.forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.style.display = "none";
        }

    });
}


/* =========================================================
   OPEN MODE
========================================================= */

function openMode(mode) {

    currentMode = mode;

    hideScreens();

    const screen = document.getElementById("modeScreen");

    if (!screen) return;

    screen.style.display = "block";

    const title = document.getElementById("modeTitle");
    const description = document.getElementById("modeDescription");
    const content = document.getElementById("modeContent");

    if (!content) return;

    content.innerHTML = "";

    if (mode === "free") {

        if (title) title.innerText = "🛣️ FREE MODE";

        if (description) {
            description.innerText =
                "City select karo aur apni marzi se drive karo.";
        }

        showCities(content);
    }


    else if (mode === "career") {

        if (title) title.innerText = "🏆 CAREER MODE";

        if (description) {
            description.innerText =
                "Missions complete karo aur money + XP earn karo.";
        }

        showCareer(content);
    }


    else if (mode === "tour") {

        if (title) title.innerText = "🌍 TOUR MODE";

        if (description) {
            description.innerText =
                "Downloaded cities ke darmiyan tour karo.";
        }

        showTour(content);
    }

}


/* =========================================================
   SHOW CITIES
========================================================= */

function showCities(container) {

    container.innerHTML = `
        <h2>🇵🇰 Pakistan Cities</h2>

        <p style="margin-bottom:20px;">
            City select karein:
        </p>

        <div class="city-grid">

            ${cities.map((city, index) => {

                const downloaded =
                    player.downloadedMaps.includes(city.name);

                return `

                    <div
                        class="city-card"
                        onclick="selectCity(${index})"
                    >

                        <div style="font-size:40px;">
                            ${city.emoji}
                        </div>

                        <h3>
                            ${city.name}
                        </h3>

                        <p>
                            ${city.mapSize}
                        </p>

                        <small>
                            ${
                                downloaded
                                ? "✅ Downloaded"
                                : "🔒 Locked"
                            }
                        </small>

                    </div>

                `;

            }).join("")}

        </div>
    `;
}


/* =========================================================
   SELECT CITY
========================================================= */

function selectCity(index) {

    const city = cities[index];

    if (!city) return;

    currentCity = city.name;

    const content =
        document.getElementById("modeContent");

    if (!content) return;

    content.innerHTML = `

        <button
            class="back"
            onclick="showCities(document.getElementById('modeContent'))"
        >
            ⬅ Back to Cities
        </button>

        <h2>
            ${city.emoji} ${city.name}
        </h2>

        <div class="city-selection">

            <button
                onclick="showAreas(${index})"
            >
                🏙️ AREAS
            </button>

            <button
                onclick="showVillages(${index})"
            >
                🌾 VILLAGES / CHAKS
            </button>

            <button
                onclick="showPlaces(${index})"
            >
                📍 FAMOUS PLACES
            </button>

        </div>

    `;
}


/* =========================================================
   SHOW AREAS
========================================================= */

function showAreas(index) {

    const city = cities[index];

    const content =
        document.getElementById("modeContent");

    content.innerHTML = `

        <button
            class="back"
            onclick="selectCity(${index})"
        >
            ⬅ Back
        </button>

        <h2>
            🏙️ ${city.name} Areas
        </h2>

        <div class="city-grid">

            ${city.areas.map((area, i) => `

                <div
                    class="city-card"
                    onclick="startRoute('${city.name}', '${area}')"
                >

                    <h3>
                        ${i + 1}. ${area}
                    </h3>

                    <p>
                        🚍 Start Route
                    </p>

                </div>

            `).join("")}

        </div>
    `;
}


/* =========================================================
   SHOW VILLAGES
========================================================= */

function showVillages(index) {

    const city = cities[index];

    const content =
        document.getElementById("modeContent");

    content.innerHTML = `

        <button
            class="back"
            onclick="selectCity(${index})"
        >
            ⬅ Back
        </button>

        <h2>
            🌾 ${city.name} Villages / Chaks
        </h2>

        <p>
            Rural areas aur villages:
        </p>

        <div class="city-grid">

            ${city.villages.map((village, i) => `

                <div
                    class="city-card"
                    onclick="startRoute('${city.name}', '${village}')"
                >

                    <h3>
                        ${i + 1}. ${village}
                    </h3>

                    <p>
                        🚌 Drive Here
                    </p>

                </div>

            `).join("")}

        </div>
    `;
}


/* =========================================================
   SHOW FAMOUS PLACES
========================================================= */

function showPlaces(index) {

    const city = cities[index];

    const content =
        document.getElementById("modeContent");

    content.innerHTML = `

        <button
            class="back"
            onclick="selectCity(${index})"
        >
            ⬅ Back
        </button>

        <h2>
            📍 ${city.name} Famous Places
        </h2>

        <div class="city-grid">

            ${city.places.map((place, i) => `

                <div
                    class="city-card"
                    onclick="startRoute('${city.name}', '${place}')"
                >

                    <h3>
                        ${i + 1}. ${place}
                    </h3>

                    <p>
                        🚍 Visit
                    </p>

                </div>

            `).join("")}

        </div>
    `;
}


/* =========================================================
   CAREER MODE
========================================================= */

function showCareer(container) {

    container.innerHTML = `

        <div class="career-card">

            <h2>
                🚌 Career Mission
            </h2>

            <h3>
                Kamalia Local Route
            </h3>

            <p>
                Kamalia City se village route complete karo.
            </p>

            <p>
                💰 Reward: Rs. 1,000
            </p>

            <p>
                ⭐ XP: 250
            </p>

            <button
                onclick="startRoute('Kamalia', 'Chak No. 712 GB')"
            >
                🚍 START MISSION
            </button>

        </div>

        <div class="career-card">

            <h3>
                🛣️ Lahore → Kamalia
            </h3>

            <p>
                Long distance route
            </p>

            <p>
                💰 Reward: Rs. 2,000
            </p>

            <button
                onclick="startRoute('Kamalia', 'Kamalia City')"
            >
                🚍 START ROUTE
            </button>

        </div>

    `;
}


/* =========================================================
   TOUR MODE
========================================================= */

function showTour(container) {

    const downloaded =
        cities.filter(city =>
            player.downloadedMaps.includes(city.name)
        );

    if (downloaded.length < 2) {

        container.innerHTML = `

            <h2>
                🌍 TOUR MODE
            </h2>

            <p>
                Tour Mode ke liye kam az kam
                2 cities download karo.
            </p>

            <button
                onclick="openMapDownload()"
            >
                🗺️ DOWNLOAD MAPS
            </button>

        `;

        return;
    }


    container.innerHTML = `

        <h2>
            🌍 Available Tour Cities
        </h2>

        <div class="city-grid">

            ${downloaded.map((city, index) => `

                <div
                    class="city-card"
                    onclick="startRoute('${city.name}', 'Tour Route')"
                >

                    <div style="font-size:40px;">
                        ${city.emoji}
                    </div>

                    <h3>
                        ${city.name}
                    </h3>

                    <p>
                        🚍 Start Tour
                    </p>

                </div>

            `).join("")}

        </div>
    `;
}


/* =========================================================
   MAP DOWNLOAD
========================================================= */

function openMapDownload() {

    hideScreens();

    const screen =
        document.getElementById("mapScreen");

    if (!screen) return;

    screen.style.display = "block";

    const list =
        document.getElementById("mapList");

    if (!list) return;

    list.innerHTML = `

        <h2>
            🗺️ Pakistan Map Download
        </h2>

        <p>
            Virtual money se maps unlock karein.
        </p>

        ${cities.map((city, index) => {

            const downloaded =
                player.downloadedMaps.includes(city.name);

            return `

                <div class="map-card">

                    <h3>
                        ${city.emoji}
                        ${city.name}
                    </h3>

                    <p>
                        📦 Size: ${city.mapSize}
                    </p>

                    <p>
                        💰 Price: Rs. ${city.price}
                    </p>

                    ${
                        downloaded

                        ? `
                            <button disabled>
                                ✅ DOWNLOADED
                            </button>
                        `

                        : `
                            <button
                                onclick="downloadMap(${index})"
                            >
                                ⬇️ DOWNLOAD
                            </button>
                        `
                    }

                </div>

            `;

        }).join("")}

    `;
}


/* =========================================================
   DOWNLOAD MAP
========================================================= */

function downloadMap(index) {

    const city = cities[index];

    if (!city) return;

    if (player.downloadedMaps.includes(city.name)) {

        alert("Map already downloaded!");

        return;
    }


    if (player.money < city.price) {

        alert(
            "❌ Paise kam hain!\n\n" +
            "Required: Rs. " + city.price
        );

        return;
    }


    player.money -= city.price;

    player.downloadedMaps.push(city.name);

    savePlayer();

    updatePlayerUI();

    alert(
        "✅ " +
        city.name +
        " map unlocked!"
    );

    openMapDownload();
}


/* =========================================================
   START ROUTE
========================================================= */

function startRoute(city, destination) {

    currentCity = city;
    currentDestination = destination;

    hideScreens();

    const game =
        document.getElementById("game");

    if (!game) return;

    game.style.display = "block";


    const gameCity =
        document.getElementById("gameCity");

    const gameMode =
        document.getElementById("gameMode");

    const gameMoney =
        document.getElementById("gameMoney");

    const gameXP =
        document.getElementById("gameXP");

    const fuel =
        document.getElementById("fuel");


    if (gameCity) {

        gameCity.innerText =
            city + " → " + destination;

    }


    if (gameMode) {

        gameMode.innerText =
            currentMode.toUpperCase();

    }


    if (gameMoney) {

        gameMoney.innerText =
            player.money;

    }


    if (gameXP) {

        gameXP.innerText =
            player.xp;

    }


    if (fuel) {

        fuel.innerText =
            player.fuel + "%";

    }


    const bus =
        document.getElementById("bus");

    if (bus) {

        bus.style.left = "50%";

    }

}


/* =========================================================
   GAME CONTROLS
========================================================= */

document.addEventListener("keydown", function(event) {

    const bus =
        document.getElementById("bus");

    if (!bus) return;


    if (
        document.getElementById("game") &&
        document.getElementById("game").style.display !== "none"
    ) {

        let left =
            parseFloat(bus.style.left) || 50;


        if (event.key === "ArrowLeft") {

            left -= 3;

        }


        if (event.key === "ArrowRight") {

            left += 3;

        }


        if (event.key === " ") {

            event.preventDefault();

            useBrake();

        }


        left =
            Math.max(5, Math.min(95, left));

        bus.style.left =
            left + "%";

    }

});


/* =========================================================
   BRAKE
========================================================= */

function useBrake() {

    const bus =
        document.getElementById("bus");

    if (!bus) return;

    bus.style.transform =
        "translateX(-50%) scale(0.95)";

    setTimeout(() => {

        bus.style.transform =
            "translateX(-50%) scale(1)";

    }, 150);

}


/* =========================================================
   COMPLETE ROUTE
========================================================= */

function completeRoute() {

    const reward = 500;
    const gainedXP = 100;

    player.money += reward;
    player.xp += gainedXP;

    player.fuel =
        Math.max(0, player.fuel - 10);


    if (player.xp >= player.level * 500) {

        player.level++;

        alert(
            "🎉 LEVEL UP!\n\n" +
            "New Level: " +
            player.level
        );

    }


    savePlayer();

    updatePlayerUI();

    alert(
        "🏁 Route Complete!\n\n" +
        "💰 +Rs. " + reward +
        "\n⭐ +" + gainedXP + " XP"
    );

}


/* =========================================================
   BACK TO MENU
========================================================= */

function backToMenu() {

    hideScreens();

    const menu =
        document.getElementById("menu");

    if (menu) {

        menu.style.display = "block";

    }

    updatePlayerUI();
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updatePlayerUI();

        hideScreens();

        const menu =
            document.getElementById("menu");

        if (menu) {

            menu.style.display = "block";

        }

    }
);
