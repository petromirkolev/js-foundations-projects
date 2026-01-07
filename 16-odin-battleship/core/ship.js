// Ship constructor
class Ship {
  constructor(length) {
    this.length = length;
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
