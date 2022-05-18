class Statistic {
  constructor() {
    this.statsTime = document.querySelector(".stats__time span");
    this.statsScore = document.querySelector(".stats__score span");
    this.index = null;
  }

  getNewTime = () => {
    let time = 0;
    this.statsScore.textContent = 0;
    this.index = setInterval(() => {
      time++;
      this.statsTime.textContent = `${time}s`;
    }, 1000);
  };

  resetTimer = () => {
    clearInterval(this.index);
  };

  getScore = (score) => {
    this.statsScore.textContent = score + " ptk";
  };

  playAgain = () => {
    location.reload();
  };
}
