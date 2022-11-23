export class State{
  
  constructor( states = []){
    this.states = states ;
  }

  store_state(list){
    this.states = list
  }

  get_all_state(){
    return this.states;
  }
  
}