const ROW = 10;
const COL = 16;
const parentElement = document.querySelector('body');
let array = 
         [
            [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1], 
            [1 , 8 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1],
            [2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 1 , 2 , 2 , 2],
            [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 2 , 1 , 2 , 1 , 1],  
            [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1], 
            [2 , 2 , 1 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2],
            [1 , 2 , 1 , 2 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1],  
            [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1],
            [2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 1 , 2 , 2 , 2 , 2 , 2 , 2],
            [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 2 , 0 , 2 , 1 , 1 , 1 , 1 , 1],
         ]  

let castle = array[1][1];
let king = array[9][9];    

let n = 1;
let m = 1;

function checkinputs(row , col){
     if(row==n&&col==col){
         move(row , col)
     }
     else if(row==row&&col==m){
         let n1 = n ;
         let row1 = row;
         let m1 = m;
         if(row > n){
         if(array[n+1][m] != 2)
         move(row , col);
         }
         else{
         if(array[n1-1][m1] != 2) {
         let count = 0;
         for(n1 ; n1 >= row1 ; n1--){
             if(array[n1][col] == 2)
             count++;
         }
         if(count == 0)
         move(row , col);
         }
         }
     }
}
 function move(row , col){
     isEnd(row , col);
     array[n][m] = array[row][col];
     array[row][col] = castle;
     newprint(array);
     n = row ;
     m = col ;
    setTimeout(()=>check_land(row , col) , 500); 
 }
 function check_land(row , col){
     row = parseInt(row)
     while(array[row+1][col] != 2){   
        isEnd(row+1 , col);               // isEnd(b+1 , a);
        array[row][col] = array[row+1][col];
        array[row+1][col] = castle
        n = row+1 ;
        m = col ;
        newprint(array);
        row++; 
 }
}
function newprint(M){
    let l = 1;
     for(let i = 0 ; i < ROW ; i++){
         for(let j = 0; j < COL; j++){
         let element = document.getElementById(l)
         element.value = (M[i][j]);	
          l++;
       }
    }
    changecolor(M);
}


let k = 1
function print(array){
for(let i = 0 ; i < ROW ; i++){
    let count = 0;
    for(let j = 0 ; j < COL ; j++){
        count++;
        const button = document.createElement("button");
        const br = document.createElement('br');
        button.setAttribute('value' , array[i][j] );
        button.setAttribute('type' , 'submit');
        button.setAttribute('id' , k);
        k++
        button.addEventListener('click' , () => checkinputs(i , j) , false) ; 
        parentElement.appendChild(button);
      
        if(array[i][j]==2){
            button.setAttribute('class' , 'land');
        }
        if(array[i][j]==8){
            button.setAttribute('class' , 'castle'); 
        }
        if(array[i][j]==0){
            button.setAttribute('class' , 'king');
        }
        if(array[i][j]==1) {
            button.setAttribute('class' , 'stone');
        }
        if(count == 16)
        parentElement.appendChild(br); 
      
    }
}
}
print(array);

function changecolor(M){
    let h = 1;
    for(let i = 0 ; i < ROW ; i++){
        for(let j = 0; j < COL; j++){
        let element = document.getElementById(h)
        if(element.value == 8){
          element.style.backgroundColor = "blue";
        }
        if(element.value == 1){
          element.style.backgroundColor = "rgb(174, 174, 195)";
        }
        if(element.value == 0){
            element.style.backgroundColor = "red";
          }
         h++;
      }
   }
}

function isEnd(i , j){
  if(array[i][j] == king){
    document.write("you win !")
  }
}

//let buttons = document.querySelectorAll('button');
//for(btn of buttons){
//}




 // DOM location when buttons will be added

 
