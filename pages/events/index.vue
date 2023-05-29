<script setup lang="ts">
    import axios from 'axios'
    import { User, InfoEvent } from "../../types"
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    useHead({
        title: "event page",
        
    })

    const adminAddEventTitle = ref("Add Description Box") as Ref<string>

    const form = reactive({
        header: '',
        content: '',
    })

    const clickedAddEvent = ref(false)

    async function addEvent() 
    {
        clickedAddEvent.value = true;
        console.log("CLicked")
    }

    async function closeModal()
    {
        clickedAddEvent.value = false;
    }

    async function deleteInfoEvent(e: InfoEvent)
    {
        console.log("Deleted", e.header, e.content)
        dataLoaded.value = false
        const response = await axios.get('../api/models/updateInfoEvent', {
            params: {
                email: adminEmail().value,
                header: e.header,
                content: e.content,
                operation: "remove"
            }
        });

        await loadInfoEvents()
    }

    async function onSubmit() 
    {
        dataLoaded.value = false
        clickedAddEvent.value = false;
        console.log(form.header, form.content)

        const response = await axios.get('../api/models/updateInfoEvent', {
            params: {
                email: adminEmail().value,
                header: form.header,
                content: form.content,
                operation: "add"
            }
        });

        await loadInfoEvents()
        console.log("Submitted")
    }

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
    async function loadInfoEvents() {
        dataLoaded.value = false
        const response = await axios.get('../api/models/user', {
            params: {
                email: adminEmail().value
            }
        });
        const items: InfoEvent[] = response.data.data.infoEvents;
        infoEvents.value = items
        // console.log(items, "items")
        dataLoaded.value = true
    }
    const infoEvents = ref([] as InfoEvent[]) 
    onMounted(async () => {
        console.log(stateAdmin().value)
        await loadInfoEvents()
    })

    

</script>


<template>
    <div class="grid grid-cols-1 gap-4">
    
    <div v-if="stateAdmin().value == true">
        <!-- For admins to add a new event -->
        <h3 class="i-name">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" @click="addEvent" :style="{ display: clickedAddEvent ? 'none' : 'flex' }">
                {{ adminAddEventTitle }}
            </button>
        </h3>
        <div class="modal-container" :style="{ display: clickedAddEvent ? 'flex' : 'none' }">
            <div class="modal">
                <h2>{{ adminAddEventTitle }}</h2>
                <form @submit.prevent="onSubmit">
                    <label class="text-black">
                        Title:
                        <textarea v-model="form.header" name="description" class="description-box text-black"></textarea>
                    </label>
                    <label class="text-black">
                        Content:
                        <textarea v-model="form.content" name="description" class="description-box text-black"></textarea>
                    </label>
                    <button type="submit" class="submit-modal text-black modal-button" style="background-color:rgb(140, 188, 67)" @click="addEvent">Submit</button>
                </form>
                <button class="modal-button" style="background-color:#4c51bf" @click="closeModal">Close</button>
            </div>
            <div class="modal-background"></div>
        </div>
    </div>
    
    <div v-if="dataLoaded">
        <div v-for="(event, index) in infoEvents" :key="index" class="bg-white p-4 rounded-md shadow">
            <div class="flex items-center justify-center mb-2">
                <div class="flex items-center">
                <div class="text-lg font-semibold text-black">{{ event.header }}</div>
                <div v-if="!event.isShown">
                    <IconsArrowDown class="svgImage text-black" @click="infoEvents[index].isShown = true"/>
                </div>
                <div v-else>
                    <IconsArrowUp class="svgImage text-black" @click="infoEvents[index].isShown = false"/>
                </div>
                </div>
                <div v-if="stateAdmin().value == true">
                    <IconsTrash class="svgImage text-red-500" @click="deleteInfoEvent(event)"/>
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