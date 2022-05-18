class App {
  constructor() {
    this.card = new Cards();
    this.init = this.newGame.bind(this);
    this.startTime = new Date().getTime();
    this.statistic = new Statistic();
    this.activeCard = "";
    this.activeCards = [];
    this.gameResult = 0;
    this.gamePairs = 0;
    document.querySelector(".btn").addEventListener("click", this.newGame);
    document
      .querySelector(".btn_reset")
      .addEventListener("click", this.statistic.playAgain);
  }

  newGame = () => {
    this.statistic.getNewTime();
    document.querySelector(".btn").style.display = "none";
    this.card.addCards();
    this.gamePairs = this.card.tableCard.length / 2;
    const cards = [...this.card.cards];
    cards.forEach((card) => {
      console.log(this);
      const position = Math.floor(Math.random() * this.card.tableCard.length);
      card.setAttribute("src", this.card.tableCard[position]);
      this.card.tableCard.splice(position, 1);
    });

    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.add("hidden");
        card.addEventListener("click", this.clickCard);
        card.ondragstart = () => false;
        card.setAttribute("draggable", false);
      });
    }, 2000);
  };
  clickCard = (e) => {
    this.activeCard = e.target;
    if (this.activeCard === this.activeCards[0]) return;

    this.activeCard.classList.remove("hidden");
    if (this.activeCards.length === 0) {
      this.activeCards[0] = this.activeCard;
      return;
    } else {
      [...this.card.cards].forEach((card) => {
        card.removeEventListener("click", this.clickCard);
      });
      this.activeCards[1] = this.activeCard;

      setTimeout(() => {
        if (
          this.activeCards[0].getAttribute("src") ===
          this.activeCards[1].getAttribute("src")
        ) {
          console.log("win");
          this.activeCards.forEach((card) => {
            card.setAttribute("src", "img/done.jpg");
            card.classList.add("noneActivity");
          });
          this.gameResult++;

          if (this.gameResult === this.gamePairs) {
            console.log("win game");
            const endTime = new Date().getTime();
            const gameScore = (
              ((endTime - this.startTime) / 1000) *
              3.14
            ).toFixed(2);
            this.statistic.resetTimer();
            this.statistic.getScore(gameScore);
            document.querySelector(".btn_reset").style.display = "block";
          }
        } else {
          this.activeCards.forEach((card) => card.classList.add("hidden"));
        }
        this.activeCard = "";
        this.activeCards.length = 0;
        this.card.cards.forEach((card) => {
          card.addEventListener("click", this.clickCard);
        });
      }, 700);
    }
  };
}
