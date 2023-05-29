<script setup lang="ts">
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    useHead({
        title: "event page",
        
    })
    const infoEvents = ref([
        {
            header: "Hello",
            content: "This is the content"
        },
        {
            header: "Hello2",
            content: "This is the content2"
        }
    ]) as Ref<{header: string, content: string}[]>
    

</script>


<template>
    <div class="Main">
        <!-- <Alert/>
        <Profile/> -->
        <ProfileHeaderAvatar/>
        <div v-for="(event, index) in infoEvents">
            {{ event.header }}
            <IconsArrowDown class="svgImage"/>

        </div>
        <!-- <img src="~/assets/images/down-arrow.png" alt="Down Arrow" /> -->
        
    </div>
</template>