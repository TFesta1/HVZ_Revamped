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
			<form 
				@submit.prevent="login()"
				class ="flex flex-col gap-2"
				>
				<input 
					type="email" 
					v-model="email"
					placeholder="Email"
					class="p-2 bg-gray-600 rounded"

				/>
				<input 
					type="password" 
					v-model="password"
					placeholder="Password"
					class="p-2 bg-gray-600 rounded"
				/>
				<button 
					type="submit"
					class="p-2 bg-gray-600 rounded"

				>
					{{ "Login" }}
				</button>
			</form>
			<a href="/passwordReset">Forgot Password?</a>
			<div>
				{{ signInErrorMsg }}
			</div>

    </div>
</template>

<style scoped>

</style>