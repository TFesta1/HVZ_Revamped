import { User, InfoEvent } from '../../../types';
import initializeNitroApp from '../../index';
import { ref } from 'vue';

export default defineEventHandler(async (event) => {
    // Initialize Nitro App
    const module = await initializeNitroApp();
    const { connect, collection } = module;
  
    // Retrieve the additional parameters from the event object
    const { email, header, content, operation } = getQuery(event);
    const givenEmail = ref("")
    const headerV = ref()
    const contentV = ref()
    const op = ref()

    givenEmail.value = email?.toString() || ""
    headerV.value = header?.toString() || ""
    contentV.value = content?.toString() || ""
    op.value = operation?.toString() || ""
    
    // newV.value = newValue
    // Connect to the database
    const db = await connect();
    const col = await collection(process.env.USER_COLNAME!);
    const items = await col.find().toArray();
  
    // Find the user with the specified email
    // const user = await col.findOne({ givenEmail });

    console.log(givenEmail.value, "givenEmail.value")
    console.log(headerV.value, "headerV.value")
    console.log(contentV.value, "contentV.value")
    console.log(op.value, "op.value")

    // Change the old parameter value with the new one
    // const matchingUser = await col.findOne({ email: { $eq: givenEmail.value } });
    // console.log(matchingUser, "matchingUser")
    // return {
    //     data: matchingUser // or an appropriate response if the user was not found
    //   };

  
    // Update the specified parameter of the user
    const userWithEmail = await col.findOne({ email: givenEmail.value });

    if (userWithEmail == null) {
        return {
            data: "User with given email does not exist"
        }
    }

    const curInfos = userWithEmail.infoEvents as InfoEvent[]
    const infoEvent = {
        header: headerV.value,
        content: contentV.value,
        isShown: false
    } as InfoEvent

    if (op.value === "add") {
        curInfos.push(infoEvent)
    }
    // else if (op.value === "remove") {
    //     const index = curInfos.findIndex((info) => info.id === newV.value.id)
    //     curInfos.splice(index, 1)
    // }
    // else if (op.value === "update") {
    //     const index = curInfos.findIndex((info) => info.id === newV.value.id)
    //     curInfos[index] = newV.value
    // }
    else {
        return {
            data: "Operation not supported"
        }
    }


    const result = await col.updateOne(
        { email: givenEmail.value },
        { $set: { infoEvents: curInfos } }
    );


    if (result.modifiedCount === 1) {
        // User updated successfully
        const updatedUser = await col.findOne({ email });
        return {
            data: updatedUser,
        };
    }
    else {
        return {
            data: result.upsertedId//`result.modifiedCount ${result.modifiedCount} givenEmail.value ${givenEmail.value} param.value ${param.value} newV.value ${newV.value} didnt modify`, // or an appropriate response if the user was not found
        };
    }
  
    // return {
    //   data: null, // or an appropriate response if the user was not found
    // };
  });
  