export class State{
  states;
  constructor(){}

  store_state(list){
    this.states = list
  }

  get_all_state(){
    return this.states;
  }

}