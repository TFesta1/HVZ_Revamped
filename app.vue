<script setup lang="ts">
  const { $setupUser } = useNuxtApp()
  $setupUser()  
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
                <div v-if="userLoggedIn">
                  <NuxtLink to="/">Home</NuxtLink>
                  <NuxtLink to="/events">Information</NuxtLink>
                  <NuxtLink to="/weeklong">Weeklong</NuxtLink>
                  <NuxtLink v-if="stateAdminWatcher" to="/weeklong/requestPlrsTable">Request Players Table (Displayed for Admin)</NuxtLink>
                  <NuxtLink v-if="stateAdminWatcher" to="/weeklong/weeklongAdmin">EBoard Portal</NuxtLink>
                  <NuxtLink to="/settings">Settings</NuxtLink>
                  <button @click="logout">Logout</button>
                  <img :src="navPfp().value" alt="pfp" class="profile-pictures" />

                </div>
                <div v-else>
                  <NuxtLink to="/login">Login</NuxtLink>
                  <NuxtLink to="/signup">Sign Up</NuxtLink>
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
