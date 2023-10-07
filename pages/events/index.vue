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
 
    <div style="justify-content: center;" class ="box is-size-5-mobile is-size-1-desktop has-text-centered" id="Title">
        <strong>KINGED Invitational</strong>
    </div>

 <div class="card" id="Card2">
  <div class="card-image">
    <figure class="image is-3by4">
      <img src="~assets/images/Fall_2023_Day.png" style="width:100%; height:100%" alt="Invitational Poster">
    </figure>
  </div>
  </div> 

 <!-- <div class="container" id="Invcon1">
 <Modal modalText="
 Scattered around campus, there are 5 baby games. Each player must go to 4 baby games and learn what they teach you.

Circling around campus are two ZNPCs, the Bishops. If they see groups of checkers that are larger than z amount of people, they will run towards the center of campus to alert their King of a possible revolution. The Bishop can only move on the concrete paths.
If a Bishop is stunned, they will stop where they are, stunned. After their stun timer, they will continue to roam around campus like nothing happened.
Once a Checker has finished their learning, they may return to the SUB Concourse to leave the mission.
 " title="Mission 1" id="InfoM1"/>
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-1-desktop has-text-centered" id="InvboxM1T">
    <p class="has-text-light has-text-weight-bold"> Baby Game Learning</p>
  </div>
  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM1LT">
    <p>Checkers has gotta step up their game. We have to go to all the other baby games and learn from them to become smarter, stronger and better. However we have to be careful, as the Chess Bishops are circling around, and if they catch wind, we’ll lose the element of surprise.</p>
  </div>


  </div>
  </div> -->

  <!-- <div class="container" id="Invcon2">
    <Modal modalText="We have 3 NPC Checkers to escort across the board. They will only advance forwards, never retreating, and never altering their path. They will only move while they have other Checkers to defend them.
    Once a Checker has reached the other side of the board, they will be “Kinged”, where they can now turn around and move in any direction. They will also have a small blaster to defend themselves.
    The Checkers do not need to get all of the checkers kinged, just most of them. If a Checker is tagged too many times, they will take a knee, defeated.
    Patrolling the game area are the two Knights, adorned in their armor. They will charge at whoever is left alone, or small groups not defending the Checker.
    " title="Mission 2" id="InfoM1"/>
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-2-desktop has-text-centered has-text-light" id="InvboxM2T">
    <p class="has-text-light has-text-weight-bold">Kinging our Checkers</p>
    </div>

    <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM2LT">
        <p>After training, we are ready to launch our attack by advancing our top Checkers from one side to the other to "king" them. Once kinged, they will become stronger and act as leaders to support our cause.</p>
    </div>
    </div>
    </div> -->

 <!-- <div class="container" id="Invcon3">
    <Modal modalText="
    Game will start in Peregrine Quad. Humans will have to defend all three Kinged Checkers.
    Around the quad, there are 4 “corners” that need to be folded in. Suicide squads will have to run out and fold the board inwards.
    When Humans reach a corner, the mod will hand them a cardboard corner that must be held by two Humans. The Humans must bring the corner back to the Kinged Checkers, where it is safe.
    Once at least two corners have been folded, the Humans can start to escort back to Pomodoros. If they’ve folded three corners, there will be a faster escort.
    If all four corners are folded, the mission instantly ends without an escort phase.
    Otherwise, the mission ends when the first Kinged Checker reaches the stairs." title="Mission 3" id="InfoM1"/>
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-2-desktop has-text-centered" id="InvboxM3T">
    <p class="has-text-light has-text-weight-bold">A Counterattack Unfolds</p>
  </div>

  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM3LT">
    <p>After kinging our Checkers, the Chess pieces are attempting to fold the board on us, crushing us. We must defend our Kings, fight off Pawns, and send out groups to prevent the board from folding. Beware of Bishops hunting down thwarted groups.</p>
  </div>

 </div>
  </div> -->

  <!-- <div class="container" id="Invcon4">
    <Modal modalText="Humans must defend their Kings against the onslaught of Chess pieces.
    During the onslaught, Knights, Bishops and Rooks may emerge to take out our pieces. We must take down all 6 of those pieces before we can work on retreating back to our side of the board to regroup.
    The humans must defeat at least the original 6 pieces before they can leave, however any promoted Pawns will appear in Mission 5.
    " title="Mission 4" id="InfoM1"/>
  <div class="Invbox" id="InvboxC">
  <div class="box is-size-5-mobile is-size-2-desktop has-text-centered" id="InvboxM4T">
    <p class="has-text-light has-text-weight-bold">The Promotion Rush</p>
  </div>

  <div class="box is-size-7-mobile is-size-4-desktop" id="InvboxM4LT">
    <p>The Chess pieces have gathered their Knights, Bishops, and Rooks to defeat us. We must resist the onslaught and take down the pieces. Pawns breaching our lines could promote and pose a threat, so we must remain steady and take down the pieces.</p>
  </div>
 </div>
  </div> -->

  <!-- <div class="container" id="Invcon5">
  <div class="Invbox" id="InvboxC5">
  <div class="box is-size-5-mobile is-size-2-desktop has-text-centered" id="InvboxM5T">
    <p class="has-text-light has-text-weight-bold">The Queen’s Gambit</p>
  </div>
  <div class="box is-size-7-mobile is-size-3-desktop" id="InvboxM5LT">
    <p>After defeating other pieces, the Queen must be lured into a trap to capture her King. She can outmaneuver us and capture pieces easily. To save her King, we must eliminate the pawns and use Checkmate to eliminate the pawns, ensuring the King is secure.</p>
  </div>
 </div>
  </div> -->

  <!-- <div class="container" id="Invcon6">
  <div class="Invbox" id="InvboxC5">
  <div class="box is-size-7-mobile is-size-2-desktop has-text-centered" id="InvboxF">
    <strong>The Ending</strong>
  </div>
 </div>
  </div> -->

  <!-- <div class="container" id="con2">
  <div class="box" id="Imbox3">
  <div class="box" id="Imbox4"> 
    <figure class="image is-16by9">
     <img src="~assets/images/Mission1.png" alt="Main Picture">
     </figure>
    </div>
  </div>
  </div> -->


  <div class="container"> 
    <div class="box is-size-7-mobile is-size-5-desktop has-text-centered" id="Footer">
        <p>Developed by Taheemuddin Ahmed & Tanner Festa</p>
    </div>
  </div>
  
</template>

<style scoped>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  overflow: overlay;

  background-image: "~assets/images/fall2023_background.png";
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  position: relative;
  right: 0;
  bottom: 0dvh;
  left: 0;
  padding: 1rem;
  background-color: #00000000;
  text-align: center;
}
</style>