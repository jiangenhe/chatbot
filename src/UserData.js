import queryString from 'query-string'
import shortid from 'shortid'
export const SESSION_ID = "SESSION_ID";
export const BOT_CODE = "BOT_CODE";
export const RID = "RID"
export const STEP_NUM = "STEP_NUM"
export const USER_NAME = "USER_NAME";
export const STUDY_ID = "STUDY_ID"

export const STUDY_BEGIN = "STUDY_BEGIN";
export const STUDY_END = "STUDY_END";
export const INTENT_NAME = "INTENT_NAME";
export const USER_INPUT = "USER_INPUT";

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
} else {
  instance.set(BOT_CODE, 'BL')
}

if (RID in parsed) {
  instance.set(RID, parsed[RID])
}

instance.set(STUDY_ID, shortid.generate())
instance.set(STEP_NUM, 0)

const WEB_SERVER = 'http://ec2-13-58-157-255.us-east-2.compute.amazonaws.com:3000/users'

export const postStep = (data) => {
  return
  // Default options are marked with *
  instance.set(STEP_NUM, instance.get(STEP_NUM) + 1)
  let postData = data;
  postData.StudyId = instance.get(STUDY_ID);
  postData.StepNum = instance.get(STEP_NUM);
  postData.RId = instance.get(RID);
  postData.StudyGroup = instance.get(BOT_CODE);
  return fetch(WEB_SERVER, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({data_id: 'Steps', data: postData}), // body data type must match "Content-Type" header
  })
    .then(response => {
      return response.json()
    })
    .catch(error => console.log(error));
}

postStep({StepType: STUDY_BEGIN})

export default instance;
