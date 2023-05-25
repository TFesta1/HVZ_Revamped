<script setup lang="ts">
    // Data
    const toggleSwitch = ref(false);
    const inputValue = ref('');

</script>

<template>
    <div class="flex flex-wrap">
        <!-- SO, there can be 6 items on this row (1/6) before going to the next row -->
        <div class="w-full md:w-1/6">
            <h1 class="text-3xl font-bold mb-4">Settings Hub</h1>
            <div class="switch-container flex items-center mb-4">
                <label for="toggle-switch" class="mr-2">Toggle Switch:</label>
                <input id="toggle-switch" type="checkbox" v-model="toggleSwitch" class="form-checkbox" />
            </div>
            <div class="input-container mb-4">
                <label for="input-field" class="mr-2">Input:</label>
                <input id="input-field" type="text" v-model="inputValue" class="form-input text-black" />
            </div>
        </div>

        <div class="w-full md:w-1/6">
            <h1 class="text-3xl font-bold mb-4">Settings Hub</h1>
            <div class="switch-container flex items-center mb-4">
                <label for="toggle-switch" class="mr-2">Toggle Switch:</label>
                <input id="toggle-switch" type="checkbox" v-model="toggleSwitch" class="form-checkbox" />
            </div>
            <div class="input-container mb-4">
                <label for="input-field" class="mr-2">Input:</label>
                <input id="input-field" type="text" v-model="inputValue" class="form-input text-black" />
            </div>
        </div>
    </div>
</template>



<style scoped>

</style>