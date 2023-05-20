import { User } from '../../../types';
import initializeNitroApp from '../../index';
import { ref } from 'vue';

export default defineEventHandler(async (event) => {
    // Initialize Nitro App
    const module = await initializeNitroApp();
    const { connect, collection } = module;
  
    // Retrieve the additional parameters from the event object
    const { email } = getQuery(event);
    const givenEmail = ref("")

    givenEmail.value = email?.toString() || ""
  
    // Connect to the database
    const db = await connect();
    const col = await collection(process.env.USER_COLNAME!);
  
    // Find the user with the specified email
    const user: User | null = await col.findOne<User>({ email: givenEmail.value });

    return {
        data: user
    }
    
  });
  