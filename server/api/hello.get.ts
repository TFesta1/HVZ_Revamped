// import * as ourDB from "../index";


const port = process.env.PORT || 3000;



export default defineEventHandler(async (event) => {
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