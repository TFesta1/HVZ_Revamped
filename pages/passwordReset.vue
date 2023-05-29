<script setup lang="ts">
    import axios from 'axios'
    import { User, InfoEvent } from "../types"
    const signInErrorMsg = ref("") as Ref<string>
    const email = ref("") as Ref<string>
    const client = useSupabaseAuthClient()


    async function resetPass()
    {
        signInErrorMsg.value = "Pending..."
        console.log("Resetting password for email", email.value)

        const response = await axios.get('../api/models/usersNoPhoto');

        const items = response.data.data as User[]
        const emails = items.map( (item) => {
            return item.email
        })

        if(!emails.includes(email.value))
        {
            signInErrorMsg.value = "Email not found"
            return
        }

        // console.log(emails)

        const { error } = await client.auth.resetPasswordForEmail(email.value)
        if (!error) {
            signInErrorMsg.value = "Password reset email sent. Check spam if not in inbox"
        }
        else {
            signInErrorMsg.value = error.message
        }
    }

</script>

<template>
    <div>
        <form 
            @submit.prevent="resetPass()"
            class ="flex flex-col gap-2"
            >
            <input 
                type="email" 
                v-model="email"
                placeholder="Email"
                class="p-2 bg-gray-600 rounded"

            />
            <button 
                type="submit"
                class="p-2 bg-gray-600 rounded"

            >
                {{ "Reset Password" }}
            </button>
        </form>
        <div>
            {{ signInErrorMsg }}
        </div>
    </div>
</template>


<style scoped>

</style>