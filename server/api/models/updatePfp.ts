import { User } from '../../../types';
import initializeNitroApp from '../../index';
import { ref } from 'vue';

// NOTE: This HAS to be a post since "GET" requests can't handle the amount of data
export default defineEventHandler(async (event) => {
    // Initialize Nitro App
    const module = await initializeNitroApp();
    const { connect, collection } = module;
  
    // Retrieve the additional parameters from the event object
    const body = await readBody(event);
    const { email, parameterToUpdate, newValue } = body;
    const givenEmail = ref("")
    const param = ref() 
    const newV = ref()

    param.value = parameterToUpdate?.toString() || ""
    givenEmail.value = email?.toString() || ""

  
    newV.value = newValue
  
    // Connect to the database
    const db = await connect();
    const col = await collection(process.env.USER_COLNAME!);
  
    // Find the user with the specified email
    // const user = await col.findOne({ givenEmail });

    console.log(givenEmail.value, "givenEmail.value")
    console.log(param.value, "param.value")
    // console.log(newV.value, "newV.value")

    // Change the old parameter value with the new one
    // const matchingUser = await col.findOne({ email: { $eq: givenEmail.value } });
    // console.log(matchingUser, "matchingUser")
    // return {
    //     data: matchingUser // or an appropriate response if the user was not found
    //   };

  
    // Update the specified parameter of the user
    const result = await col.updateOne(
        { email: givenEmail.value },
        { $set: { [param.value]: newV.value } }
    );
      

    if (result.modifiedCount === 1) {
        // User updated successfully
        const updatedUser = await col.findOne({ email });
        return {
            data: updatedUser,
        };
    } 
  
    return {
      data: null, // or an appropriate response if the user was not found
    };
  });
  