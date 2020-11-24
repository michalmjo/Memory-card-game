const cardsImg = ["img/1.jpg", "img/1.jpg", "img/2.jpg", "img/2.jpg", "img/3.jpg", "img/3.jpg", "img/4.jpg", "img/4.jpg", "img/5.jpg", "img/5.jpg", "img/6.jpg", "img/6.jpg", "img/7.jpg", "img/7.jpg", "img/8.jpg", "img/8.jpg"];



let cards = document.querySelectorAll("div.container div img");

cards = [...cards];
const startTime = new Date().getTime();


let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResoult = 0;



cards.ondragstart = function () {
    return false;
};
const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    activeCard.classList.remove("hidden");

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }

    // 2 klik
    else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard);
        })
        activeCards[1] = activeCard;

        setTimeout(function () {
            if (activeCards[0].getAttribute('src') === activeCards[1].getAttribute('src')) {
                console.log("win");
                activeCards.forEach(card => {
                    card.setAttribute('src', "img/done.jpg")
                })
                gameResoult++;

                if (gameResoult == gamePairs) {
                    console.log("win game");
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    setTimeout(function () {
                        alert(`Wygrałeś twój wynik to: ${gameTime}`);
                        location.reload();
                    }, 200);

                }
            } else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => {
                card.addEventListener("click", clickCard);
            })
        }, 700)

    }

}

const init = () => {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsImg.length);
        card.setAttribute('src', cardsImg[position]);
        cardsImg.splice(position, 1);
    })

    setTimeout(function () {
        cards.forEach((card) => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000)
}

init();