<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';
    const { $setupUser } = useNuxtApp() as any
    $setupUser()  

    const users = ref<User[]>([]);
    const coorespondingEmails = ref<string[]>([]);
    const isNotInWeeklong = ref<boolean>(false);
    const nonWeeklongUsers = ref<User[]>([]);
    const requestingList = ref<User[]>([]);
    const isNotRequesting = ref(false);
    const usersLoaded = ref(false);
    const plrAdmin = ref(false);
    const giCode = ref("")
    const giCodeUsable = ref(true)
    const giErrorMsg = ref("")

    const totalZombies = ref(0)
    const totalHumans = ref(0)

    // console.log(useSupabaseUser().value?.email)


    const getHumanZombieCount = async () => {
      const responseUsers = await axios.get('api/models/users');
      const items = responseUsers.data.data;
      // console.log(items);

      const users = items
        .filter((item: User) => item.isInWeeklong)
        .map((item : User) => ({
          zombieHumanOz: item.zombieHumanOz
      }));

      // console.log(users)


      for (let i = 0; i < users.length; i++) {
        if (users[i].zombieHumanOz == 1) {
          totalZombies.value++
        }
        else   {
          totalHumans.value++
        }
      }

      // console.log(totalZombies, totalHumans)
      
    }
    getHumanZombieCount()

    
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

    const submitGICode = async () => {

      console.log(giCode.value)
      if (giCode.value == "")
      {
        giErrorMsg.value = "GI Code Empty"
        return
      }
      const response = await axios.get('api/models/user', {
          params: {
            email: adminEmail().value,
          },
      });
      const adminUser: User = response.data.data;
      if (!adminUser.GICodeUsable) {
        giErrorMsg.value = "GI Not In Session"
        return;
      }

      if (giCode.value == adminUser.GICode) {
        giCode.value = ""
        giErrorMsg.value = 'GI Code Verified'
        // isNotInWeeklong.value = true
        // isNotRequesting.value = true
        // giCodeUsable.value = false
        try {
          const responseWeeklong = await axios.get('../api/models/updateUser', {
                params: {
                    email: useSupabaseUser().value?.email,
                    parameterToUpdate: "isInWeeklong",
                    newValue: true,
                    parameterType: "boolean"
                },
            });

            const responseReq = await axios.get('../api/models/updateUser', {
                params: {
                    email: useSupabaseUser().value?.email,
                    parameterToUpdate: "requestingWeeklong",
                    newValue: false,
                    parameterType: "boolean"
                },
          });
          reloadTable().value = true
          
        } catch (error) {
          console.error(error);
        }
      } else {
        giErrorMsg.value = "GI Code Incorrect"
      }





    }

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
      const response = await axios.get('api/models/user', {
          params: {
            email: adminEmail().value,
          },
      });
      const adminUser: User = response.data.data;
      giCodeUsable.value = adminUser.GICodeUsable
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
    <div class="flex flex-wrap">
      <div v-if="usersLoaded">
        <div v-if="isNotInWeeklong || stateAdmin().value">
          <div v-if="!stateAdmin().value">
            <SecretKey />
          </div>


          <p style="font-weight: bold; font-size:15px; padding-left: 5px;">Total Players: {{ totalHumans + totalZombies }}</p>
          <p style="color:green; font-weight: bold; font-size:15px; padding-left: 5px;">Humans: {{ totalHumans }}</p>
          <p style="color:red; font-weight: bold; font-size:15px; padding-left: 5px;">Zombies: {{ totalZombies }}</p>

          <Table :headers="headers" :coorespondingEmails="coorespondingEmails" :data="users" :isAdmin="plrAdmin" />
        </div>
        <div v-else class="w-full md:w-1/2 p-4">
          <!--  -->
          <div v-if="isNotRequesting">
            <button @click="requestedToPlay()" class="genericButton">Request weeklong</button>
          </div>
          <div v-else>
            <p>You have requested to play in the weeklong. Please wait for a mod to approve your request.</p>
          </div>
        </div>

        <div v-if="!isNotInWeeklong && !stateAdmin().value">
          <!-- Input box and "Enter" button for GICode -->
          <!-- v-if="giCodeUsable" -->
          <div class="w-full md:w-1/7 p-4 mt-4">
            <input v-model="giCode" type="text" class="form-input mr-2 text-black" placeholder="Enter GICode" />
            <button @click="submitGICode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enter</button>
            <p class="text-red-500">
              <span :class="{'text-red-500': giErrorMsg !== 'GI Code Verified', 'text-green-500': giErrorMsg === 'GI Code Verified'}">
                {{ giErrorMsg }}
              </span>
              
            </p>
          </div>
          <!-- <div v-else  class="w-full md:w-1/7 p-4 mt-4">
            <p>No GI Code Available</p>
          </div> -->

          <p class="mb-4">
                Code Usable: 
                <span :class="{'text-red-500': giCodeUsable === false, 'text-green-500': giCodeUsable === true}">
                    {{ giCodeUsable ? "Yes" : 'No' }}
                </span>
          </p>

        </div>
        
      </div>
    <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div> <!-- Loading bar -->
  </div>

</template>



<style scoped>

</style>