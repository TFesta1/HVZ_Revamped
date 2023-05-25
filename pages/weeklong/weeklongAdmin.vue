<script setup lang="ts">
    import axios from 'axios'
    import { User } from "types"
    const { $setupUser } = useNuxtApp()
    $setupUser()  
    // Data
    const toggleSwitch = ref(false);
    const inputValue = ref('');
    const giCode = ref('')
    const giCodeUsable = ref(true)

    onMounted(async () => {
        const response = await axios.get('../api/models/user', {
            params: {
                email: adminEmail().value
            }
        });
        const items: User = response.data.data;
        giCode.value = items.GICode
        giCodeUsable.value = items.GICodeUsable
        toggleSwitch.value = items.GICodeUsable
        inputValue.value = items.GICode
        // console.log(items, "items")

        // giCode.value = items[0].giCode
        // giCodeUsable.value = items[0].giCodeUsable


    });

    async function applyGISettings()
    {
        console.log("applySettings")
        console.log(toggleSwitch.value)
        console.log(inputValue.value)

        giCode.value = inputValue.value 
        giCodeUsable.value = toggleSwitch.value

        try {
            await axios.get('../api/models/updateUser', {
                params: {
                    email: adminEmail().value,
                    parameterToUpdate: "GICode",
                    newValue: giCode.value,
                    parameterType: "string"
                },
            });

            await axios.get('../api/models/updateUser', {
                params: {
                    email: adminEmail().value,
                    parameterToUpdate: "GICodeUsable",
                    newValue: giCodeUsable.value,
                    parameterType: "boolean"
                },
            });

        } catch (error) {
            console.error(error);
        }



    }

</script>

<template>
    <div class="flex flex-wrap">
        <!-- SO, there can be 6 items on this row (1/6) before going to the next row -->
        <div class="w-full md:w-1/6 border rounded p-4">
            <h1 class="text-3xl font-bold mb-4">GI Weeklong Code</h1>
            <div class="switch-container flex items-center mb-4">
                <label for="toggle-switch" class="mr-2">Toggle Code Usability</label>
                <input id="toggle-switch" type="checkbox" v-model="toggleSwitch" class="form-checkbox" />
            </div>
            <div class="input-container mb-4">
                <label for="input-field" class="mr-2">Input Code:</label>
                <input id="input-field" type="text" v-model="inputValue" class="form-input text-black w-full md:w-auto" />
            </div>
            <div></div>
            <p class="mb-4">
                Current Code: 
                <span :class="{'text-red-500': giCode === '', 'text-green-500': giCode !== ''}">
                    {{ giCode ? giCode : 'N/A' }}
                </span>
            </p>
            <p class="mb-4">
                Code Usable: 
                <span :class="{'text-red-500': giCodeUsable === false, 'text-green-500': giCodeUsable === true}">
                    {{ giCodeUsable ? "Yes" : 'No' }}
                </span>
            </p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="applyGISettings">Apply</button>


        </div>

        <!-- <div class="w-full md:w-1/6">
            <h1 class="text-3xl font-bold mb-4">Settings Hub</h1>
            <div class="switch-container flex items-center mb-4">
                <label for="toggle-switch" class="mr-2">Toggle Switch:</label>
                <input id="toggle-switch" type="checkbox" v-model="toggleSwitch" class="form-checkbox" />
            </div>
            <div class="input-container mb-4">
                <label for="input-field" class="mr-2">Input:</label>
                <input id="input-field" type="text" v-model="inputValue" class="form-input text-black" />
            </div>
        </div> -->
    </div>
</template>



<style scoped>

</style>