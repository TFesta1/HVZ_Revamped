import initializeNitroApp from '../../index';
import { User } from '../../../types';

export default defineEventHandler(async (event, page = 1, pageSize = 30) => {
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;

  const db = await connect();

  const col = await collection(process.env.USER_COLNAME!);
  const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
  
  //  For each item, update the user's days++ if they are a human
  for (let i = 0; i < items.length; i++) {
    const userEmail = items[i].email as string
    const survivedDays = (items[i].daysSurvived as number) + 1
    const isInWeeklong = (items[i].isInWeeklong as boolean)
    //Include OZs since they're undercover
    const isHuman : boolean = (items[i].zombieHumanOz as number) == 0 || (items[i].zombieHumanOz as number) == 2
    console.log(userEmail, "userEmail")
    console.log(survivedDays, "survivedDays")
    console.log(isInWeeklong, "isInWeeklong")
    console.log(isHuman, "isHuman")
    if (isHuman && isInWeeklong)
    {
        const updatedUser = await col.findOneAndUpdate(
            { email: userEmail },
            { $set: { daysSurvived: survivedDays } },
            { returnDocument: 'after' }
        );

    }
    // if (user.isHuman) {
    //     const userCol = await collection(process.env.USER_COLNAME!);
    // }
    }

  
  return {
    data: items
  }

  
})