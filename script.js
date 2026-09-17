// ======================================================
// SIGA O SANGUE
// SISTEMA INICIAL
// ======================================================


const characters = [

    {
        id: 1,
        name: "Kael Vargas",
        age: 19,
        gender: "Homem",

        trait: "RAIVA",

        quote:
            "Se eu sinto, eu faço. O resto se dane.",

        personality:
            "Impulsivo, agressivo e extremamente leal. Kael age antes de pensar, principalmente quando alguém que ama está em perigo.",

        ability:
            "Ira Descontrolada",

        abilityDescription:
            "Quanto menor sua vida, maior fica sua força de ataque.",

        story:
            "Kael nunca aprendeu a esconder o que sente. A raiva sempre chegou primeiro. Depois dela, vinham as consequências."
    },


    {
        id: 2,
        name: "Dante Almeida",
        age: 22,
        gender: "Homem",

        trait: "DESEJO",

        quote:
            "Tudo o que eu quero... eu quero agora.",

        personality:
            "Carismático, provocador e inconsequente. Dante não gosta de limites e costuma transformar qualquer risco em uma oportunidade.",

        ability:
            "Desejo Incontrolável",

        abilityDescription:
            "Quanto maior o risco que assume, maior o potencial de seus ataques.",

        story:
            "Dante sempre acreditou que desejar alguma coisa era motivo suficiente para buscá-la. Até descobrir que algumas coisas também desejam você."
    },


    {
        id: 3,
        name: "Lívia Santos",
        age: 20,
        gender: "Mulher",

        trait: "PAIXÃO",

        quote:
            "Eu sinto tudo. E tudo me consome.",

        personality:
            "Intensa, emocional e extremamente leal. Lívia ama com a mesma força com que odeia.",

        ability:
            "Paixão Selvagem",

        abilityDescription:
            "Quando emocionalmente afetada, Lívia recebe um aumento temporário em ataque e defesa.",

        story:
            "Lívia nunca conseguiu sentir pouco. Para ela, amar alguém sempre significou estar disposta a perder tudo."
    },


    {
        id: 4,
        name: "Yasmin Lemos",
        age: 18,
        gender: "Mulher",

        trait: "INSTINTO",

        quote:
            "Eu não tenho medo. Eu só reajo.",

        personality:
            "Desconfiada, observadora e extremamente reativa. Yasmin confia mais nos próprios instintos do que nas palavras das pessoas.",

        ability:
            "Instinto de Sobrevivência",

        abilityDescription:
            "Quando sua vida está baixa, Yasmin recebe maior velocidade e chance de esquiva.",

        story:
            "Yasmin aprendeu cedo que o corpo percebe coisas que a mente demora para compreender."
    }

];


let selectedCharacter = null;


// ======================================================
// TROCA DE TELAS
// ======================================================

function showScreen(id) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ======================================================
// COMEÇAR
// ======================================================

document
    .getElementById("startButton")
    .addEventListener("click", () => {

        showScreen("elements");

    });


// ======================================================
// ELEMENTO SANGUE
// ======================================================

document
    .querySelector(".blood")
    .addEventListener("click", () => {

        showCharacters();

    });


// ======================================================
// ELEMENTOS BLOQUEADOS
// ======================================================

document
    .querySelectorAll(".locked")
    .forEach(element => {

        element.addEventListener("click", () => {

            alert(
                "Este elemento ainda não foi despertado."
            );

        });

    });


// ======================================================
// MOSTRAR PERSONAGENS
// ======================================================

function showCharacters() {

    const grid =
        document.getElementById("characterGrid");

    grid.innerHTML = "";

    characters.forEach(character => {

        const card =
            document.createElement("article");

        card.className = "character-card";

        card.innerHTML = `

            <div class="sprite">

                <div class="sprite-body"></div>

            </div>

            <h3>
                ${character.name}
            </h3>

            <p class="age">
                ${character.gender} • ${character.age} anos
            </p>

            <p class="trait">
                ${character.trait}
            </p>

            <p class="quote">
                "${character.quote}"
            </p>

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

    selectedCharacter = character;

    const details =
        document.getElementById("characterDetails");

    details.innerHTML = `

        <div class="profile">

            <div class="big-sprite">

                <div class="sprite-body"></div>

            </div>

            <h2>
                ${character.name}
            </h2>

            <p class="profile-age">
                ${character.gender} • ${character.age} anos
            </p>

            <p class="profile-quote">
                "${character.quote}"
            </p>

            <div class="profile-section">

                <h3>
                    PERSONALIDADE
                </h3>

                <p>
                    ${character.personality}
                </p>

            </div>


            <div class="profile-section">

                <h3>
                    HABILIDADE
                </h3>

                <p>
                    <strong>
                        ${character.ability}
                    </strong>
                </p>

                <p>
                    ${character.abilityDescription}
                </p>

            </div>


            <div class="profile-section">

                <h3>
                    HISTÓRIA
                </h3>

                <p>
                    ${character.story}
                </p>

            </div>

        </div>

    `;

    showScreen("characterInfo");
}


// ======================================================
// VOLTAR PARA PERSONAGENS
// ======================================================

document
    .getElementById("backCharacters")
    .addEventListener("click", () => {

        showScreen("characters");

    });


// ======================================================
// CONFIRMAR PERSONAGEM
// ======================================================

document
    .getElementById("confirmCharacter")
    .addEventListener("click", () => {

        if (!selectedCharacter) {
            return;
        }

        document
            .getElementById("chosenName")
            .textContent =
            selectedCharacter.name;

        showScreen("gameStart");

    });


// ======================================================
// CONTINUAR
// ======================================================

document
    .getElementById("continueButton")
    .addEventListener("click", () => {

        alert(
            "O próximo capítulo ainda está sendo desenvolvido."
        );

    });
