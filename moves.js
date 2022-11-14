export class Move {
  constructor(array, array_cordinates = [], ROW = 10, COL = 16) {
    this.array = array;
    this.array_cordinates = array_cordinates;
  }

  available_moves_right(i, j) {
    // curent i , j coordinates of castle
    let count = 1;
    while (this.array[i][j + count] == 1) {
      this.array_cordinates.push({ i: i, j: j + count });
      this.array_cordinates = this.array_cordinates;
      count++;
    }
  }
  available_moves_left(i, j) {
    let count = 1;
    while (this.array[i][j - count] == 1) {
      this.array_cordinates.push({ i: i, j: j - count });
      this.array_cordinates = this.array_cordinates;
      count++;
    }
  }
  available_moves_top(i, j) {
    let count = 1;
    while (this.array[i - count][j] == 1) {
      this.array_cordinates.push({ i: i - count, j: j });
      this.array_cordinates = this.array_cordinates;
      count++;
      if (i - count < 0) break;
    }
  }

  deep_copy(i, j) {
    this.array_cordinates.push({ i: i, j: j });
  }

  getcoor() {
    return this.array_cordinates;
  }
}
