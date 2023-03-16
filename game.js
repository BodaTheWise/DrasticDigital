const gameContainer = document.getElementById('game-container');
const flamingo = document.getElementById('flamingo');
const coin = document.querySelector('.coin');
const enemyCoin = document.querySelector('.enemy-coin');
const scoreElem = document.getElementById('score');
const congrats = document.getElementById('congrats');

let score = 0;

function updateScore() {
    scoreElem.innerText = `Score: ${score}`;
}

function getRandomX() {
    return Math.floor(Math.random() * (gameContainer.clientWidth - 20));
}

function dropCoin() {
    coin.style.top = '-20px';
    coin.style.left = `${getRandomX()}px`;
    enemyCoin.style.top = '-20px';
    enemyCoin.style.left = `${getRandomX()}px`;

    let coinInterval = setInterval(() => {
        coin.style.top = `${parseInt(coin.style.top) + 1}px`;
        enemyCoin.style.top = `${parseInt(enemyCoin.style.top) + 1}px`;

        if (coin.getBoundingClientRect().bottom >= flamingo.getBoundingClientRect().top &&
            coin.getBoundingClientRect().left + 20 >= flamingo.getBoundingClientRect().left &&
            coin.getBoundingClientRect().right - 20 <= flamingo.getBoundingClientRect().right) {
            score++;
            updateScore();
            if (score === 5) {
                clearInterval(coinInterval);
                congrats.style.display = 'block';
            }
        } else if (enemyCoin.getBoundingClientRect().bottom >= flamingo.getBoundingClientRect().top &&
            enemyCoin.getBoundingClientRect().left + 20 >= flamingo.getBoundingClientRect().left &&
            enemyCoin.getBoundingClientRect().right - 20 <= flamingo.getBoundingClientRect().right) {
            score = 0;
            updateScore();
        }

        if (parseInt(coin.style.top) > gameContainer.clientHeight || parseInt(enemyCoin.style.top) > gameContainer.clientHeight) {
            clearInterval(coinInterval);
            if (score < 5) {
                dropCoin();
            }
        }
    }, 10);
}

gameContainer.addEventListener('mousemove', (e) => {
    flamingo.style.left = `${e.clientX - gameContainer.getBoundingClientRect().left - 25}px`;
});

dropCoin();
