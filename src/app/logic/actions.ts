export class RoundAction {
  private _args: any[];
  private _result: any;

  constructor() {
  	this.prev = cb.prev;
    this.next = (x, ...args) => {
    	this.args = args;
      this.result = cb.next(x, ...args); 
    	return this.result;
    };
  	this.result = null;
  }

  prev = () => null;
  next = () => null;
}

export const actions = {
	chooseTokens: new RoundAction({ prev: x => null, next: x => null }),
  putToken: new RoundAction({ prev: x => null, next: x => null }),
  moveToken: new RoundAction({ prev: x => null, next: x => null }),
  finalizene: RoundAction({ prev: x => null, next: x => null })
};