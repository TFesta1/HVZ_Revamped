<script setup lang="ts">
    import axios from 'axios'
    import { RequestingUser, User } from '../types'
    
    const yourSecretKey = ref(''); // Const
    const secretKey = ref(''); // Input value
    const errorMessage = ref(''); // Error message

    const handleSubmit = async () => {
        console.log(secretKey.value, "secretKey")
        try {
            const response = await axios.get('api/models/userMatchingParam', {
                params: {
                    email: await useSupabaseUser().value?.email,
                    parameterToFind: "secretKey",
                    paramValue: secretKey.value,
                    parameterType: "string"
                },
            });
            const item = response.data.data;
            // console.log(item, "item")
            if (item == 'verified')
            {
                reloadTable().value = true
            }
            } catch (error) {
                console.error(error);
            }

      

        // Reset the input value
        secretKey.value = '';
    };

    onMounted(async () => {
        const response = await axios.get('/api/models/user', {
            params: {
                email: await useSupabaseUser().value?.email,
            },
        });
        const items: User = response.data.data;
        yourSecretKey.value = items.secretKey
        // console.log(items, "items")
    });

</script>

<template>
    <div>
        <div class="w-full max-w-xs">
            <p>
                Your Secret Key:
                <span class="text-green-500">
                    {{ yourSecretKey }}
                </span>
            </p>
            <input
                type="text"
                class="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full text-black"
                placeholder="Enter Another Person's Secret Key"
                v-model="secretKey"
            >
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" @click="handleSubmit">Submit</button>
            <div v-if="errorMessage">
                <div class="bg-red-200 bg-opacity-75 text-red-800 p-1 rounded-lg">{{ errorMessage }}
            </div>
        </div>
  </div>

    </div>
</template>

<style scoped>

</style>