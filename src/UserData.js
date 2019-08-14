class UserData {
  constructor(){
    this._data = [];
  }

  add(item){
    this._data.push(item);
  }

  get(id){
    return this._data.find(d => d.id === id);
  }
}

const instance = new UserData();
Object.freeze(instance);

export const SESSION_ID = "SESSION_ID";
export default instance;