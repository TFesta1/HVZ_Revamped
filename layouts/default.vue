<!-- Layout: Wraps this class around all of the content -->
<template>
    <!-- Provides the background color for everything -->
    <div class="DefaultLayout text-white bg-slate-900 h-screen">
        <p>Default layout</p>
        <slot/> <!-- This is where the content will be injected -->
    </div>
</template>