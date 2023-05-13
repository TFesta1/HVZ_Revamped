<!-- At the root directory -->
<!-- https://nuxt.com/modules -->
<script setup lang="ts">
    // const resp = await $fetch('/api/hello')
    const productsShow = ref();
    const title = ref("This is a dynamic title")
    // console.log(resp)
    // useFetch freezes program until it recieves data
    // useLazyFetch displays a loader, will need to use async
    const { data: products, pending } = await useLazyAsyncData("products", () => $fetch('api/products'))
    const refresh = () => refreshNuxtData("products")
    

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
            <Title>This is my title</Title>
            <Meta name="description" :content="title" />
        </Head>

        <!-- <img src="~/assets/1.jpg" alt="" /> -->
        <IconsBell/>
        <!-- <ContentDoc/> -->
        <Counter/>
        {{ pending ? "Loading" : products }}

        <button @click="refresh">Refresh</button>
    </div>
</template>


