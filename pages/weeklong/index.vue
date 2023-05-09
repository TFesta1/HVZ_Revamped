<script setup lang="ts">
    useHead({
        title: "Weeklong",
    })

    const headers : string[] = ["Name", "Team", "Tags", "Days Survived"]
    const data : string[][] = [["John Doe", "25", "johndoe@example.com", "johndoe@example.com"], 
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com"],
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com"]]


</script>

<template>
    <div>
        <Table :headers="headers" :data="data"/>
    </div>
</template>



<style scoped>

</style>