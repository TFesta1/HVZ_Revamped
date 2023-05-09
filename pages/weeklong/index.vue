<script setup lang="ts">
    useHead({
        title: "Weeklong",
    })

    const headers : string[] = ["Name", "Team", "Tags", "Days Survived", "Mod"]
    const data : string[][] = [["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"], 
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"],
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"]]


</script>

<template>
    <div>
        <Table :headers="headers" :data="data"/>
    </div>
</template>



<style scoped>

</style>