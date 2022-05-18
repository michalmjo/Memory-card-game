class Cards {
  constructor() {
    this.tableCard = [];
    this.cards = document.querySelectorAll("div.container div img");
  }

  addCards = () => {
    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < 8; i++) {
        this.tableCard.push(`img/${i + 1}.jpg`);
      }
    }
  };
}
