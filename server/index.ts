import { Nitro  } from 'nitropack';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
// _nitroApp : Nitro
export default async function initializeNitroApp() {
    console.log("Nitro")
    // console.log(process.env.VITE_DEFAULT_PFP)
    

    const url = process.env.MONGO_URL ?? "";
    const DB_Name = process.env.MONGO_DB_NAME ?? 'hvz'; 


    // console.log(url);
    // console.log(DB_Name);

    const client = new MongoClient(url);
    // console.log(client)
    async function connect() {
        const db = await client.connect();
        return db.db(DB_Name);
    }
    // console.log(connect())
    
    async function collection(COLLECTION_NAME : string) {
        const db = await connect();
        // console.log(db.collection(COLLECTION_NAME))
        return db.collection(COLLECTION_NAME);
    }
    // connect().then((db) => {
    //     // console.log("Connected to MongoDB")
    //     // _nitroApp.set('db', db);
    // }).catch((err) => {
    //     console.log(err);
    // })
    // console.log(db)

    // module.exports = {
    //     connect, ObjectId, DB_Name
    // }

    return {
        connect, ObjectId, DB_Name, collection
    }

    
}
    