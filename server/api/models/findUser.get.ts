import initializeNitroApp from '../../index';
import { ref } from 'vue';

export default defineEventHandler(async (event) => {
  
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;
  const givenEmail = ref("")

  // Retrieve the additional parameters from the event object
  const { email } = getQuery(event);
  givenEmail.value = email?.toString() || ""
  console.log(givenEmail.value, "givenEmail.value")

  const db = await connect();

  const col = await collection(process.env.USER_COLNAME!);
  const items = await col.find().toArray();

  return {
    data: await col.findOne({ email: { $eq: givenEmail.value } })
  }
  
})