<script setup lang="ts">
  const { $setupUser } = useNuxtApp()
  // $setupUser()  faltyChange
  const client = useSupabaseAuthClient()
  adminEmail().value = "moralekhan10@gmail.com"

  const userLoggedIn = ref(false);

  const stateAdminWatcher = ref(false);

  const logout = async () => {
    const { error } = await client.auth.signOut()
    if (!error) {
      navigateTo("/login")
      navPfp().value = ""
      userLoggedIn.value = false //Just instantly set it to false
    }
    // useSupabaseUser().value = null
  }

  // Works for logging in, and delayed refresh, but not instantly
  watch( () => useSupabaseUser().value,
      (session) => {
        userLoggedIn.value = session !== null;
      }
  );

  onMounted(async () => {
    const session = useSupabaseUser().value
    if (session) {
      userLoggedIn.value = true
    }



    console.log(stateAdmin().value, "stateAdmin")
  })

  watch( () => stateAdmin().value,
      (session) => {
        stateAdminWatcher.value = session;
      }
  );


  // useSupabaseUser().value?.user_metadata.avatar_url = "https://avatars.dicebear.com/api/avataaars/1.svg"

  // console.log(isLoggedIn().value)

  



</script>

<template>
  <div>
    

    <div class="flex flex-col sm:flex-row">
      <div class="w-full">
        <NuxtLayout>
          <header>
            <ul class="navbar">
              <li>
                <img src="~/assets/images/Primary-Icon-cutout.png" width="28" height="28" alt="Logo" class="logo-container">

                <div v-if="userLoggedIn">
                  <!-- <div class="logo-container"> -->
                  <!-- <IconsHVZIconImage/> -->
                  <!-- </div> -->

                  <div class="nav-links" style="display: flex; justify-content: center;">
                    <NuxtLink to="/" class="whiteBold">Home</NuxtLink>
                    <NuxtLink to="/events" class="whiteBold">Invitational</NuxtLink>
                    <NuxtLink to="/weeklong" class="whiteBold">Weeklong</NuxtLink>
                    <a href="https://www.instagram.com/nphvz" class="whiteBold">Instagram</a>
                    <a href="https://discord.gg/fMAfykJtgJ" class="whiteBold">Discord</a>
                    <NuxtLink to="/settings" class="whiteBold">Settings</NuxtLink>
                    <NuxtLink class="orangeBold" v-if="stateAdminWatcher" to="/weeklong/requestPlrsTable">[Request Players Table]</NuxtLink>
                    <NuxtLink class="greenBold" v-if="stateAdminWatcher" to="/weeklong/weeklongAdmin">[EBoard Portal]</NuxtLink>
                  </div>
                  
                  
                  <button @click="logout" class="button is-transparent top-right">Logout</button>
                  <!-- <img :src="navPfp().value" alt="pfp" class="profile-pictures" /> -->

                </div>
                <div v-else class="buttons is-pulled-left">
                  <NuxtLink to="/" class="whiteBold">Home</NuxtLink>
                  <NuxtLink to="/events" class="whiteBold">Invitational</NuxtLink>
                  <a href="https://www.instagram.com/nphvz" class="whiteBold">Instagram</a>
                  <a href="https://discord.gg/fMAfykJtgJ" class="whiteBold">Discord</a>
                  <NuxtLink class="button is-transparent m1-4" to="/login">Login</NuxtLink>
                  <!-- <NuxtLink class="button is-transparent" to="/signup">Sign Up</NuxtLink> -->
                </div>
                
                
              </li>
            </ul>
            
          </header>
          
          <NuxtPage/>
        </NuxtLayout>
        
      </div>
    </div>
  </div>
</template>
