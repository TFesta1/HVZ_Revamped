export default defineNuxtRouteMiddleware((to, from) => {
    console.log("middlweware called")
    refreshNuxtData("users")


})