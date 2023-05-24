<script setup lang="ts">
    import axios from 'axios'
    import { RequestingUser, User } from '../types'

    const inputValue = ref(''); // Input value

    const handleSubmit = async () => {
      // Call your function with the entered value
      console.log(inputValue.value);
      // Clear the input value if needed
      inputValue.value = '';
    };

</script>

<template>
    <div>
        <div class="w-full max-w-xs">
        <input
            type="text"
            class="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full text-black"
            placeholder="Enter text"
            v-model="inputValue"
        >
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" @click="handleSubmit">Submit</button>
  </div>

    </div>
</template>

<style scoped>

</style>