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
        <div class="box" id="box2">
            <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </strong>
        </div>

        <!-- <img src="~/assets/1.jpg" alt="" /> -->
        <!-- <IconsBell/> -->
        <!-- <ContentDoc/> -->
        <!-- <Counter/> -->
        <!-- {{ pending ? "Loading" : products }}

        <button @click="refresh">Refresh</button> -->
    </div>
</template>


