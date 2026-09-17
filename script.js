// ======================================================
// SIGA O SANGUE — SCRIPT PRINCIPAL
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
// FUNÇÃO PARA TROCAR DE TELA
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

document.getElementById("startButton").addEventListener("click", () => {

    showScreen("elements");

});


// ======================================================
// ESCOLHER SANGUE
// ======================================================

document.querySelector(".element.blood").addEventListener("click", () => {

    showCharacters();

});


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

    const details =
        document.getElementById("characterDetails");

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
// VOLTAR
// ======================================================

document.getElementById("backCharacters").addEventListener("click", () => {

    showScreen("characters");

});


// ======================================================
// CONFIRMAR PERSONAGEM
// ======================================================

document.getElementById("confirmCharacter").addEventListener("click", () => {

    if (!window.selectedCharacter) return;

    document.getElementById("chosenName").textContent =
        window.selectedCharacter.name;

    showScreen("gameStart");

});


// ======================================================
// CONTINUAR
// ======================================================

document.getElementById("continueButton").addEventListener("click", () => {

    alert("O próximo capítulo ainda está sendo desenvolvido.");

});
