import { Move } from "./moves.js";
import { State } from "./state.js";

class Game {
  array = new Array();
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
    array_cordinates = [],
    queue = new Queue(),
    priorityqueue = new PriorityQueue(),
    stack = new Stack(),
    state = new State(),
    start_time ,
    end_time ,
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
    this.queue = queue;
    this.priorityqueue = priorityqueue;
    this.stack = stack;
    this.state = state;
    this.start_time = start_time;
    this.end_time = end_time;
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
          //  this.get_moves(i, j);
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


  /////// BFS ALGORITHM  //////
  a = 0;
  done = false;
  end = false ;
  BFS(i , j){ 
    this.a++
    let exists = false
    while(this.array[i + 1][j] == 1){
      i = i + 1;
      j = j;
    } 
    if(this.end == false)
    if(this.isEnd(i+1,j) == true){
      this.end = true
      this.done = true 
      this.end_time = performance.now();
      document.write('<strong> time taken : '+(this.end_time - this.start_time)/1000+'</strong>');
    };
    if(this.done == false)
    if(this.isEnd(i , j) == false){
      this.array[this.n][this.m] = this.array[i][j];
      this.array[i][j] = this.castle;
      this.n = i;
      this.m = j;
      let next_states = this.get_moves(i , j);  
      this.queue.dequeue(); 
      this.queue.visited_nodes.push({position :{i:i , j:j}})
      next_states.forEach((element)=>{
        exists = false
        this.queue.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
           this.queue.enqueue(element);
        }
      })
      console.log( "queue : " , this.queue.elements)
      console.log("visited nodes : " ,this.queue.visited_nodes)
      this.queue.elements.forEach((element)=>{
        exists = false
        this.queue.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
          this.BFS(element.position.i , element.position.j);
        }
      })
    }
  }

  ///// DFS ALGORITHM/////
  a1 = 0;
  done1 = false;
  end1 = false ;
  DFS(i , j){
    this.a1++
    let exists = false
    while(this.array[i + 1][j] == 1){
      i = i + 1;
      j = j;
    } 
    if(this.end1 == false)
    if(this.isEnd(i+1,j) == true){
      this.end1 = true
      this.done1 = true 
      this.end_time = performance.now();
      document.write('<strong> time taken : '+(this.end_time - this.start_time)/1000+'</strong>');
    };
    if(this.done1 == false)
    if(this.isEnd(i , j) == false){
      this.array[this.n][this.m] = this.array[i][j];
      this.array[i][j] = this.castle;
      this.n = i;
      this.m = j;
      let next_states = this.get_moves(i , j); 
      this.stack.pop();  
      this.stack.visited_nodes.push({position :{i:i , j:j}})
      next_states.forEach((element)=>{
        exists = false
        this.stack.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
           this.stack.push(element);
        }
      })
      console.log( "stack : " , this.stack.items)
      console.log("visited nodes : " ,this.stack.visited_nodes)
      this.stack.items.forEach((element)=>{
        exists = false
        this.stack.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
          this.DFS(element.position.i , element.position.j);
        }
      })
    }
  }
     
  //// UCS ALGORITHM //// 
  a2 = 0;
  done2 = false;
  end2 = false ;
  UCS(i , j){ 
    this.a2++
    let exists = false
    while(this.array[i + 1][j] == 1){
      i = i + 1;
      j = j;
    } 
    if(this.end2 == false)
    if(this.isEnd(i+1,j) == true){
      this.end2 = true
      this.done2 = true 
      this.end_time = performance.now();
      document.write('<strong> time taken : '+(this.end_time - this.start_time)/1000+'</strong>');
    };
    if(this.done2 == false)
    if(this.isEnd(i , j) == false){
      this.array[this.n][this.m] = this.array[i][j];
      this.array[i][j] = this.castle;
      this.n = i;
      this.m = j;
      let next_states = this.get_moves(i , j);  
      this.priorityqueue.dequeue();
      this.priorityqueue.visited_nodes.push({position :{i:i , j:j}})
      next_states.forEach((element)=>{
        exists = false
        this.priorityqueue.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
           this.priorityqueue.enqueue(element , 1);
        }
      })
      console.log( "priority queue : " , this.priorityqueue.items)
      console.log("visited nodes : " ,this.priorityqueue.visited_nodes)
      this.priorityqueue.items.forEach((element)=>{
        element = this.priorityqueue.rear();
        exists = false
        this.priorityqueue.visited_nodes.forEach((node)=>{
          if(this.is_Equal(element.position , node.position)){
            exists = true
            return ;
          }
        })
        if(exists == false){
         this.UCS(element.element.position.i , element.element.position.j);
        }
      })
    }
  }


  move(row, col) {
    this.array[this.n][this.m] = this.array[row][col];
    this.array[row][col] = this.castle;
    this.newprint(this.array);
    this.n = row;
    this.m = col;
    setTimeout(() => this.check_land(row, col), 500);
    this.BFS(this.n, this.m);
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
    let parent_equal = false;
    let done = 0;
    row = parseInt(row);
    while (this.array[row + 1][col] != 2) {
      this.array[row][col] = this.array[row + 1][col];
      this.array[row + 1][col] = this.castle;
      this.n = row + 1;
      this.m = col;
      row++;
      if (this.isEnd(row + 1, col) == true) {
        done++;
        break;
      }
    }
    if (done == 0) {
      this.newBFS(this.n, this.m);
    }
  }

  isEnd(i, j) {
    let costs = 0;
    if (this.array[i][j] == this.king) {
      return true;
    }
    return false;
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
    return this.get_next_states(move.getcoor());
  }

  get_next_states(coordinates) {
    const list = new Array();
    coordinates.forEach((element) => {
      let state = {
        position : element['position'] ,
        path : element['path']
      };
      list.push(state);
    });
    this.state.store_state(list);
    return this.state.get_all_state();
  }

  print_states(array) {
    //  console.log(array);
  }

  is_Equal(state1, state2) {
    return JSON.stringify(state1) === JSON.stringify(state2);
  }
}
class Queue {
  constructor() {
    this.visited_nodes = [];
    this.elements = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  get length() {
    return this.tail - this.head;
  }

  get isEmpty() {
    return this.length === 0;
  }
}


class Stack {
  
  constructor()
  {
    this.visited_nodes = [];
    this.items = [];
  }

  push(element){
  this.items.push(element);
  }

  pop(){
    if (this.items.length == 0)
    return "Underflow";
    return this.items.pop();
  }

  isEmpty(){
    return this.items.length == 0;
  }
 
}

class QElement {
  constructor(element, priority)
  {
      this.element = element;
      this.priority = priority;
  }
}

class PriorityQueue {

  constructor()
  {
    this.visited_nodes = [];  
    this.items = [];
  }

  enqueue(element, priority){
      var qElement = new QElement(element, priority);
      var contain = false;
   
      for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].priority > qElement.priority) {
              this.items.splice(i, 0, qElement);
              contain = true;
              break;
          }
      }
   
      if (!contain) {
          this.items.push(qElement);
      }
  }
  
  dequeue(){
    if (this.isEmpty())
        return "Underflow";
    return this.items.shift();
  }

  rear(){
    if (this.isEmpty())
    return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  front(){
    if (this.isEmpty())
    return "No elements in Queue";
    return this.items[0];
  }

  isEmpty(){
    return this.items.length == 0;
  }
}








document.getElementById("start").addEventListener("click", () => {
  const game = new Game();
  game.print();
});
document.getElementById("BFS").addEventListener("click", () => {
  const game = new Game();
  game.start_time = performance.now();
  game.BFS(1,1);
});
document.getElementById("UCS").addEventListener("click", () => {
  const game = new Game();
  game.start_time = performance.now();
  game.UCS(1,1);
});
document.getElementById("DFS").addEventListener("click", () => {
  const game = new Game();
  game.start_time = performance.now();
  game.DFS(1,1);
});

