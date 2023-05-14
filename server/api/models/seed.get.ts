import initializeNitroApp from '../../index';
import { User } from '../../../types';

/*

"nickname": "Jenny",
     "username": "DefinitelyNotOZ",
     "email": "",
     "password": "hashedPassword",
     "photo": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
     "isMod": false,
     "isAdmin": false,
     "zombieHumanOz": 2, // 0 = human, 1 = zombie, 2 = oz
     "tags": 0,
     "team": "Panda Team",
     "isHuman": true,
     "coins": 0,
     "daysSurvived": 1

*/



export default defineEventHandler(async (event) => {
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;

  // Retrieve the additional parameters from the event object
  const { email } = getQuery(event);

  console.log(email)
  return;

  let exampleEmail = "localMotives@gmail.com"

  if (!exampleEmail) {
    return {
        data: "No user added"
    }
  }
  // `hello api name parameter ${name}

  

  const db = await connect();

  const col = await collection(process.env.USER_COLNAME!);
  const items = await col.find().toArray();

  const matchingUser = await col.findOne({ username: { $eq: exampleEmail } });
  if (matchingUser === null) {
    console.log("Will add user")
    const firstPartOfEmail = exampleEmail.split("@")[0]
    console.log(firstPartOfEmail)
    const newUser = {
        nickname: firstPartOfEmail,
        username: firstPartOfEmail,
        email: exampleEmail,
        photo: "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
        isMod: false,
        isInWeeklong: false,
        isAdmin: false,
        zombieHumanOz: 1, // 0 = human, 1 = zombie, 2 = oz
        tags: 0,
        team: "",
        coins: 0,
        daysSurvived: 0
    }
    col.insertOne(newUser)
    return {
        data: newUser
    }
  }


//   let emails = [] as string[];
//   for(let i = 0; i < items.length; i++) {
//     const user = items[i];
//     console.log(items[i])
//     // emails.push(user.);
//   }
  console.log(matchingUser)

  return {
    data: matchingUser
  }
  
})