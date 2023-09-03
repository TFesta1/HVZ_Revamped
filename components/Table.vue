<script setup lang="ts">
    import axios from 'axios'
    import { RequestingUser, User } from '../types'
    const props = defineProps({
        headers: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        coorespondingEmails : {
            type: Array,
            required: false,
            default: [],
        },
        displayAdminTable: {
            type: Boolean,
            required: false,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false,
        }
    });

    async function deletePerson(email : string)
    {
        console.log(email, "email")
        // console.log(coorespondingEmailsV.value, "emails")
        // console.log("hi")
        // return
        const removedIndexes = [] as number[];
        coorespondingEmailsV.value = coorespondingEmailsV.value.filter((item, index) => {
            if (item === email) {
                    removedIndexes.push(index);
                    return false;
                }
                return true;
        });

        dataVal.value = dataVal.value.filter((item, index) => {
            return !removedIndexes.includes(index);
        });

        zombieHumanOzSave.value = zombieHumanOzSave.value.filter((item, index) => {
            return !removedIndexes.includes(index);
        });

        console.log(coorespondingEmailsV.value, "emails After")


        // const foundUserTags = (responseWeeklong.data.data as User).tags + tags;

        const response = await axios.get('../api/models/updateUser', {
            params: {
                email: (email as any).email,
                parameterToUpdate: "isInWeeklong",
                newValue: false,
                parameterType: "boolean"
            },
        });

        // console.log(response, "response")
    }

    async function addSubTags(email : string, dir : boolean)
    {
        // Here we either add or subtract a tag depending on dir (direction)
        let tags = 0
        if(dir) {
            tags = 1
        }
        else {
            tags = -1
        }

        let coorespondingInd: number = 0;
        coorespondingEmailsV.value.forEach((item, index) => {
            if (item === email) {
                coorespondingInd = index;
                return item;
            }
        });

        // dataVal.value[coorespondingInd] contains one User, so we access tags
        // Then we add a tag to it
        (dataVal.value[coorespondingInd] as User).tags = ((dataVal.value[coorespondingInd] as User).tags as number) + tags

        // Below is actually updating it in the DB
        const responseWeeklong = await axios.get('../api/models/user', {
            params: {
                email: (email as any).email //Weird... but it works. I thought email was of string type and not an object??
            },
        });

        const foundUserTags = (responseWeeklong.data.data as User).tags + tags;

        await axios.get('../api/models/updateUser', {
            params: {
                email: (email as any).email,
                parameterToUpdate: "tags",
                newValue: foundUserTags,
                parameterType: "number"
            },
        });




    }

    async function addSubDays(email : string, dir : boolean)
    {
        let days = 0
        if (dir) {
            days = 1
        }
        else {
            days = -1
        }

        let coorespondingInd: number = 0;
        coorespondingEmailsV.value.forEach((item, index) => {
            if (item === email) {
                coorespondingInd = index;
                return item;
            }
        });
        // dataVal.value[coorespondingInd] contains one User, so we access daysSurvived
        // Then we add a day to it
        (dataVal.value[coorespondingInd] as User).daysSurvived = ((dataVal.value[coorespondingInd] as User).daysSurvived as number) + days
        const responseWeeklong = await axios.get('../api/models/user', {
            params: {
                email: (email as any).email //Weird... but it works. I thought email was of string type and not an object??
            },
        });

        const foundUserDays = (responseWeeklong.data.data as User).daysSurvived + days;

        await axios.get('../api/models/updateUser', {
            params: {
                email: (email as any).email,
                parameterToUpdate: "daysSurvived",
                newValue: foundUserDays,
                parameterType: "number"
            },
        });
    
    }

    async function humanZombieOz(email: string, teamSpec: number) {
        let coorespondingInd: number = 0;
        coorespondingEmailsV.value.forEach((item, index) => {
            if (item === email) {
                coorespondingInd = index;
                return item;
            }
        });

        // dataVal.value[coorespondingInd] contains one User, so we access zombieHumanOz
        // 0 = human, 1 = zombie, 2 = oz
        zombieHumanOzSave.value[coorespondingInd] = teamSpec

        // Below is actually updating it in the DB
        await axios.get('../api/models/updateUser', {
            params: {
                email: (email as any).email,
                parameterToUpdate: "zombieHumanOz",
                newValue: teamSpec,
                parameterType: "number"
            },
        });

    }

    async function modAndDemod(email: string, modOrDemod: boolean) {
        let coorespondingInd: number = 0;
        coorespondingEmailsV.value.forEach((item, index) => {
            if (item === email) {
                coorespondingInd = index;
                return item;
            }
        });

        // dataVal.value[coorespondingInd] contains one User, so we access isMod

        (dataVal.value[coorespondingInd] as any).mod = modOrDemod
        // console.log(dataVal.value[coorespondingInd], "dataVal.value[coorespondingInd]")

        await axios.get('../api/models/updateUser', {
            params: {
                email: (email as any).email,
                parameterToUpdate: "isMod",
                newValue: modOrDemod,
                parameterType: "boolean"
            },
        });


    }
    
    // Destructure the props to access them
    const { headers, data, coorespondingEmails, displayAdminTable, isAdmin } = props;
    const dataVal = ref(data)
    const coorespondingEmailsV = ref(coorespondingEmails as string[])
    const zombieHumanOzSave = ref([] as number[])
    
    // Save the zombieHumanOz values and remove them from the data
    zombieHumanOzSave.value = dataVal.value.map((item: any) => {
        return item.zombieHumanOz
    })
    dataVal.value = dataVal.value.map((item: any) => {
        delete item.zombieHumanOz
        return item  
    })


    // console.log(dataVal.value, "dataVal")
    // console.log(zombieHumanOzSave.value, "zombieHumanOzSave")




    if (displayAdminTable && isAdmin)
    {
        headers.push("Allow")
        headers.push("Deny")
    }
    // refreshNuxtData("users")
    // console.log(headers)

    async function allow(d: RequestingUser) {
        const email = d.email
        console.log("allow data ", email)
        // console.log(data, " before")
        // console.log(data, " after")
        dataVal.value = dataVal.value.filter((item: any) => item.email != email)

        // return 
        try {
            const responseWeeklong = await axios.get('../api/models/updateUser', {
                params: {
                    email: email,
                    parameterToUpdate: "isInWeeklong",
                    newValue: true,
                    parameterType: "boolean"
                },
            });

            const responseReq = await axios.get('../api/models/updateUser', {
                params: {
                    email: email,
                    parameterToUpdate: "requestingWeeklong",
                    newValue: false,
                    parameterType: "boolean"
                },
            });

        } catch (error) {
            console.error(error);
            dataVal.value = data
        }
    }

    async function deny(d: RequestingUser) {
        const email = d.email
        console.log("deny data ", email)
        dataVal.value = dataVal.value.filter((item: any) => item.email != email)

        
        try {
            const responseWeeklong = await axios.get('../api/models/updateUser', {
                params: {
                    email: email,
                    parameterToUpdate: "isInWeeklong",
                    newValue: false,
                    parameterType: "boolean"
                },
            });

            const responseReq = await axios.get('../api/models/updateUser', {
                params: {
                    email: email,
                    parameterToUpdate: "requestingWeeklong",
                    newValue: false,
                    parameterType: "boolean"
                },
            });


        } catch (error) {
            console.error(error);
            dataVal.value = data
        }
    }

</script>

<template>
    <div class="overflow-x-auto">
        <table class="table-auto w-full">
            <thead>
            <tr>
                <th class="px-4 py-2 whiteBold" v-for="header in headers">{{ header }}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in dataVal">
                    <td v-for="(data, index) in item" class="border px-4 py-2" :class="{'green-background': !displayAdminTable && (zombieHumanOzSave[itemIndex] === 0) || (zombieHumanOzSave[itemIndex] === 2 && !isAdmin), 'red-background': !displayAdminTable && zombieHumanOzSave[itemIndex] === 1, 'pink-background': !displayAdminTable && isAdmin && zombieHumanOzSave[itemIndex] === 2}">
                        
                        <!-- {{ itemIndex }} -->
                        <!--  && displayAdminTable && isAdmin" -->
                        <div v-if="index == 'photo'">
                            <img :src="data" class="profile-pictures" />
                            <div v-if="!displayAdminTable && stateAdmin()">
                                <button class="sleakAdminButton bg-red-500 text-white" @click="deletePerson(coorespondingEmailsV[itemIndex])">Delete</button>
                                <button class="sleakAdminButton bg-blue-500 text-white" @click="addSubTags(coorespondingEmailsV[itemIndex], true)">Tags++</button>
                                <button class="sleakAdminButton bg-blue-500 text-white" @click="addSubTags(coorespondingEmailsV[itemIndex], false)">Tags--</button>
                                <button class="sleakAdminButton bg-green-500 text-white" @click="addSubDays(coorespondingEmailsV[itemIndex], true)">Days++</button>
                                <button class="sleakAdminButton bg-green-500 text-white" @click="addSubDays(coorespondingEmailsV[itemIndex], false)">Days--</button>
                                <button class="sleakAdminButton bg-orange-500 text-white" @click="humanZombieOz(coorespondingEmailsV[itemIndex], 0)">Human</button>
                                <button class="sleakAdminButton bg-orange-500 text-white" @click="humanZombieOz(coorespondingEmailsV[itemIndex], 1)">Zombie</button>
                                <button class="sleakAdminButton bg-orange-500 text-white" @click="humanZombieOz(coorespondingEmailsV[itemIndex], 2)">Oz</button>
                                <button class="sleakAdminButton bg-purple-500 text-white" @click="modAndDemod(coorespondingEmailsV[itemIndex], true)">Mod</button>
                                <button class="sleakAdminButton bg-purple-500 text-white" @click="modAndDemod(coorespondingEmailsV[itemIndex], false)">DeMod</button>

                                
                            </div>
                            <!-- {{ index }} -->
                        </div>
                        <div v-else-if="index == 'tags'">
                            <!-- hello -->
                            <!-- If they're a human or an OZ, tags are 0 always -->
                            <div v-if="zombieHumanOzSave[itemIndex] === 0 || zombieHumanOzSave[itemIndex] === 2">0</div>
                            <div v-else>{{ data }}</div>
                            <!-- Otherwise show their actual tags -->

                        </div>
                        <div v-else>
                            {{ data }}
                            <!-- {{ index }} -->
                        </div>
                    
                    </td>

                    <!-- Appends two extra data cols for displayAdminTable -->
                    <td v-if="displayAdminTable && isAdmin" class="border px-4 py-2 buttonNoStyling" style="background-color:green" @click="allow(item as RequestingUser)"></td>
                    <td v-if="displayAdminTable && isAdmin" class="border px-4 py-2 buttonNoStyling" style="background-color:rgb(117, 39, 39)" @click="deny(item as RequestingUser)"></td>
                    
                </tr>
                
            
            </tbody>
        </table>

        

    </div>
</template>

<style scoped>

</style>