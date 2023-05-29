<script setup lang="ts">
    import axios from 'axios'
    import { User, InfoEvent } from "../../types"
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    useHead({
        title: "event page",
        
    })
    const infoEvents = ref([
        {
            header: "Hello",
            content: "This is the content",
            isShown: false,
        },
        {
            header: "Hello2",
            content: "This is the content2",
            isShown: false,
        }
    ]) as Ref<{header: string, content: string, isShown: boolean}[]>

    // const infoEvents = ref([] as InfoEvent[]) 
    

</script>


<template>
    <div class="grid grid-cols-1 gap-4">
    <!-- <Alert/>
    <Profile/> -->
    <!-- <ProfileHeaderAvatar/> -->
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


</template>