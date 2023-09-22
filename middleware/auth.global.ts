import axios from 'axios'
const setAdmin = async () => {
    const response = await axios.get('api/models/user', {
        params: {
        email: await useSupabaseUser().value?.email,
        },
    });
    const foundUser = response.data.data;
    stateAdmin().value = foundUser.isAdmin
}

export default defineNuxtRouteMiddleware((to, from) => {
    console.log("middlweware called")
    
    const router = useRouter();

    
    // refreshNuxtData("users")

    const user = useSupabaseUser()
    if (!user.value) {
        isLoggedIn().value = false
        console.log("user does not exist")
        // Make sure that there's no infinite loop
        if (to.path != "/login" && to.path != "/signup" && to.path != "/passwordReset") {
            // router.push("/login")
        }
        
        // router.push("/login")
        console.log(to.path)
    }
    else {
        isLoggedIn().value = true
        displayPasswordSent().value = ""
        // setAdmin()

        console.log("user exists")
        // Redirect them to the home page
        if (to.path == "/login" || to.path == "/signup") {
            router.push("/")
        }

        const { $setupUser } = useNuxtApp()
        // $setupUser()  

        if (!stateAdmin().value)
        {
            // Kick noobs out or admin pages
            if(to.path == "/weeklong/weeklongAdmin" || to.path == "/weeklong/requestPlrsTable") {
                router.push("/")
            }
        }


       
    }
		




})