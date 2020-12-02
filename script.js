//pega a div .dino
const dino = document.querySelector(".dino");
//pega a div .background
const background = document.querySelector(".background");
//detecta se ele esta pulando
let isJumping = false;
//posição do dino
let position = 0;
dino.style.left = 500 + 'px';
// pega o pressionamento da tecla espaço
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }    
}
//faz o dino pular
function jump(){   
    isJumping = true;
    let upInterval = setInterval(
        function(){
            if(position >= 150){
                clearInterval(upInterval);
                //descendo
                let downInterval = setInterval(
                    function(){
                        if(position <= 0){
                            clearInterval(downInterval);
                            isJumping = false;
                        }else{
                            position -= 20;
                            dino.style.bottom = position + 'px';
                        }
                    },20)
            } else {
                //subindo
                position += 20;
                dino.style.bottom = position + 'px';
            }
        },20)
}
//cria os cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = window.innerWidth;
    let randomTime = Math.random() * 6000;   

    cactus.classList.add('cactus');
    cactus.style.left = window.innerWidth + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(
        function(){
            cactusPosition -= 5;
            cactus.style.left = cactusPosition + 'px';

            if(cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            } else if(cactusPosition > 500 && cactusPosition < 560 && position < 60){
                //game over
                clearInterval(leftInterval);
                document.body.innerHTML = '<h1 class="gameover">Fim de jogo</h1>';
            } else{
                cactusPosition -= 5;
                cactus.style.left = cactusPosition + 'px';
            }
        },20
    )
    //cria cactus aleatórios (recursividade)
    setTimeout(createCactus, randomTime);
}
// chama função cria cactus
createCactus();
//escuta o pressionamento da tecla espaço
document.addEventListener('keyup', handleKeyUp)

