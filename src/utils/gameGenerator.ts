import { Game } from "../types";

const images = ['001', '004', '007', '016', '019', '021', '023', '025'];
// const images = ['001'];

export const generateGame = (): Game => {
  const cardIdsList = Array(images.length * 2).fill(0).map((x, y) => x + y);
  const shuffledCardIdsList = cardIdsList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  let game: Game = {};
  for (let i = 0; i < shuffledCardIdsList.length; i++) {
    game[shuffledCardIdsList[i]] = {
      image: images[Math.floor(i / 2)],
      isFaceUp: false,
      isVisible: true
    }
  }
  return game;
}
