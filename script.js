// ======================================================
// SIGA O SANGUE — SCRIPT.JS
// ESCOLHA + MAPA + MOVIMENTAÇÃO MOBILE
// ======================================================

const characters = [
    {
        name: "Kael Vargas",
        age: 19,
        gender: "Masculino",
        trait: "RAIVA",
        quote: "Se eu sinto, eu faço. O resto se dane.",
        description:
            "Impulsivo, agressivo e extremamente leal. Kael age antes de pensar, principalmente quando alguém que ama está em perigo.",
        ability: "Ira Descontrolada",
        abilityDescription:
            "Quanto menor estiver sua vida, maior será sua força.",
        image: "kael.png"
    },

    {
        name: "Dante Almeida",
        age: 22,
        gender: "Masculino",
        trait: "DESEJO",
        quote: "Tudo o que eu quero... eu quero agora.",
        description:
            "Carismático, provocador e inconsequente. Dante não gosta de limites e transforma riscos em oportunidades.",
        ability: "Desejo Incontrolável",
        abilityDescription:
            "Quanto maior o risco, maior o potencial de ataque.",
        image: "dante.png"
    },

    {
        name: "Lívia Santos",
        age: 20,
        gender: "Feminino",
        trait: "PAIXÃO",
        quote: "Eu sinto tudo. E tudo me consome.",
        description:
            "Lívia sente tudo intensamente. Ama com força, odeia com força e é extremamente leal a quem ama.",
        ability: "Paixão Selvagem",
        abilityDescription:
            "Quando emocionalmente afetada, recebe um aumento temporário de ataque e defesa.",
        image: "livia.png"
    },

    {
        name: "Yasmin Lemos",
        age: 18,
        gender: "Feminino",
        trait: "INSTINTO",
        quote: "Eu não tenho medo. Eu só reajo.",
        description:
            "Observadora e desconfiada. Yasmin confia mais no próprio instinto do que nas palavras das pessoas.",
        ability: "Instinto de Sobrevivência",
        abilityDescription:
            "Com pouca vida, ganha velocidade e maior chance de esquiva.",
        image: "yasmin.png"
    }
];


// ======================================================
// CONTROLE DAS TELAS
// ======================================================

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }
}


// ======================================================
// COMEÇAR
// ======================================================

const startButton = document.getElementById("startButton");

if (startButton) {

    startButton.addEventListener("click", () => {
        showScreen("elements");
    });

}


// ======================================================
// ELEMENTO SANGUE
// ======================================================

const bloodElement = document.querySelector(".element.blood");

if (bloodElement) {

    bloodElement.addEventListener("click", () => {
        showCharacters();
    });

}


// ======================================================
// ELEMENTOS BLOQUEADOS
// ======================================================

document.querySelectorAll(".locked").forEach(element => {

    element.addEventListener("click", () => {

        alert("Este elemento ainda está bloqueado.");

    });

});


// ======================================================
// MOSTRAR PERSONAGENS
// ======================================================

function showCharacters() {

    const grid = document.getElementById("characterGrid");

    if (!grid) return;

    grid.innerHTML = "";

    characters.forEach(character => {

        const card = document.createElement("div");

        card.className = "character-card";

        card.innerHTML = `
            <div class="character-image-container">

                <img
                    src="${character.image}"
                    alt="${character.name}"
                    class="character-image"
                >

            </div>

            <div class="character-info">

                <span class="character-trait">
                    ${character.trait}
                </span>

                <h3>
                    ${character.name}
                </h3>

                <p>
                    ${character.age} anos
                </p>

            </div>
        `;

        card.addEventListener("click", () => {

            selectCharacter(character);

        });

        grid.appendChild(card);

    });

    showScreen("characters");
}


// ======================================================
// SELECIONAR PERSONAGEM
// ======================================================

function selectCharacter(character) {

    window.selectedCharacter = character;

    const details = document.getElementById("characterDetails");

    if (!details) return;

    details.innerHTML = `

        <div class="character-profile">

            <div class="profile-image">

                <img
                    src="${character.image}"
                    alt="${character.name}"
                >

            </div>

            <div class="profile-text">

                <p class="small-title">
                    SANGUE
                </p>

                <h1>
                    ${character.name}
                </h1>

                <div class="profile-trait">
                    ${character.trait}
                </div>

                <p class="profile-data">
                    ${character.age} anos • ${character.gender}
                </p>

                <p class="quote">
                    "${character.quote}"
                </p>

                <p class="description">
                    ${character.description}
                </p>

                <div class="ability">

                    <strong>
                        ${character.ability}
                    </strong>

                    <p>
                        ${character.abilityDescription}
                    </p>

                </div>

            </div>

        </div>

    `;

    showScreen("characterInfo");
}


// ======================================================
// VOLTAR PARA PERSONAGENS
// ======================================================

const backCharacters = document.getElementById("backCharacters");

if (backCharacters) {

    backCharacters.addEventListener("click", () => {

        showScreen("characters");

    });

}


// ======================================================
// CONFIRMAR PERSONAGEM
// ======================================================

const confirmCharacter = document.getElementById("confirmCharacter");

if (confirmCharacter) {

    confirmCharacter.addEventListener("click", () => {

        if (!window.selectedCharacter) return;

        const chosenName = document.getElementById("chosenName");

        if (chosenName) {

            chosenName.textContent =
                window.selectedCharacter.name;

        }

        showScreen("gameStart");

    });

}


// ======================================================
// ENTRAR NO MAPA
// ======================================================

const continueButton = document.getElementById("continueButton");

if (continueButton) {

    continueButton.addEventListener("click", () => {

        if (!window.selectedCharacter) return;

        showScreen("map");

        iniciarMapa();

    });

}


// ======================================================
// MAPA
// ======================================================

let mapaIniciado = false;

let playerX = 0;
let playerY = 0;

let joystickAtivo = false;

let joystickStartX = 0;
let joystickStartY = 0;

let joystickX = 0;
let joystickY = 0;

let animationFrame;


// ======================================================
// INICIAR MAPA
// ======================================================

function iniciarMapa() {

    const map = document.getElementById("map");

    if (!map) {

        console.log("Mapa ainda não foi criado no HTML.");

        return;

    }

    const player = document.getElementById("mapPlayer");

    if (!player) return;


    // Coloca o personagem no começo do mapa

    playerX = 120;
    playerY = 120;


    atualizarPlayer();


    if (mapaIniciado) return;

    mapaIniciado = true;


    configurarJoystick();

    configurarTeclado();


    iniciarLoop();

}


// ======================================================
// ATUALIZAR POSIÇÃO
// ======================================================

function atualizarPlayer() {

    const player = document.getElementById("mapPlayer");

    if (!player) return;

    player.style.left = playerX + "px";

    player.style.top = playerY + "px";

}


// ======================================================
// LOOP DE MOVIMENTO
// ======================================================

function iniciarLoop() {

    function loop() {

        if (joystickAtivo) {

            const distancia = Math.sqrt(
                joystickX * joystickX +
                joystickY * joystickY
            );

            if (distancia > 5) {

                const normalX = joystickX / distancia;

                const normalY = joystickY / distancia;

                const velocidade = 2.5;

                playerX += normalX * velocidade;

                playerY += normalY * velocidade;

            }

        }

        limitarPlayer();

        atualizarPlayer();

        animationFrame = requestAnimationFrame(loop);

    }

    loop();

}


// ======================================================
// LIMITES DO MAPA
// ======================================================

function limitarPlayer() {

    const map = document.getElementById("map");

    const player = document.getElementById("mapPlayer");

    if (!map || !player) return;


    const limiteX =
        map.clientWidth - player.offsetWidth;

    const limiteY =
        map.clientHeight - player.offsetHeight;


    if (playerX < 0) {
        playerX = 0;
    }

    if (playerY < 0) {
        playerY = 0;
    }

    if (playerX > limiteX) {
        playerX = limiteX;
    }

    if (playerY > limiteY) {
        playerY = limiteY;
    }

}


// ======================================================
// JOYSTICK MOBILE
// ======================================================

function configurarJoystick() {

    const joystick =
        document.getElementById("joystick");

    const knob =
        document.getElementById("joystickKnob");


    if (!joystick || !knob) return;


    joystick.addEventListener(
        "touchstart",
        iniciarJoystick,
        { passive: false }
    );


    joystick.addEventListener(
        "touchmove",
        moverJoystick,
        { passive: false }
    );


    joystick.addEventListener(
        "touchend",
        pararJoystick,
        { passive: false }
    );


    joystick.addEventListener(
        "touchcancel",
        pararJoystick,
        { passive: false }
    );


    // Também funciona com mouse
    // para testar no computador

    joystick.addEventListener(
        "mousedown",
        iniciarJoystickMouse
    );

}


// ======================================================
// INICIAR JOYSTICK
// ======================================================

function iniciarJoystick(event) {

    event.preventDefault();

    joystickAtivo = true;

    const toque = event.touches[0];

    joystickStartX = toque.clientX;

    joystickStartY = toque.clientY;

}


// ======================================================
// MOVER JOYSTICK
// ======================================================

function moverJoystick(event) {

    if (!joystickAtivo) return;

    event.preventDefault();

    const toque = event.touches[0];

    const movimentoX =
        toque.clientX - joystickStartX;

    const movimentoY =
        toque.clientY - joystickStartY;


    const limite = 45;

    const distancia = Math.sqrt(
        movimentoX * movimentoX +
        movimentoY * movimentoY
    );


    if (distancia > limite) {

        joystickX =
            (movimentoX / distancia) * limite;

        joystickY =
            (movimentoY / distancia) * limite;

    } else {

        joystickX = movimentoX;

        joystickY = movimentoY;

    }


    atualizarJoystickVisual();

}


// ======================================================
// PARAR JOYSTICK
// ======================================================

function pararJoystick(event) {

    if (event) {
        event.preventDefault();
    }

    joystickAtivo = false;

    joystickX = 0;

    joystickY = 0;


    const knob =
        document.getElementById("joystickKnob");

    if (knob) {

        knob.style.transform =
            "translate(-50%, -50%)";

    }

}


// ======================================================
// VISUAL DO JOYSTICK
// ======================================================

function atualizarJoystickVisual() {

    const knob =
        document.getElementById("joystickKnob");

    if (!knob) return;


    knob.style.transform =
        `translate(
            calc(-50% + ${joystickX}px),
            calc(-50% + ${joystickY}px)
        )`;

}


// ======================================================
// MOUSE — TESTE NO PC
// ======================================================

function iniciarJoystickMouse(event) {

    joystickAtivo = true;

    joystickStartX = event.clientX;

    joystickStartY = event.clientY;


    const mover =
        (e) => {

            if (!joystickAtivo) return;

            const movimentoX =
                e.clientX - joystickStartX;

            const movimentoY =
                e.clientY - joystickStartY;


            const limite = 45;

            const distancia = Math.sqrt(
                movimentoX * movimentoX +
                movimentoY * movimentoY
            );


            if (distancia > limite) {

                joystickX =
                    (movimentoX / distancia) * limite;

                joystickY =
                    (movimentoY / distancia) * limite;

            } else {

                joystickX = movimentoX;

                joystickY = movimentoY;

            }


            atualizarJoystickVisual();

        };


    const parar =
        () => {

            pararJoystick();

            document.removeEventListener(
                "mousemove",
                mover
            );

            document.removeEventListener(
                "mouseup",
                parar
            );

        };


    document.addEventListener(
        "mousemove",
        mover
    );

    document.addEventListener(
        "mouseup",
        parar
    );

}


// ======================================================
// TECLADO — TESTE NO PC
// ======================================================

function configurarTeclado() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                !document
                    .getElementById("map")
                    ?.classList
                    .contains("active")
            ) {

                return;

            }


            const velocidade = 4;


            if (
                event.key === "ArrowUp" ||
                event.key.toLowerCase() === "w"
            ) {

                playerY -= velocidade;

            }


            if (
                event.key === "ArrowDown" ||
                event.key.toLowerCase() === "s"
            ) {

                playerY += velocidade;

            }


            if (
                event.key === "ArrowLeft" ||
                event.key.toLowerCase() === "a"
            ) {

                playerX -= velocidade;

            }


            if (
                event.key === "ArrowRight" ||
                event.key.toLowerCase() === "d"
            ) {

                playerX += velocidade;

            }


            limitarPlayer();

            atualizarPlayer();

        }
    );

}
