<script setup lang="ts">
    import axios from 'axios'
    import { User, InfoEvent } from "../../types"
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    useHead({
        title: "event page",
        
    })

    const dataLoaded = ref(false)
    // const infoEvents = ref([
    //     {
    //         header: "Hello",
    //         content: "This is the content",
    //         isShown: false,
    //     },
    //     {
    //         header: "Hello2",
    //         content: "This is the content2",
    //         isShown: false,
    //     }
    // ]) as Ref<{header: string, content: string, isShown: boolean}[]>

    const infoEvents = ref([] as InfoEvent[]) 
    onMounted(async () => {
        const response = await axios.get('../api/models/user', {
            params: {
                email: adminEmail().value
            }
        });
        const items: InfoEvent[] = response.data.data.infoEvents;
        infoEvents.value = items
        // console.log(items, "items")
        dataLoaded.value = true
    })

    

</script>


<template>
    <div class="grid grid-cols-1 gap-4">
    <!-- <Alert/>
    <Profile/> -->
    <!-- <ProfileHeaderAvatar/> -->
    <div v-if="dataLoaded">
        <div v-for="(event, index) in infoEvents" :key="index" class="bg-white p-4 rounded-md shadow">
            <div class="flex items-center justify-center mb-2">
            <div class="text-lg font-semibold text-center text-black">{{ event.header }}</div>
            <div v-if="!event.isShown">
                <IconsArrowDown class="svgImage text-black" @click="infoEvents[index].isShown = true"/>
            </div>
            <div v-else>
                <IconsArrowUp class="svgImage text-black" @click="infoEvents[index].isShown = false"/>
            </div>
            </div>
            <div v-if="event.isShown" class="mt-4 text-black">
                {{ event.content }}
            </div>
        </div>
        <!-- <img src="~/assets/images/down-arrow.png" alt="Down Arrow" /> -->
    </div>
    <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div> <!-- Loading bar -->

    </div>


</template>