<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';
	const email = ref("") as Ref<string>
	const password = ref("") as Ref<string>
	const client = useSupabaseAuthClient()
	const router = useRouter();
    const signInErrorMsg = ref("")

	// NOTE: Password should be at least 6 chars
	// abcdef
	const signUp = async () => {
		const { error } = await client.auth.signUp({
			email: email.value,
			password: password.value
		})

        if (!error) {
            // isSignUp.value = false
            router.push("/")
            signInErrorMsg.value = ""

            try {
                const response = await axios.get('api/models/seed', {
                    params: {
                        email: email.value
                    }
                });
                // const items = response.data.data;
                // console.log(items);

                
            } catch (error) {
                console.error(error);
            }


        }
        else {
            console.log(error)
            signInErrorMsg.value = error.message
            return error
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
            @submit.prevent="signUp()"
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
                {{ "Sign Up" }}
            </button>
        </form>
        <div>
            {{ signInErrorMsg }}
        </div>

    </div>
</template>

<style scoped>

</style>