<script setup lang="ts">
    const { $setupUser } = useNuxtApp()
    $setupUser()  

    useHead({
        title: "event page",
        
    })

</script>


<template>
    <div class="Main">
        <!-- <Alert/>
        <Profile/> -->
        <ProfileHeaderAvatar/>
        <!-- <img :src='require("")' /> -->
    </div>
</template>