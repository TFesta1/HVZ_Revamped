// import * as ourDB from "../index";

import initializeNitroApp from '../index';

// Use the exported functions
// const { connect, ObjectId, DB_Name } = initializeNitroApp();


const port = process.env.PORT || 3000;




export default defineEventHandler(async (event) => {
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;

  connect().then((db) => {
    console.log("Connected to MongoDB")
        // _nitroApp.set('db', db);
    }).catch((err) => {
        console.log(err);
  })

  // // console.log(event)
  // const col = await ourDB.collection(COL_PRDATA);
  // console.log(col);
  // const count = await col.countDocuments();
  // console.log(`Number of documents in collection: ${count}`);
  // const items = await col.find().toArray();
  // return items;
  return {
    ourDB: port
  }
})