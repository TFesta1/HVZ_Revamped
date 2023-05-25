<script setup lang="ts">
    // Data
    const toggleSwitch = ref(false);
    const inputValue = ref('');
    const giCode = ref('')
    const giCodeUsable = ref(true)

    async function applySettings()
    {
        console.log("applySettings")
        console.log(toggleSwitch.value)
        console.log(inputValue.value)
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
                <input id="input-field" type="text" v-model="inputValue" class="form-input text-black" />
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
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="applySettings">Apply</button>


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