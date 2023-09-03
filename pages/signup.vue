<script setup lang="ts">
    import { User } from "types"
    import axios from 'axios';
	const email = ref("") as Ref<string>
	const password = ref("") as Ref<string>
    const reEnterPassword = ref("") as Ref<string>
    const discordUsername = ref("") as Ref<string>
	const client = useSupabaseAuthClient()
	const router = useRouter();
    const signInErrorMsg = ref("")

	// NOTE: Password should be at least 6 chars
	// abcdef
	const signUp = async () => {
        signInErrorMsg.value = "Pending..."

        // if (discordUsername.value == "") {
        //     signInErrorMsg.value = "Discord Username is Required"
        //     return
        // }

        if (password.value != reEnterPassword.value) {
            signInErrorMsg.value = "Passwords do not match"
            return
        }

        if(email.value != "moralekhan10@gmail.com")
        {
            if (!email.value.includes("newpaltz.edu")) 
            {
                signInErrorMsg.value = "Must use New Paltz Email"
                return
            }

        }
        

        if(password.value.length < 6 || reEnterPassword.value.length < 6) {
            signInErrorMsg.value = "Password must be at least 6 characters"
            return
        }



		const { error } = await client.auth.signUp({
			email: email.value,
			password: password.value
		})

        if (!error) {
            const emails = ref<User[]>([]);

            const responseUsers = await axios.get('api/models/users');
            const items = responseUsers.data.data;

            emails.value = items
                .filter((item: User) => item.email == email.value)
                .map((item : User) => ({
                    email: item.email
            }));
            const emailsLength: number = emails.value.length
            console.log(emails.value.length, "emails.length")
            if(emailsLength >= 1)
            {
                signInErrorMsg.value = "Email already registered"
                displayPasswordSent().value = ""
                return
            }

            // isSignUp.value = false
            router.push("/")
            signInErrorMsg.value = ""

            //On a successful login, this gets set to nothing
            displayPasswordSent().value = "Password sent from HVZRelations. Check spam if not in inbox"
            

            try {
                const response = await axios.get('api/models/seed', {
                    params: {
                        email: email.value,
                        discUser: discordUsername.value
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
                placeholder="New Paltz Email"
                class="p-2 bg-gray-600 rounded"

            />
            <!-- <input 
                type="text" 
                v-model="discordUsername"
                placeholder="Discord (Example: name#1000) Must be in the Server"
                class="p-2 bg-gray-600 rounded"
            /> -->
            <input 
                type="password" 
                v-model="password"
                placeholder="Password"
                class="p-2 bg-gray-600 rounded"
            />
            <input 
                type="password" 
                v-model="reEnterPassword"
                placeholder="Re-enter Password"
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