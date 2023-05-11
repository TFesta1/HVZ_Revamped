<script setup lang="ts">
    const users = ref<User[]>([]);
    import { User } from "types"
    useHead({
        title: "Weeklong",
    })

    const headers : string[] = ["Photo", "Name", "Team", "Tags", "Days Survived", "Mod"]
    const data : string[][] = [["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"], 
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"],
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"]]

    const { data: items, pending } = await useLazyAsyncData("users", () => $fetch('api/models/users'))
    // const users: User[] = items as User[];
    // console.log(products.value)
    // console.log(items.value.data)
    

    // const users: User[] = (items.value.data as unknown) as User[];
    users.value = items.value?.data.map((item: any) => ({
        photo: item.photo,
        nickname: item.nickname,
        team: item.team,
        tags: item.tags,
        daysSurvived: item.daysSurvived,
        mod: item.isMod
    }));
    // onBeforeMount(async () => {
    //     const { data: items, pending } = await useLazyAsyncData("users", () => $fetch('api/models/users'))

    //     if (items.value) {
    //         users.value = await items.value.map((item: any) => ({
    //         photo: item.photo,
    //         nickname: item.nickname,
    //         team: item.team,
    //         tags: item.tags,
    //         daysSurvived: item.daysSurvived,
    //         mod: item.isMod
    //         }));
    //     }
    //     await refreshNuxtData("users")
    // });
    const refresh = () => refreshNuxtData("users")

    console.log(users.value)


    
    // console.log(users[0].coins)



</script>

<template>
    <div>
        <Table :headers="headers" :data="users"/>

    </div>
</template>



<style scoped>

</style>