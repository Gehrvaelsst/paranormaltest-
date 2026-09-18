const characters = [
    {
        name:"Kael Vargas", age:19, gender:"Masculino", trait:"RAIVA",
        quote:"Se eu sinto, eu faço. O resto se dane.",
        description:"Impulsivo, agressivo e extremamente leal. Kael age antes de pensar, principalmente quando alguém que ama está em perigo.",
        ability:"Ira Descontrolada",
        abilityDescription:"Quanto menor estiver sua vida, maior será sua força.",
        image:"kael.png"
    },
    {
        name:"Dante Almeida", age:22, gender:"Masculino", trait:"DESEJO",
        quote:"Tudo o que eu quero... eu quero agora.",
        description:"Carismático, provocador e inconsequente. Dante não gosta de limites e transforma riscos em oportunidades.",
        ability:"Desejo Incontrolável",
        abilityDescription:"Quanto maior o risco, maior o potencial de ataque.",
        image:"dante.png"
    },
    {
        name:"Lívia Santos", age:20, gender:"Feminino", trait:"PAIXÃO",
        quote:"Eu sinto tudo. E tudo me consome.",
        description:"Lívia sente tudo intensamente. Ama com força, odeia com força e é extremamente leal a quem ama.",
        ability:"Paixão Selvagem",
        abilityDescription:"Quando emocionalmente afetada, recebe um aumento temporário de ataque e defesa.",
        image:"livia.png"
    },
    {
        name:"Yasmin Lemos", age:18, gender:"Feminino", trait:"INSTINTO",
        quote:"Eu não tenho medo. Eu só reajo.",
        description:"Observadora e desconfiada. Yasmin confia mais no próprio instinto do que nas palavras das pessoas.",
        ability:"Instinto de Sobrevivência",
        abilityDescription:"Com pouca vida, ganha velocidade e maior chance de esquiva.",
        image:"yasmin.png"
    }
];

function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
    });

    const screen=document.getElementById(id);

    if(screen) screen.classList.add("active");
}

document.getElementById("startButton")?.addEventListener("click",()=>{
    showScreen("elements");
});

document.querySelector(".element.blood")?.addEventListener("click",()=>{
    showCharacters();
});

document.querySelectorAll(".locked").forEach(element=>{
    element.addEventListener("click",()=>{
        alert("Este elemento ainda está bloqueado.");
    });
});

function showCharacters(){

    const grid=document.getElementById("characterGrid");

    if(!grid)return;

    grid.innerHTML="";

    characters.forEach(character=>{

        const card=document.createElement("div");

        card.className="character-card";

        card.innerHTML=`
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

        card.addEventListener("click",()=>{
            selectCharacter(character);
        });

        grid.appendChild(card);
    });

    showScreen("characters");
}
function selectCharacter(character){

    window.selectedCharacter=character;

    const details=document.getElementById("characterDetails");

    if(!details)return;

    details.innerHTML=`
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

document.getElementById("backCharacters")?.addEventListener("click",()=>{
    showScreen("characters");
});

document.getElementById("confirmCharacter")?.addEventListener("click",()=>{

    if(!window.selectedCharacter)return;

    const chosenName=document.getElementById("chosenName");

    if(chosenName){
        chosenName.textContent=window.selectedCharacter.name;
    }

    showScreen("gameStart"); 
});

document.getElementById("continueButton")?.addEventListener("click",()=>{

    if(!window.selectedCharacter)return;

    showScreen("map");

    iniciarMapa();
});


// ========================================
// MAPA
// ========================================

let playerX=120;
let playerY=120;

let joystickAtivo=false;

let joystickX=0;
let joystickY=0;

let joystickStartX=0;
let joystickStartY=0;

let direcaoAtual="frente";

let frameAtual=0;

let andando=false;

let ultimoFrame=0;

let mapaIniciado=false;

let framesKael={
    frente:[],
    costas:[],
    esquerda:[],
    direita:[]
};


// ========================================
// TAMANHO DA SPRITE SHEET
// ========================================

// A kael-walk-sheet.png possui:
// 4 colunas x 4 linhas
//
// Cada frame:
// 110 x 160 pixels

const FRAME_LARGURA=110;
const FRAME_ALTURA=160;

const LINHAS={
    frente:0,
    costas:1,
    esquerda:2,
    direita:3
};


function iniciarMapa(){

    const player=document.getElementById("mapPlayer");

    if(!player)return;

    playerX=120;
    playerY=120;

    player.style.width="55px";
    player.style.height="80px";

    carregarSpriteKael();

    atualizarPlayer();

    if(mapaIniciado)return;

    mapaIniciado=true;

    configurarJoystick();
    configurarTeclado();

    requestAnimationFrame(loop);
}
function carregarSpriteKael(){

    const imagem=new Image();

    imagem.src="kael-walk-sheet.png";

    imagem.onload=()=>{

        const direcoes=[
            "frente",
            "costas",
            "esquerda",
            "direita"
        ];

        direcoes.forEach(direcao=>{

            const linha=LINHAS[direcao];

            framesKael[direcao]=[];

            for(let coluna=0;coluna<4;coluna++){

                const canvas=document.createElement("canvas");

                canvas.width=FRAME_LARGURA;
                canvas.height=FRAME_ALTURA;

                const ctx=canvas.getContext("2d");

                ctx.imageSmoothingEnabled=false;

                ctx.drawImage(
                    imagem,

                    coluna*FRAME_LARGURA,
                    linha*FRAME_ALTURA,

                    FRAME_LARGURA,
                    FRAME_ALTURA,

                    0,
                    0,

                    FRAME_LARGURA,
                    FRAME_ALTURA
                );

                framesKael[direcao].push(
                    canvas.toDataURL("image/png")
                );
            }
        });

        mostrarFrame();
    };
}


function mostrarFrame(){

    const player=document.getElementById("mapPlayer");

    if(!player)return;

    let imagem=player.querySelector("img");

    if(!imagem){

        imagem=document.createElement("img");

        imagem.alt="Kael";

        imagem.style.width="100%";
        imagem.style.height="100%";

        imagem.style.objectFit="contain";

        imagem.style.imageRendering="pixelated";

        imagem.style.pointerEvents="none";

        player.appendChild(imagem);
    }

    const frames=framesKael[direcaoAtual];

    if(!frames || frames.length===0)return;

    imagem.src=frames[frameAtual];
}


function atualizarAnimacao(tempo){

    if(!andando){

        frameAtual=0;

        mostrarFrame();

        return;
    }

    if(tempo-ultimoFrame>120){

        frameAtual++;

        if(frameAtual>=4){
            frameAtual=0;
        }

        mostrarFrame();

        ultimoFrame=tempo;
    }
}


function atualizarPlayer(){

    const player=document.getElementById("mapPlayer");

    if(!player)return;

    player.style.left=playerX+"px";
    player.style.top=playerY+"px";
}


function descobrirDirecao(x,y){

    if(Math.abs(x)>Math.abs(y)){

        if(x>0){
            direcaoAtual="direita";
        }else{
            direcaoAtual="esquerda";
        }

    }else{

        if(y>0){
            direcaoAtual="frente";
        }else{
            direcaoAtual="costas";
        }
    }

    mostrarFrame();
}


function limitarPlayer(){

    const map=document.getElementById("map");

    const player=document.getElementById("mapPlayer");

    if(!map || !player)return;

    const limiteX=map.clientWidth-player.offsetWidth;
    const limiteY=map.clientHeight-player.offsetHeight;

    playerX=Math.max(0,Math.min(playerX,limiteX));
    playerY=Math.max(0,Math.min(playerY,limiteY));
}


function loop(tempo){

    let movendo=false;

    if(joystickAtivo){

        const distancia=Math.sqrt(
            joystickX*joystickX+
            joystickY*joystickY
        );

        if(distancia>5){

            movendo=true;

            const normalX=joystickX/distancia;
            const normalY=joystickY/distancia;

            const velocidade=2.5;

            playerX+=normalX*velocidade;
            playerY+=normalY*velocidade;

            descobrirDirecao(
                joystickX,
                joystickY
            );
        }
    }

    andando=movendo;

    limitarPlayer();

    atualizarPlayer();

    atualizarAnimacao(tempo);

    requestAnimationFrame(loop);
}
function configurarJoystick(){

    const joystick=document.getElementById("joystick");

    if(!joystick)return;

    joystick.addEventListener(
        "touchstart",
        iniciarJoystick,
        {passive:false}
    );

    joystick.addEventListener(
        "touchmove",
        moverJoystick,
        {passive:false}
    );

    joystick.addEventListener(
        "touchend",
        pararJoystick,
        {passive:false}
    );

    joystick.addEventListener(
        "touchcancel",
        pararJoystick,
        {passive:false}
    );

    joystick.addEventListener(
        "mousedown",
        iniciarJoystickMouse
    );
}


function iniciarJoystick(event){

    event.preventDefault();

    joystickAtivo=true;

    const toque=event.touches[0];

    joystickStartX=toque.clientX;
    joystickStartY=toque.clientY;
}


function moverJoystick(event){

    if(!joystickAtivo)return;

    event.preventDefault();

    const toque=event.touches[0];

    calcularJoystick(
        toque.clientX-joystickStartX,
        toque.clientY-joystickStartY
    );
}


function calcularJoystick(x,y){

    const limite=45;

    const distancia=Math.sqrt(
        x*x+y*y
    );

    if(distancia>limite){

        joystickX=(x/distancia)*limite;
        joystickY=(y/distancia)*limite;

    }else{

        joystickX=x;
        joystickY=y;
    }

    atualizarJoystickVisual();

    if(Math.abs(x)>5 || Math.abs(y)>5){
        descobrirDirecao(x,y);
    }
}


function pararJoystick(event){

    if(event){
        event.preventDefault();
    }

    joystickAtivo=false;

    joystickX=0;
    joystickY=0;

    andando=false;

    frameAtual=0;

    mostrarFrame();

    const knob=document.getElementById("joystickKnob");

    if(knob){
        knob.style.transform=
            "translate(-50%,-50%)";
    }
}


function atualizarJoystickVisual(){

    const knob=document.getElementById("joystickKnob");

    if(!knob)return;

    knob.style.transform=
        `translate(
            calc(-50% + ${joystickX}px),
            calc(-50% + ${joystickY}px)
        )`;
}


function iniciarJoystickMouse(event){

    joystickAtivo=true;

    joystickStartX=event.clientX;
    joystickStartY=event.clientY;

    const mover=e=>{

        if(!joystickAtivo)return;

        calcularJoystick(
            e.clientX-joystickStartX,
            e.clientY-joystickStartY
        );
    };

    const parar=()=>{

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


// ========================================
// TECLADO
// ========================================

function configurarTeclado(){

    document.addEventListener(
        "keydown",
        event=>{

            const map=document.getElementById("map");

            if(
                !map ||
                !map.classList.contains("active")
            ){
                return;
            }

            let x=0;
            let y=0;

            const tecla=event.key.toLowerCase();

            if(tecla==="w" || event.key==="ArrowUp"){
                y=-1;
            }

            if(tecla==="s" || event.key==="ArrowDown"){
                y=1;
            }

            if(tecla==="a" || event.key==="ArrowLeft"){
                x=-1;
            }

            if(tecla==="d" || event.key==="ArrowRight"){
                x=1;
            }

            if(x!==0 || y!==0){

                event.preventDefault();

                playerX+=x*4;
                playerY+=y*4;

                andando=true;

                descobrirDirecao(x,y);

                limitarPlayer();

                atualizarPlayer();
            }
        }
    );


    document.addEventListener(
        "keyup",
        event=>{

            const tecla=event.key.toLowerCase();

            if(
                tecla==="w" ||
                tecla==="a" ||
                tecla==="s" ||
                tecla==="d" ||
                event.key.startsWith("Arrow")
            ){

                andando=false;

                frameAtual=0;

                mostrarFrame();
            }
        }
    );
}
