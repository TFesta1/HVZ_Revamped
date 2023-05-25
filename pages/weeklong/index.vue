<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    const users = ref<User[]>([]);
    const coorespondingEmails = ref<string[]>([]);
    const isNotInWeeklong = ref<boolean>(false);
    const nonWeeklongUsers = ref<User[]>([]);
    const requestingList = ref<User[]>([]);
    const isNotRequesting = ref(false);
    const usersLoaded = ref(false);
    const plrAdmin = ref(false);

    // console.log(useSupabaseUser().value?.email)

    
    useHead({
        title: "Weeklong",
    })

    const headers : string[] = ["Photo", "Name", "Team", "Tagged By", "Tags", "Days Survived", "Mod"]
    // const data : string[][] = [["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"], 
    //                             ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"],
    //                             ["John Doe", "25", "johndoe@example.com", "johndoe@example.com", "YES"]]

    // const users: User[] = items as User[];
    // console.log(products.value)
    // console.log(items.value.data)

    const loadTable = async () => {
      try {
        usersLoaded.value = false
        const response = await axios.get('api/models/user', {
          params: {
            email: await useSupabaseUser().value?.email,
          },
        });
        const foundUser = response.data.data;
        console.log(foundUser);

        isNotInWeeklong.value = foundUser.isInWeeklong
        isNotRequesting.value = !foundUser.requestingWeeklong
        plrAdmin.value = foundUser.isAdmin


        const responseUsers = await axios.get('api/models/users');
        const items = responseUsers.data.data;
        // console.log(items);

        users.value = items
          .filter((item: User) => item.isInWeeklong)
          .map((item : User) => ({
            
            photo: item.photo,
            nickname: item.nickname,
            team: item.team,
            taggedBy: item.taggedBy,
            tags: item.tags,
            daysSurvived: item.daysSurvived,
            mod: item.isMod,
            zombieHumanOz: item.zombieHumanOz
        }));

        coorespondingEmails.value = items
          .filter((item: User) => item.isInWeeklong)
          .map((item : User) => ({
            email: item.email
        }));

        console.log(users.value, "users")
        console.log(isNotInWeeklong.value, "isInWeeklong")
        console.log(isNotRequesting.value, "isNotRequesting")
          

        // console.log(users.value);
        usersLoaded.value = true;
      } catch (error) {
        console.error(error);
      }
    }
    // async function getUserValue(){
    onMounted(async () => {
      await loadTable()
    });

    watch (reloadTable(), async () => {
      await loadTable()
      reloadTable().value = false
    })

    

    const refresh = () => refreshNuxtData("users")

    // console.log(users.value)


    
    // console.log(users[0].coins)

    const requestedToPlay = async () => {
      console.log("requested")
      try {
        const response = await axios.get('api/models/updateUser', {
          params: {
            email: await useSupabaseUser().value?.email,
            parameterToUpdate: "requestingWeeklong",
            newValue: true,
            parameterType: "boolean"
          },
        });
        const item = response.data;
        // user.value = item;
        console.log(item);
        isNotRequesting.value = false;

      } catch (error) {
        console.error(error);
      }
      
    }



</script>

<template>
    <div>
        <div v-if="usersLoaded">
          <div v-if="isNotInWeeklong">
            <SecretKey />
            <Table :headers="headers" :coorespondingEmails="coorespondingEmails" :data="users" :isAdmin="plrAdmin" />
          </div>
          <div v-else>
            <div v-if="isNotRequesting">
              <button @click="requestedToPlay()" class="genericButton">Request weeklong</button>
            </div>
            <div v-else>
              <p>You have requested to play in the weeklong. Please wait for a mod to approve your request.</p>
            </div>
          </div>
          
          

        </div>
        <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div> <!-- Loading bar -->
        
    </div>
</template>



<style scoped>

</style>