import axios from 'axios'


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    console.log('App created!')
    setupUser()
  })

  const setupUser = async () => {
    if (!navPfp().value) {
      
      console.log(navPfp().value, "navPfp().value")
      const user = useSupabaseUser()
      if (user.value) {
        try {
          // / infront makes it relative to the root
            const response = await axios.get('/api/models/user', {
                params: {
                email: user.value.email,
                }
            })
            const responseData = response.data.data
            // console.log(responseData.photo, "response.data.data.photo")
            navPfp().value = responseData.photo
            stateAdmin().value = responseData.isAdmin
            // console.log(navPfp().value, "response.data")
            console.log("User logged in")
        } catch (error) {
        //   console.log(error)
        }
      }
    }
  }

  return {
        provide: {
            setupUser: () => setupUser(),
        },
    }
})
