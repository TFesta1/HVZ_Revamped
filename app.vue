<script setup lang="ts">
  const client = useSupabaseAuthClient()

  const userLoggedIn = ref(false);

  const logout = async () => {
    const { error } = await client.auth.signOut()
    if (!error) {
      navigateTo("/login")
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
  })

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
                  <NuxtLink to="/weeklong/requestPlrsTable">Request Players Table (Displayed for Admin)</NuxtLink>
                  <button @click="logout">Logout</button>
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
