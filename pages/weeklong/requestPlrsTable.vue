<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';
    useHead({
        title: "Requested Players",
    })

    const users = ref<User[]>([]);
    const usersLoaded = ref(false);

    const isAdmin = ref(false);



    const headers : string[] = ["Photo", "Name", "Mod"]
    onMounted(async () => {
      try {
        const response = await axios.get('../api/models/users');
        const items = response.data.data;
        // console.log(items);

        users.value = items
          .filter((item: User) => !item.isInWeeklong && item.requestingWeeklong)
          .map((item : User) => ({
            
            photo: item.photo,
            nickname: item.nickname,
            mod: item.isMod,
        }));

        isAdmin.value = items.filter((item: User) => item.isAdmin && item.email === useSupabaseUser().value?.email).length > 0;
        console.log(isAdmin.value, "isAdmin")

        
        usersLoaded.value = true;
      } catch (error) {
        console.error(error);
      }


    });

</script>

<template>
    <div>
        <div v-if="usersLoaded">
            <Table :headers="headers" :data="users" :displayAdminTable="true" :isAdmin="isAdmin" />
        </div>
        <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div> <!-- Loading bar -->

    </div>
</template>



<style scoped>

</style>