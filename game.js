/* =====================================================
   PAKISTAN BUS GAME
   3D BUS SIMULATOR PROTOTYPE
===================================================== */


/* =========================
   GAME DATA
========================= */

const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Gujranwala",
    "Sialkot",
    "Kamalia"
];


const kamaliaVillages = [
    "Kamalia City",
    "Chak No. 712 GB",
    "Chak No. 711 GB",
    "Chak No. 718 GB",
    "Chak No. 728 GB",
    "Chak No. 740 GB",
    "Chak No. 741 GB",
    "Chak No. 742 GB",
    "Bahlol Wala",
    "Jandi Wala",
    "Fazil Dewan",
    "Dargahi Shah"
];


/* =========================
   THREE.JS VARIABLES
========================= */

let scene;
let camera;
let renderer;

let bus;

let road;

let speed = 0;

let busX = 0;

let acceleration = 0;

let steering = 0;

let gameRunning = false;

let city = "Kamalia";

let destination = "Kamalia City";

let money = 5000;

let fuel = 100;


/* =========================
   START GAME
========================= */

function startGame() {

    document.getElementById("mainMenu")
        .classList.add("hidden");

    document.getElementById("cityMenu")
        .classList.add("hidden");

    document.getElementById("gameUI")
        .classList.remove("hidden");


    city = "Kamalia";

    destination = "Kamalia City";

    document.getElementById("currentCity")
        .innerText = city;

    document.getElementById("destination")
        .innerText = destination;


    init3D();

    gameRunning = true;

    animate();
}


/* =========================
   3D INITIALIZATION
========================= */

function init3D() {

    const container =
        document.getElementById("threeContainer");


    container.innerHTML = "";


    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(0x87b7d9);


    /* CAMERA */

    camera =
        new THREE.PerspectiveCamera(
            65,
            window.innerWidth /
            window.innerHeight,
            0.1,
            1000
        );


    camera.position.set(
        0,
        5,
        11
    );


    /* RENDERER */

    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.shadowMap.enabled = true;


    container.appendChild(
        renderer.domElement
    );


    /* LIGHT */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.5
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    sun.position.set(
        30,
        50,
        20
    );

    sun.castShadow = true;

    scene.add(sun);


    createWorld();

    createBus();

    createTrees();

    createBuildings();

    createTraffic();


    window.addEventListener(
        "resize",
        resizeGame
    );
}


/* =========================
   WORLD
========================= */

function createWorld() {

    /* GRASS */

    const grassGeometry =
        new THREE.PlaneGeometry(
            500,
            500
        );

    const grassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x3c713b
        });


    const grass =
        new THREE.Mesh(
            grassGeometry,
            grassMaterial
        );


    grass.rotation.x =
        -Math.PI / 2;


    grass.position.y =
        -0.1;


    grass.receiveShadow = true;

    scene.add(grass);


    /* ROAD */

    const roadGeometry =
        new THREE.PlaneGeometry(
            14,
            500
        );


    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x292929
        });


    road =
        new THREE.Mesh(
            roadGeometry,
            roadMaterial
        );


    road.rotation.x =
        -Math.PI / 2;


    road.position.y =
        0;


    road.receiveShadow = true;

    scene.add(road);


    /* ROAD LINES */

    for (
        let z = -240;
        z < 250;
        z += 12
    ) {

        const lineGeometry =
            new THREE.BoxGeometry(
                0.3,
                0.03,
                6
            );


        const lineMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xffffff
            });


        const line =
            new THREE.Mesh(
                lineGeometry,
                lineMaterial
            );


        line.position.set(
            0,
            0.03,
            z
        );


        scene.add(line);
    }


    /* SIDE LINES */

    [-6.5, 6.5].forEach(x => {

        const lineGeometry =
            new THREE.BoxGeometry(
                0.15,
                0.05,
                500
            );


        const lineMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xffd83d
            });


        const line =
            new THREE.Mesh(
                lineGeometry,
                lineMaterial
            );


        line.position.set(
            x,
            0.05,
            0
        );


        scene.add(line);
    });
}


/* =========================
   BUS
========================= */

function createBus() {

    bus =
        new THREE.Group();


    /* BODY */

    const bodyGeometry =
        new THREE.BoxGeometry(
            3,
            2.5,
            6
        );


    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x1c8c62
        });


    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );


    body.position.y =
        1.7;


    body.castShadow = true;

    bus.add(body);


    /* UPPER BODY */

    const upperGeometry =
        new THREE.BoxGeometry(
            2.8,
            1.6,
            4.8
        );


    const upperMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xe7e7e7
        });


    const upper =
        new THREE.Mesh(
            upperGeometry,
            upperMaterial
        );


    upper.position.y =
        3.2;


    upper.castShadow = true;

    bus.add(upper);


    /* WINDOWS */

    for (
        let z = -1.8;
        z <= 1.8;
        z += 1.2
    ) {

        const windowGeometry =
            new THREE.BoxGeometry(
                2.86,
                0.8,
                0.75
            );


        const windowMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x173847,
                metalness: 0.2,
                roughness: 0.2
            });


        const window =
            new THREE.Mesh(
                windowGeometry,
                windowMaterial
            );


        window.position.set(
            0,
            3.35,
            z
        );


        bus.add(window);
    }


    /* WHEELS */

    createWheel(-1.65, 1.8);
    createWheel(1.65, 1.8);

    createWheel(-1.65, -1.8);
    createWheel(1.65, -1.8);


    bus.position.set(
        0,
        0,
        8
    );


    scene.add(bus);
}


/* =========================
   WHEEL
========================= */

function createWheel(x, z) {

    const geometry =
        new THREE.CylinderGeometry(
            0.65,
            0.65,
            0.45,
            24
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x111111
        });


    const wheel =
        new THREE.Mesh(
            geometry,
            material
        );


    wheel.rotation.z =
        Math.PI / 2;


    wheel.position.set(
        x,
        0.7,
        z
    );


    wheel.castShadow = true;

    bus.add(wheel);
}


/* =========================
   TREES
========================= */

function createTrees() {

    for (
        let z = -220;
        z < 230;
        z += 18
    ) {

        createTree(-11, z);

        createTree(11, z + 8);
    }
}


function createTree(x, z) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.25,
                0.35,
                2,
                8
            ),

            new THREE.MeshStandardMaterial({
                color: 0x68421f
            })

        );


    trunk.position.y =
        1;


    tree.add(trunk);


    const leaves =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.5,
                12,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0x216b35
            })

        );


    leaves.position.y =
        2.7;


    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );


    scene.add(tree);
}


/* =========================
   BUILDINGS
========================= */

function createBuildings() {

    for (
        let z = -200;
        z < 220;
        z += 35
    ) {

        createBuilding(
            -14,
            z
        );

        createBuilding(
            14,
            z + 15
        );
    }
}


function createBuilding(x, z) {

    const height =
        3 + Math.random() * 5;


    const geometry =
        new THREE.BoxGeometry(
            5,
            height,
            6
        );


    const material =
        new THREE.MeshStandardMaterial({
            color:
                Math.random() > 0.5
                    ? 0xb99c7c
                    : 0x9d9d9d
        });


    const building =
        new THREE.Mesh(
            geometry,
            material
        );


    building.position.set(
        x,
        height / 2,
        z
    );


    building.castShadow = true;

    scene.add(building);
}


/* =========================
   TRAFFIC
========================= */

function createTraffic() {

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const car =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    1.8,
                    1,
                    3.5
                ),

                new THREE.MeshStandardMaterial({
                    color:
                        Math.random() *
                        0xffffff
                })

            );


        car.position.set(

            Math.random() > .5
                ? -3
                : 3,

            .6,

            -30 -
            i * 35

        );


        scene.add(car);
    }
}


/* =========================
   GAME LOOP
========================= */

function animate() {

    if (!gameRunning) return;


    requestAnimationFrame(
        animate
    );


    /* ACCELERATION */

    if (acceleration > 0) {

        speed += 0.08;

    } else {

        speed -= 0.03;
    }


    speed =
        Math.max(
            0,
            Math.min(
                100,
                speed
            )
        );


    /* STEERING */

    busX += steering *
        (speed / 80);


    busX =
        Math.max(
            -4.5,
            Math.min(
                4.5,
                busX
            )
        );


    bus.position.x =
        busX;


    /* FORWARD CAMERA */

    camera.position.x =
        bus.position.x;


    camera.position.y =
        5.5;


    camera.position.z =
        12;


    camera.lookAt(
        bus.position.x,
        2,
        bus.position.z - 20
    );


    /* MOVE WORLD */

    scene.traverse(
        object => {

            if (
                object !== bus &&
                object.userData &&
                object.userData.movable
            ) {

                object.position.z +=
                    speed * 0.003;

            }

        }
    );


    /* FUEL */

    if (speed > 0) {

        fuel -=
            0.001;

        fuel =
            Math.max(
                0,
                fuel
            );
    }


    updateHUD();


    renderer.render(
        scene,
        camera
    );
}


/* =========================
   HUD
========================= */

function updateHUD() {

    document.getElementById(
        "speed"
    ).innerText =
        Math.round(speed);


    document.getElementById(
        "fuel"
    ).innerText =
        Math.round(fuel);


    document.getElementById(
        "money"
    ).innerText =
        money;
}


/* =========================
   GAS
========================= */

function gasDown() {

    acceleration = 1;
}


function gasUp() {

    acceleration = 0;
}


/* =========================
   BRAKE
========================= */

function brake() {

    speed -= 2;

    speed =
        Math.max(
            0,
            speed
        );
}


/* =========================
   STEERING
========================= */

function turnLeft() {

    steering = -1;
}


function turnRight() {

    steering = 1;
}


function stopSteering() {

    steering = 0;
}


/* =========================
   HORN
========================= */

function horn() {

    console.log(
        "📯 HORN!"
    );
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowLeft"
        ) {

            turnLeft();

        }

        if (
            event.key === "ArrowRight"
        ) {

            turnRight();

        }

        if (
            event.key === "ArrowUp"
        ) {

            gasDown();

        }

        if (
            event.key === "ArrowDown"
        ) {

            brake();

        }

        if (
            event.code === "Space"
        ) {

            horn();

        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight"
        ) {

            stopSteering();

        }

        if (
            event.key === "ArrowUp"
        ) {

            gasUp();

        }

    }
);


/* =========================
   MOBILE BUTTONS
========================= */

function setupControls() {

    const left =
        document.getElementById(
            "leftBtn"
        );

    const right =
        document.getElementById(
            "rightBtn"
        );

    const gas =
        document.getElementById(
            "gasBtn"
        );

    const brakeBtn =
        document.getElementById(
            "brakeBtn"
        );

    const hornBtn =
        document.getElementById(
            "hornBtn"
        );


    left.addEventListener(
        "pointerdown",
        turnLeft
    );

    left.addEventListener(
        "pointerup",
        stopSteering
    );

    left.addEventListener(
        "pointerleave",
        stopSteering
    );


    right.addEventListener(
        "pointerdown",
        turnRight
    );

    right.addEventListener(
        "pointerup",
        stopSteering
    );

    right.addEventListener(
        "pointerleave",
        stopSteering
    );


    gas.addEventListener(
        "pointerdown",
        gasDown
    );

    gas.addEventListener(
        "pointerup",
        gasUp
    );

    gas.addEventListener(
        "pointerleave",
        gasUp
    );


    brakeBtn.addEventListener(
        "pointerdown",
        brake
    );


    hornBtn.addEventListener(
        "click",
        horn
    );
}


/* =========================
   CITY MENU
========================= */

function openCityMenu() {

    document.getElementById(
        "mainMenu"
    ).classList.add("hidden");


    document.getElementById(
        "cityMenu"
    ).classList.remove("hidden");


    const list =
        document.getElementById(
            "cityList"
        );


    list.innerHTML = "";


    cities.forEach(
        (name, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "city-card";


            card.innerHTML = `

                <span class="city-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="city-name">
                    🇵🇰 ${name}
                </span>

                <span class="city-arrow">
                    ➜
                </span>

            `;


            card.onclick = () => {

                city = name;

                destination =
                    name === "Kamalia"
                        ? "Kamalia City"
                        : name + " City";

                document.getElementById(
                    "currentCity"
                ).innerText = city;

                document.getElementById(
                    "destination"
                ).innerText =
                    destination;

                startGame();

            };


            list.appendChild(
                card
            );

        }
    );
}


/* =========================
   BACK
========================= */

function backToMenu() {

    document.getElementById(
        "cityMenu"
    ).classList.add("hidden");


    document.getElementById(
        "mainMenu"
    ).classList.remove("hidden");
}


/* =========================
   EXIT
========================= */

function exitGame() {

    gameRunning = false;


    document.getElementById(
        "gameUI"
    ).classList.add("hidden");


    document.getElementById(
        "mainMenu"
    ).classList.remove("hidden");
}


/* =========================
   COMING SOON
========================= */

function showComingSoon(name) {

    alert(
        name +
        "\n\n🚧 Is feature ko next update mein add karenge."
    );
}


/* =========================
   RESIZE
========================= */

function resizeGame() {

    if (!camera || !renderer)
        return;


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}


/* =========================
   INITIAL SETUP
========================= */

window.addEventListener(
    "load",
    setupControls
);
