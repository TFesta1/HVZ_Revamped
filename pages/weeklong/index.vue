<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';

    const users = ref<User[]>([]);
    const usersLoaded = ref(false);
    
    useHead({
        title: "Weeklong",
    })

    const headers : string[] = ["Photo", "Name", "Team", "Tags", "Days Survived", "Mod"]
    const data : string[][] = [["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"], 
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"],
                                ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"]]

    // const users: User[] = items as User[];
    // console.log(products.value)
    // console.log(items.value.data)

    // async function getUserValue(){
    onMounted(async () => {
      try {
        const response = await axios.get('api/models/users');
        const items = response.data.data;
        // console.log(items);

        users.value = items.map((item : User) => ({
          photo: item.photo,
          nickname: item.nickname,
          team: item.team,
          tags: item.tags,
          daysSurvived: item.daysSurvived,
          mod: item.isMod,
        }));

        console.log(users.value);
        usersLoaded.value = true;
      } catch (error) {
        console.error(error);
      }
    });

    //     // users.value = items.value?.data.map((item: any) => 
    //     // ({
    //     //     photo: item.photo,
    //     //     nickname: item.nickname,
    //     //     team: item.team,
    //     //     tags: item.tags,
    //     //     daysSurvived: item.daysSurvived,
    //     //     mod: item.isMod
    //     // }));
    //     console.log(users.value)

    // }

    // onMounted(async () => {
    //     const { data: items, pending } = await useLazyFetch('api/models/users',
    //     {
    //     // just get the data, and not the array infront of it.
    //         transform: (_items) => _items.data, 
    //     }).then((res) => {
    //         console.log(res.data)
    //         // console.log(items)
    //         // productsShow.value = res
    //         return res
    //     })
    //     // console.log(items.value)
    // })
    

    // const users: User[] = (items.value.data as unknown) as User[];
    
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

    // console.log(users.value)


    
    // console.log(users[0].coins)



</script>

<template>
    <div>
        <Table v-if="usersLoaded" :headers="headers" :data="users" />
        <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div>
        

    </div>
</template>



<style scoped>

</style>