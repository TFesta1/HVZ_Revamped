<script setup lang="ts">
  const client = useSupabaseAuthClient()

  const logout = async () => {
    const { error } = await client.auth.signOut()
    if (!error) {
      navigateTo("/login")
    }
  }



</script>

<template>
  <div>
    

    <div class="flex flex-col sm:flex-row">
      <div class="w-full">
        <NuxtLayout>
          <header>
            <ul class="navbar">
              <li>
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/events">Information</NuxtLink>
                <NuxtLink to="/weeklong">Weeklong</NuxtLink>
                <NuxtLink to="/weeklong/requestPlrsTable">Request Players Table (Displayed for Admin)</NuxtLink>
                <button @click="logout">Logout</button>
              </li>
            </ul>
            
          </header>
          
          <NuxtPage/>
        </NuxtLayout>
        
      </div>
    </div>
  </div>
</template>
