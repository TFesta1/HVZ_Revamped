<script setup lang="ts">
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
                        {{ data }}
                        <!-- {{ index }} -->
                        <!-- <div v-if="index=='photo' && displayAdminTable && isAdmin" >
                            hi
                        </div> -->
                    
                    </td>
                    <td v-if="displayAdminTable && isAdmin" class="border px-4 py-2 buttonNoStyling" style="background-color:green" >
                           
                           
                    </td>
                    <td v-if="displayAdminTable && isAdmin" class="border px-4 py-2 buttonNoStyling" style="background-color:rgb(117, 39, 39)" >
                           
                           
                    </td>
                    
                </tr>
                
            
            </tbody>
        </table>

        

    </div>
</template>

<style scoped>

</style>