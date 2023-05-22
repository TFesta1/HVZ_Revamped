<script setup lang="ts">
    import axios from 'axios'
    import { RequestingUser } from '../types'
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

    if (displayAdminTable && isAdmin)
    {
        headers.push("Allow")
        headers.push("Deny")
    }
    // refreshNuxtData("users")
    // console.log(headers)

    async function allow(data: RequestingUser) {
        const email = data.email
        console.log("allow data ", email)
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

            // console.log(responseWeeklong.data)
            // console.log(responseReq.data)


        } catch (error) {
            console.error(error);
        }
    }

    async function deny(data: RequestingUser) {
        console.log("deny data ", data.email)
        // try {
        //     const response = await axios.get('api/models/updateUser', {
        //         params: {
        //             email: await useSupabaseUser().value?.email,
        //             parameterToUpdate: "inWeeklong",
        //             newValue: true,
        //             parameterType: "boolean"
        //         },
        //     });
        //     const item = response.data;
        //     // user.value = item;
        //     console.log(item);
        //     // isNotRequesting.value = false;

        // } catch (error) {
        //     console.error(error);
        // }
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
                <tr v-for="item in data">
                    <td v-for="(data, index) in item" class="border px-4 py-2">
                        
                        <!-- {{ index }} -->
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