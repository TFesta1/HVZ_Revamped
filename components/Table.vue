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
    });
    // Destructure the props to access them
    const { headers, data } = props;
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
                    <td v-for="i in item" class="border px-4 py-2">{{ i }}</td>
                </tr>
            
            </tbody>
        </table>
    </div>
</template>



<style scoped>

</style>