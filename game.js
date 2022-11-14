import { Move } from "./moves.js";
import { State } from "./state.js";

class Game {
    list = new Array();
    constructor(
        ROW = 10,
        COL = 16,
        array = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1],
        ],
        castle = array[1][1],
        king = array[9][9],
        n = 1,
        m = 1,
        k = 1,
        parentElement = document.querySelector("body"),
        array_cordinates = []
    ) {
        this.ROW = ROW;
        this.COL = COL;
        this.array = array;
        this.king = king;
        this.castle = castle;
        this.n = n;
        this.m = m;
        this.k = k;
        this.parentElement = parentElement;
        this.array_cordinates = array_cordinates;
    }
    set_k() {
        this.k++;
    }
    get_k() {
        return this.k;
    }
    print() {
        for (let i = 0; i < this.ROW; i++) {
            let count = 0;
            for (let j = 0; j < this.COL; j++) {
                count++;
                const button = document.createElement("button");
                const br = document.createElement("br");
                button.setAttribute("value", this.array[i][j]);
                button.setAttribute("type", "submit");
                button.setAttribute("id", this.k);
                this.set_k();
                button.addEventListener("click", () => this.checkinputs(i, j), false);
                this.parentElement.appendChild(button);

                if (this.array[i][j] == 2) {
                    button.setAttribute("class", "land");
                }
                if (this.array[i][j] == 8) {
                    button.setAttribute("class", "castle");
                    this.get_moves(i, j);
                }
                if (this.array[i][j] == 0) {
                    button.setAttribute("class", "king");
                }
                if (this.array[i][j] == 1) {
                    button.setAttribute("class", "stone");
                }
                if (count == 16) this.parentElement.appendChild(br);
            }
        }
    }

    checkinputs(row, col) {
        if (row == this.n && col == col) {
            this.move(row, col);
        } else if (row == row && col == this.m) {
            let n1 = this.n;
            let row1 = row;
            let m1 = this.m;
            if (row > this.n) {
                if (this.array[this.n + 1][this.m] != 2) this.move(row, col);
            } else {
                if (this.array[n1 - 1][m1] != 2) {
                    let count = 0;
                    for (n1; n1 >= row1; n1--) {
                        if (this.array[n1][col] == 2) count++;
                    }
                    if (count == 0) this.move(row, col);
                }
            }
        }
    }
    move(row, col) {
        this.isEnd(row, col);
        this.array[this.n][this.m] = this.array[row][col];
        this.array[row][col] = this.castle;
        this.newprint(this.array);
        this.n = row;
        this.m = col;
        setTimeout(() => this.check_land(row, col), 500);
    }

    newprint(M) {
        let l = 1;
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COL; j++) {
                let element = document.getElementById(l);
                element.value = M[i][j];
                l++;
            }
        }
        this.changecolor();
    }

    check_land(row, col) {
        let done = 0;
        row = parseInt(row);
        while (this.array[row + 1][col] != 2) {
            // isEnd(b+1 , a);
            this.array[row][col] = this.array[row + 1][col];
            this.array[row + 1][col] = this.castle;
            this.n = row + 1;
            this.m = col;
            this.newprint(this.array);
            row++;
            if (this.isEnd(row + 1, col) == true) {
                done++;
                break;
            }
        }
        if (done != 1) {
            this.get_moves(this.n, this.m);
        }

        //  state.get_array_coordinates();
    }

    isEnd(i, j) {
        if (this.array[i][j] == this.king) {
            document.write("you win !");
            return true;
        }
    }

    changecolor() {
        let h = 1;
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COL; j++) {
                let element = document.getElementById(h);
                if (element.value == 8) {
                    element.style.backgroundColor = "blue";
                }
                if (element.value == 1) {
                    element.style.backgroundColor = "rgb(174, 174, 195)";
                }
                if (element.value == 0) {
                    element.style.backgroundColor = "red";
                }
                h++;
            }
        }
    }

    get_moves(i, j) {
        const move = new Move(this.array);
        move.available_moves_right(i, j);
        move.available_moves_left(i, j);
        move.available_moves_top(i, j);
        move.deep_copy(i, j);
        this.get_next_states(move.getcoor());
    }

    get_next_states(coordinates) {
        const state = new State();
        const array = new Array();
        coordinates.forEach((element) => {
            let state = {
                i : element.i,
                j : element.j,
            }
            this.list.push(state);
            array.push(state);
        });
        state.store_state(this.list);
        this.print_states(array);
    }

    print_states(array) {
        console.log(array);
    }

    is_Equal(state1 , state2){
      return  JSON.stringify(state1)===JSON.stringify(state2);
    }

}

document.getElementById("start").addEventListener("click", () => {
    const game = new Game();
    game.print();
});
