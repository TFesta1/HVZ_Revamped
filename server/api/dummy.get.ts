// import * as ourDB from "../index";

import initializeNitroApp from '../index';

// Use the exported functions
// const { connect, ObjectId, DB_Name } = initializeNitroApp();


const port = process.env.PORT || 3000;


// NOTE, double check that a username isn't already in the DB before inserting
const fakeData = [{
     "nickname": "Kenter",
     "username": "Reyna",
     "email": "",
     "photo": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
     "isMod": true,
     "isInWeeklong": true,
     "taggedBy": "Kyle",
     "isAdmin": false,
     "zombieHumanOz": 0, // 0 = human, 1 = zombie, 2 = oz
     "tags": 0,
     "team": "Screw the panda team",
     "coins": 0,
     "daysSurvived": 2,
     "secretKey": "abc123",
     "requestingWeeklong": false
},
{
     "nickname": "Kyle",
     "username": "Panda",
     "email": "",
     "photo": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
     "isMod": false,
     "isInWeeklong": true,
     "taggedBy": "Kenter",
     "isAdmin": true,
     "zombieHumanOz": 1, // 0 = human, 1 = zombie, 2 = oz
     "tags": 3,
     "team": "Panda Team",
     "coins": 100,
     "daysSurvived": 3,
     "secretKey": "45mad",
     "requestingWeeklong": false
},
{
     "nickname": "Jenny",
     "username": "DefinitelyNotOZ",
     "email": "",
     "photo": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
     "isMod": false,
     "isInWeeklong": false,
     "taggedBy": "",
     "isAdmin": false,
     "zombieHumanOz": 2, // 0 = human, 1 = zombie, 2 = oz
     "tags": 0,
     "team": "Panda Team",
     "coins": 0,
     "daysSurvived": 1,
     "secretKey": "",
     "requestingWeeklong": false
}]




export default defineEventHandler(async (event, page = 1, pageSize = 30) => {
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;

  const db = await connect();


  const col = await collection(process.env.USER_COLNAME!);
  col.insertMany(fakeData);
  const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();







  // // console.log(event)
  // const col = await ourDB.collection(COL_PRDATA);
  // console.log(col);
  // const count = await col.countDocuments();
  // console.log(`Number of documents in collection: ${count}`);
  // const items = await col.find().toArray();
  // return items;
  return {
    data: items
  }
})