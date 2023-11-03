<script setup lang="ts">
	const email = ref("") as Ref<string>
	const password = ref("") as Ref<string>
	const client = useSupabaseAuthClient()
	const router = useRouter();
	const signInErrorMsg = ref("")

	// NOTE: Password should be at least 6 chars
	// abcdef
	

	const login = async () => {

		const { error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value
		})

		console.log(error)

		if (!error) {
			// isSignUp.value = false
			router.push("/")
			location.reload();
		}
		else {
			console.log(error)
			signInErrorMsg.value = error.message
			
		}
	}

	const user = useSupabaseUser()
	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				navigateTo("/")
			}
		})
	})


</script>

<template>
    <div>
		<div class="container" id="LoginC">
  			<div class="box" id="LoginB">
			<form
				@submit.prevent="login()"
				class ="flex flex-col gap-2"
				>
				<input 
					type="email" 
					v-model="email"
					placeholder="Email"
					class="p-5 bg-gray-600 rounded"

				/>
				<input 
					type="password" 
					v-model="password"
					placeholder="Password"
					class="p-5 bg-gray-600 rounded"
				/>
				<button  
					type="submit"
					class="p-5 bg-gray-500 rounded"

				>
					{{ "Login" }}
				</button>
			</form>
			<div>
				{{ signInErrorMsg }}
			</div>
			<div>
				<p style="color: green;">{{ displayPasswordSent().value }}</p>
			</div>
			<NuxtLink class="button is-medium is-fullwidth is-dark" to="/signup" id="SignUp">Sign Up</NuxtLink>
			<a href="/passwordReset" id="ForgotPass">Forgot Password?</a>
			</div>
			</div> 
			<!-- We need the sign up centered and half the length of the other buttons while being the same color please -->
    </div>

	<footer>
  <div class="content has-text-centered">
    <p>Developed by Taheemuddin Ahmed & Tanner Festa
    </p>
  </div> 
</footer>
</template>

<style scoped>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  overflow: overlay;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width:320px)  {
#SignUp {
	position: relative;
	top: 1vh;
}

#ForgotPass {
	margin: auto;
	position: relative;
    padding: 10px;
	bottom: -1vh;
}

#LoginB {
	
	margin: auto;
	position: relative;
    padding: 10px;
	bottom: -5vh;
    border-radius: 2px;
    width: 80dvw;
    color:#f3f3f3;
    background-color: #161820;
}
}

@media (min-width:961px)  {
#SignUp {
	position: relative;
	top: 1vh;
	border-radius: 2px;
	padding: 10px;
}

#ForgotPass {
	margin: auto;
	position: relative;
    padding: 10px;
	bottom: -1vh;
}

#LoginB {
	margin: auto;
	position: relative;
    padding: 10px;
	bottom: -5vh;
	right: 5%;
    border-radius: 2px;
    width: 80dvw;
    height: 35dvh;
    color:#f3f3f3;
    background-color: #161820;
}
}


footer {
  position: relative;
  right: 0;
  bottom: -40vh;
  left: 0;
  padding: 1rem;
  background-color: #00000000;
  text-align: center;
}

</style>