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
    // Destructure the props to access them
    const { headers, data, displayAdminTable, isAdmin } = props;
    const dataVal = ref(data)
    const zombieHumanOzSave = ref([] as number[])

    // If zombieHumanOz exists, save it and remove it from the data
    // if ((dataVal.value[0] as User).zombieHumanOz != undefined)
    // {
    //     zombieHumanOzSave.value = (dataVal.value[0] as User).zombieHumanOz
    //     dataVal.value = dataVal.value.map((item: any) => {
    //         delete item.zombieHumanOz
    //         return item  
    //     })
    // }
    
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
                <th class="px-4 py-2" v-for="header in headers">{{ header }}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, itemIndex) in dataVal">
                    <td v-for="(data, index) in item" class="border px-4 py-2" :class="{'green-background': !displayAdminTable && zombieHumanOzSave[itemIndex] === 0, 'red-background': !displayAdminTable && (zombieHumanOzSave[itemIndex] === 1 || (zombieHumanOzSave[itemIndex] === 2 && !isAdmin)), 'pink-background': !displayAdminTable && isAdmin && zombieHumanOzSave[itemIndex] === 2}">
                        
                        <!-- {{ itemIndex }} -->
                        <!--  && displayAdminTable && isAdmin" -->
                        <div v-if="index == 'photo'">
                            <img :src="data" class="profile-pictures" />
                            <!-- {{ index }} -->
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