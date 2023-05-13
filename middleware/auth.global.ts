
export default defineNuxtRouteMiddleware((to, from) => {
    console.log("middlweware called")
    const router = useRouter();

    
    // refreshNuxtData("users")

    const user = useSupabaseUser()
    if (!user.value) {

        console.log("user does not exist")
        // Make sure that there's no infinite loop
        if (to.path != "/login" && to.path != "/signup") {
            router.push("/login")
        }
        
        // router.push("/login")
        console.log(to.path)
    }
    else {
        console.log("user exists")
        // Redirect them to the home page
        if (to.path == "/login" || to.path == "/signup") {
            router.push("/")
        }
    }
		




})