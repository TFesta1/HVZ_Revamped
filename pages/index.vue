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
    <p class="is-size-5-mobile is-size-6-tablet is-size-3-desktop has-text-centered has-text-weight-bold"> New Paltz's Humans Vs Zombies</p>

    <p class="is-size-6-mobile is-size-5-desktop">NPHvZ was founded in 2009, Humans vs. Zombies is like a manhunt with blasters, where zombies must do a two-handed tag on a human to tag them. Humans can defend themselves by throwing a sock or using their blaster to "study" zombies. Here in New Paltz HvZ, we have various events and weekly games on Tuesdays from 8 p.m. to 10 p.m. in Parker Quad and Saturdays from 6 p.m. to 8 p.m. in the Elting Gym.</p>
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
    <p class="is-size-4-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Mini Games!</p>
    
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered">Mini Games!</p>
    
  </div>
  <div class="box is-size-7-mobile is-size-3-desktop has-text-centered" id="col2"> 
    <p class="is-size-4-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Day Games!</p>
    
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered">Day Games!</p>
  </div>

  <div class="box is-size-7-mobile is-size-3-desktop has-text-centered" id="col3"> 
    <p class="is-size-4-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">Weeklong!</p>
    
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered">Weeklong!</p>
  </div>
  </div>

  <div class="container" id="con4">
  <div class="box" id="box3">
  <div class="box is-size-7-mobile is-size-2-desktop has-text-centered" id="box4">
    <p class="is-size-4-mobile is-size-4-tablet is-size-3-desktop has-text-centered has-text-weight-bold">NPHvZ Rules</p>
    
    <p class="is-size-5-mobile is-size-4-tablet is-size-3-desktop has-text-centered">NPHvZ Rule</p>
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
  bottom: 0dvh;
  left: 0;
  padding: 1rem;
  background-color: #00000000;
  text-align: center;
}

</style>

