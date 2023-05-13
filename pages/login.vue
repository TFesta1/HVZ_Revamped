<script setup lang="ts">
	const email = ref("") as Ref<string>
	const password = ref("") as Ref<string>
	const isSignUp = ref(false) as Ref<boolean>
	const client = useSupabaseAuthClient()

	// NOTE: Password should be at least 6 chars
	// abcdef
	const signUp = async () => {
		const { error } = await client.auth.signUp({
			email: email.value,
			password: password.value
		})

		if (!error) {
			isSignUp.value = false
		}
		else {
			console.log(error)
		}
	}

	const login = async () => {

		const { error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value
		})

		console.log(error)

		if (!error) {
			// isSignUp.value = false
		}
		else {
			console.log(error)
		}

		

	}

</script>

<template>
    <div>
			<form 
				@submit.prevent="isSignUp ? signUp() : login()"
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
					{{ isSignUp ? "Sign Up" : "Login" }}
				</button>
			</form>

    </div>
</template>

<style scoped>

</style>