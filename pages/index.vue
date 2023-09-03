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
        <Head>
            <Title>HVZ</Title>
            <Meta name="description" :content="title" />
        </Head>
        <!-- <div class="box" id="box1"></div>

        <div class="box" id="box2">
            <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </strong>
        </div> -->

        <div class="box" id="box3"></div>
        
        <div class="box" id="box4">
            <strong>SUNY New Paltz has an active Humans vs. Zombies (HvZ) club on campus. HvZ is a moderated, modified game of tag played outdoors on the New Paltz campus. Each semester, the club holds campus-wide, weeklong games between two teams: the Humans and the Zombies.

            The zombie team players chase their opponents, and a two-handed touch turns a Human player into a Zombie. Human players use nerf and other foam projectiles such as socks to “stun” their zombie pursuers. During these weeklong events, or “weeklongs,” players are in-game twenty-four hours a day, for five days straight1.

            If you are interested in joining the SUNY New Paltz HvZ club or learning more about how to play, follow any of the social media platforms above and ask how to get started!</strong>
        </div>

        <div class="card" id="Card1">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="../assets/images/Rules.png" alt="Placeholder image">
                </figure>
            </div>

            <div class="content flex items-center justify-center" style="align-content: center; font-weight: bold;">
                Have fun!
            </div>
        </div>

        <!-- <img src="~/assets/1.jpg" alt="" /> -->
        <!-- <IconsBell/> -->
        <!-- <ContentDoc/> -->
        <!-- <Counter/> -->
        <!-- {{ pending ? "Loading" : products }}

        <button @click="refresh">Refresh</button> -->
    </div>
</template>


