export interface Game {
  Number?: {
    image: string,
    isFaceUp: boolean,
    isVisible: boolean
  }
}

export interface Scoreboard {
  id: number,
  createdAt: string,
  name: string,
  score: number
}
