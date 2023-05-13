import initializeNitroApp from '../../index';
import { User } from '../../../types';

export default defineEventHandler(async (event) => {
  const module = await initializeNitroApp();
  // Use the exported functions
  const { connect, ObjectId, DB_Name, collection } = module;

  const db = await connect();



  const col = await collection(process.env.USER_COLNAME!);
  // Delete the whole collection
  col.deleteMany({});
  const items = await col.find().toArray();
  return {
	data: items
  }
  
})