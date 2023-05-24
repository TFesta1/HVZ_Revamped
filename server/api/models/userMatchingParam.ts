// Return a user with a matching secret key

import { User } from '../../../types';
import initializeNitroApp from '../../index';
import { ref } from 'vue';

export default defineEventHandler(async (event) => {
    // Initialize Nitro App
    const module = await initializeNitroApp();
    const { connect, collection } = module;
  
    // Retrieve the additional parameters from the event object
    const { email, parameterToFind, paramValue, parameterType } = getQuery(event);
    const givenEmail = ref("")
    const pType = ref("")
    const param = ref("") 
    const paramV = ref()

    param.value = parameterToFind?.toString() || ""
    pType.value = parameterType?.toString() || ""
    givenEmail.value = email?.toString() || ""

    // Connect to the database
    const col = await collection(process.env.USER_COLNAME!);

    if (pType.value === "number") {
        paramV.value = parseInt(paramValue?.toString() || "")
    }
    else if (pType.value === "string") {
        paramV.value = paramValue?.toString() || ""
    }
    else if (pType.value === "boolean") {
        paramV.value = paramValue?.toString() === "true" ? true : false
    }
    else {
        paramV.value = paramValue?.toString() || ""
    }

    console.log(param.value, "param.value")
    console.log(givenEmail.value, "givenEmail.value")
    console.log(paramV.value, "paramV.value")
  
    // Update the specified parameter of the user
    const userWithEmail = await col.findOne({ email: givenEmail.value });
    const userWithParamValue = await col.findOne({ [param.value]: paramV.value });

    if (userWithEmail == null) {
        return {
            data: "User with given email does not exist"
        }
    }

    if (userWithParamValue == null) {
        const msg = `User with given parameter value does not exist`
        console.log(msg)
        return {
            data: msg
        }
    }

    // If the logged in user enters a secret key with an object that matches their own >:( 
    if (userWithEmail && userWithParamValue && JSON.stringify(userWithEmail) === JSON.stringify(userWithParamValue))
    {
        const msg = `Can't enter your own value here!`
        console.log(msg)
        return {
            data: msg
        }
    }

    // Secret key logic
    if (param.value === "secretKey") {
        // The user is in the weeklong and person requesting is a human
        if (userWithParamValue.isInWeeklong == true && (userWithEmail.zombieHumanOz == 1 || userWithEmail.zombieHumanOz == 2) && userWithParamValue.zombieHumanOz == 0) {
            const query = { [param.value]: paramV.value, zombieHumanOz: 0 };
            const update = { $set: { zombieHumanOz: 1 } };
            const result = await col.findOneAndUpdate(query, update, { returnDocument: 'after' });

            const updatedUser = await col.findOneAndUpdate(
                { email: givenEmail.value },
                { $set: { tagCount: userWithEmail.tagCount+1 } },
                { returnDocument: 'after' }
            );

            if (result && result.value) 
            {
                const tagCount = (userWithEmail.tagCount as number) + 1

                // Updated tags
                await col.findOneAndUpdate(
                    { email: givenEmail.value },
                    { $set: { tags: tagCount } },
                    { returnDocument: 'after' }
                );
                let nicknameTaggedBy = "OZ" // Default value for if the tagger is an OZ
                // Update taggedBy for the person tagged only IF the TAGGER isn't an OZ
                if (userWithEmail.zombieHumanOz == 1)
                {
                    nicknameTaggedBy = userWithEmail.nickname
                }

                    
                await col.findOneAndUpdate(
                    { secretKey: paramV.value },
                    { $set: { taggedBy: nicknameTaggedBy } },
                    { returnDocument: 'after' }
                );


                
                // The update was successful and the updated document is available in `result.value`
                console.log('Made zombie & updated tagCount');

                
                console.log('Updated tagCount');
                return {
                    data: "verified"
                }
                
                
            } 
        }
        
        else 
        {
            if (userWithParamValue.isInWeeklong == false)
                console.log('Requested user is not in weeklong');
            if (userWithEmail.zombieHumanOz == 0)
                console.log('This User is a human')
            if (userWithParamValue.zombieHumanOz != 0)
                console.log('Requested user is not a human')
            
        }

    }
    
    return {
        data: "null"//`result.modifiedCount ${result.modifiedCount} givenEmail.value ${givenEmail.value} param.value ${param.value} paramV.value ${paramV.value} didnt modify`, // or an appropriate response if the user was not found
    };
  });
  