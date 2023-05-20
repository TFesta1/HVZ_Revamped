import axios from 'axios'
export default defineNuxtRouteMiddleware((to, from) => {
    console.log("middlweware called")
    const router = useRouter();

    
    // refreshNuxtData("users")

    const user = useSupabaseUser()
    if (!user.value) {
        isLoggedIn().value = false
        console.log("user does not exist")
        // Make sure that there's no infinite loop
        if (to.path != "/login" && to.path != "/signup") {
            router.push("/login")
        }
        
        // router.push("/login")
        console.log(to.path)
    }
    else {
        isLoggedIn().value = true
        console.log("user exists")
        // Redirect them to the home page
        if (to.path == "/login" || to.path == "/signup") {
            router.push("/")
        }

        if (!navPfp().value)
        {
            console.log(navPfp().value, "navPfp().value")
            const user = useSupabaseUser()
            if (user.value) {
                const response = axios.get('api/models/user', {
                    params: {
                        email: user.value.email,
                    }
                }).then((response) => {
                    // console.log(response.data.data.photo, "response.data.data.photo")
                    
                    navPfp().value = response.data.data.photo
                    console.log(navPfp().value, "response.data")
                }
                ).catch((error) => {
                    // console.log(error)
                })


                
            }
        }
       
    }
		




})