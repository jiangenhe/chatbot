import queryString from 'query-string'

export const SESSION_ID = "SESSION_ID";
export const BOT_CODE = "BOT_CODE";
export const USER_NAME = "USER_NAME";

class UserData {
  constructor(){
    this._data = {};
  }

  set(key, value){
    this._data[key] = value
  }

  get(key){
    return this._data[key]
  }
}

const instance = new UserData();
Object.freeze(instance);
const parsed = queryString.parse(window.location.search)
if (BOT_CODE in parsed){
  instance.set(BOT_CODE, parsed[BOT_CODE])
}

export default instance;