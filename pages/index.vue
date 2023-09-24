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
  <div class="box is-size-7-mobile is-size-6-tablet is-size-6-desktop" id="box2">
    <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </strong>
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
  <div class="box is-size-7-mobile is-size-6-desktop" id="col1"> </div>
  <div class="box is-size-7-mobile is-size-6-desktop" id="col2"> </div>
  <div class="box is-size-7-mobile is-size-6-desktop" id="col3"> </div>
  </div>

  <div class="container" id="con4">
  <div class="box" id="box3">
  <div class="box is-size-7-mobile is-size-6-desktop" id="box4">
    <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </strong>
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

