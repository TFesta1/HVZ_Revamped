<script setup lang="ts">
    const nuxt = useNuxtApp()

    console.log(nuxt, 'nuxtAPp')

</script>

<template>
    <div>
        event id: {{ $route.params.id  }}
    </div>
</template>