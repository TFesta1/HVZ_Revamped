<!-- At the root directory -->
<!-- https://nuxt.com/modules -->
<script setup lang="ts">
    const { $setupUser } = useNuxtApp() as any
    $setupUser()  
    // const resp = await $fetch('/api/hello')
    const productsShow = ref();
    const title = ref("This is a dynamic title")
    // console.log(resp)
    // useFetch freezes program until it recieves data
    // useLazyFetch displays a loader, will need to use async
    // const { data: products, pending } = await useLazyAsyncData("products", () => $fetch('api/products'))
    // const refresh = () => refreshNuxtData("products")
    

    // console.log(toRaw(products.value))
    import { useCounterStore } from '~/stores/myStore'
    const store = useCounterStore()
    store.increment()

    onMounted(async () => {
        const user = await useSupabaseUser()
        if (!user) {
            throw createError("You must be logged in to view this page")
        }

        console.log(user.value?.email)
        // console.log(user.value?.user_metadata)
        // console.log(user.value?.id)
    }) 

    // console.log(store.count)

    // definePageMeta({
    //     middleware: 'auth'
    // })
    // const { sayHello } = useUtils() --> Composables
    const { $sayHello } = useNuxtApp()
    // $sayHello("Tanner")
</script>

<template>
<div>
 <div class="container" id="con1">
  <div class="box" id="box1">
  <div class="box" id="box2">
    <p class="is-size-7-mobile is-size-6-tablet is-size-3-desktop has-text-centered has-text-weight-bold"> New Paltz's Humans Vs Zombies</p>

    <p class="is-size-7-mobile is-size-6-tablet is-size-5-desktop">Humans vs. Zombies is a modified game of tag, where zombies must do a two-handed tag on a human to tag them. Humans can defend themselves by throwing a sock or using their blaster to "stun" zombies. Here in New Paltz HvZ, we have various events and weekly games on Tuesdays from 8PM - 10PM in Parker Quad and Saturdays from 6PM - 8PM in the Elting Gym.</p>
  </div>
 </div>
  </div>

  <div class="container" id="con2">
  <div class="box" id="Imbox1">
  <div class="box" id="Imbox2"> 
    <figure class="image is-128x128">
     <img src="https://bulma.io/images/placeholders/128x128.png">
     </figure>
    </div>
  </div>
  </div>

  <div class="card" id="Card1">
  <div class="card-image">
    <figure class="image is-3by4">
      <img src="~assets/images/Fall_2023_Day.png" style="width:100%; height:100%" alt="Invitational Poster">
    </figure>
    
  </div>
  </div> 

  <div class="container" id="con3">
  <div class="box is-size-7-mobile is-size-3-desktop has-text-centered" id="col1"> 
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Mini Games!</p>

    <p class="is-size-7-mobile is-size-4-tablet is-size-4-desktop">Every week we host mini games either in Parker Quad at 8PM on Tuesdays or in the Elting Gym on Saturdays at 6PM! Here we play various gamemodes and have fun! Blasters & Bands are always provided and students can feel welcome joining at any time!</p>
  </div>

  <div class="box is-size-7-mobile is-size-3-desktop has-text-centered" id="col2"> 
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Day Games!</p>
    
    <p class="is-size-7-mobile is-size-4-tablet is-size-4-desktop has-text-centered">Day Games or Invitationals are games where we play Humans Vs Zombies for the entire day! Here students can partipate in Missions and follow the lore that our Content Team has developed! In addition, sometimes we hold collaborations with other clubs for more immersive games!</p>
  </div>

  <div class="box is-size-7-mobile is-size-3-desktop has-text-centered" id="col3"> 
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Weeklong!</p>
    
    <p class="is-size-7-mobile is-size-4-tablet is-size-4-desktop has-text-centered">Weeklong is a semester-long event where students play Humans Vs Zombies for a week, starting on Sunday with a hidden Original Zombie and continuing with daily missions until Friday's finale. Club members are in play when outside in a safe area!</p>
  </div>
  </div>

  <div class="container" id="con4">
  <div class="box" id="box3">
  <div class="box is-size-7-mobile is-size-2-desktop" id="box4">
    <p class="is-size-6-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">NPHvZ Rules</p>
    
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      1. Rule #1 "Don't be a D**k!" Follow good sportmanship and play fair!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      2. Players must be wearing an orange band at all times!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      3. Tags are completed by a two handed touch in appropriate places!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      4. Head shots/Neck shots don't count as stuns!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      5. All games always start with a whistle blow! Three whistles initiates a game pause, All players cannot move!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      6. Property & Personal belonging damage is prohibited!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      7. Clean up after yourself and clean up the campus after games!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      8. No vehicles are allowed during games/in play!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      9. Always wear proper attire!
    </p>
    <p class="is-size-7-mobile is-size-4-tablet is-size-3-desktop">
      10. Blasters cannot be able to shoot over 100FPS!
    </p>



  </div>
  </div>
  </div>

<footer>
  <div class="content has-text-centered">
    <p>Developed by Taheemuddin Ahmed & Tanner Festa
    </p>
  </div> 
</footer>
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
  bottom: -50dvh;
  left: 0;
  padding: 1rem;
  background-color: #00000000;
  text-align: center;
}

</style>

