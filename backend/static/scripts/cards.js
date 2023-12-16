const cardWidth = 100;
const cardHeight = 150;
const numCards = 6; // Adjust this based on the number of cards you have

let cssClasses = "";

for (let i = 0; i < numCards; i++) {
  const positionX = -i * cardWidth;
  const className = `.red-${i} {
    background: url('../images/cards.png') ${positionX}px 0px;
    width: ${cardWidth}px;
    height: ${cardHeight}px;
  }`;

  cssClasses += className + "\n";
}

console.log(cssClasses);
