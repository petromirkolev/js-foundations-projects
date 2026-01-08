// Ship constructor
class Ship {
  constructor(length) {
    this.length = length > 5 ? 5 : length;
    this.timesHit = 0;
  }
  hit() {
    return this.timesHit++;
  }
  isSunk() {
    return this.timesHit >= this.length;
  }
}

export { Ship };
