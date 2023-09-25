<script setup lang="ts">
    import axios from 'axios'
    import { User, InfoEvent } from "../../types"
    const { $setupUser } = useNuxtApp() as any
    $setupUser()  

    useHead({
        title: "Fall Invitational",
        
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
    <!-- <div class="grid grid-cols-1 gap-4">
    
    <div v-if="stateAdmin().value == true">
         For admins to add a new event
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

        <img src="~/assets/images/down-arrow.png" alt="Down Arrow" /> 
    </div>
    <div v-else class="bg-gray-200 h-4 w-1/2 animate-pulse rounded-lg"></div>  Loading bar
    </div> -->
    <div class ="box is-size-5-mobile is-size-1-desktop has-text-centered" id="Title">
        <strong>KINGED Invitational</strong>
    </div>
<div class="container" id="Invcon1">
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-3-desktop has-text-centered" id="InvboxM1T">
    <strong> Baby Game Learning</strong>
  </div>
  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM1LT">
    <p>Checkers has gotta step up their game. We have to go to all the other baby games and learn from them to become smarter, stronger and better. However we have to be careful, as the Chess Bishops are circling around, and if they catch wind, we’ll lose the element of surprise.</p>
  </div>


  </div>
  </div>

  <div class="container" id="Invcon2">
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-3-desktop has-text-centered" id="InvboxM2T">
    <strong>Kinging our Checkers</strong>
    </div>

    <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM2LT">
        <p>Now that we have trained ourselves, we’re ready to start our attack. Together, we must advance some of our best Checkers from our side of the board, to the other side of the board in order to “king” them. Once they’ve been kinged, they’ll be stronger and act as leaders to rally behind our cause.</p>
    </div>
    </div>
    </div>

 <div class="container" id="Invcon3">
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-3-desktop has-text-centered" id="InvboxM3T">
    <strong>A Counterattack Unfolds</strong>
  </div>

  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM3LT">
    <p>Now that we’ve kinged our Checkers, the Chess pieces are unleashing their counterattack. They are attempting to fold the board on us, crushing us. We have to defend our Kings while we fight off the Pawns, meanwhile sending out groups to stop the board from folding. Beware though, as Bishops will hunt down groups that try to thwart them.</p>
  </div>

 </div>
  </div>

  <div class="container" id="Invcon4">
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-3-desktop has-text-centered" id="InvboxM4T">
    <strong>The Promotion Rush</strong>
  </div>

  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM4LT">
    <p>In a full force effort to stop us, the Chess pieces have rallied their Knights, Bishops and Rooks to wipe us out. We must hold steady against the onslaught of pieces, whilst taking down the pieces. Be warned however, as if any Pawns breach our lines and reach our side of the board, they will promote and be yet another threat to deal with.</p>
  </div>
 </div>
  </div>

  <div class="container" id="Invcon5">
  <div class="Invbox" id="InvboxC5">
  <div class="box is-size-5-mobile is-size-3-desktop has-text-centered" id="InvboxM5T">
    <strong>The Queen’s Gambit</strong>
  </div>
  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM5LT">
    <p>Now that the other pieces are defeated, it’s time for the Queen. Sadly though, she can outmaneuver us, and capture pieces too easily for a full on assault. Instead, we need to lure her into a trap, where if she moves, we can capture her King, and she’ll be forced to go down to save her King. From there, the King is toast, just get rid of the pawns and that’s Checkmate.</p>
  </div>
 </div>
  </div>

  <div class="container" id="Invcon6">
  <div class="Invbox" id="InvboxC5">
  <div class="box is-size-7-mobile is-size-4-desktop has-text-centered" id="InvboxF">
    <strong>The Ending</strong>
  </div>
 </div>
  </div>

  
</template>

<style scoped>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  overflow: overlay;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #00000000;
  text-align: center;
}
</style>