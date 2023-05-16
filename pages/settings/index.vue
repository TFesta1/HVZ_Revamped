<script setup lang="ts">
    import axios from 'axios';

    const pfp = ref("") as any
    const team = ref("") as Ref<string>
    const nickname = ref("") as Ref<string>
    const userEmail = useSupabaseUser().value?.email as string
    const updatedText = ref("") as Ref<string>

    const readFileAsBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result as string;
                resolve(base64Data);
            };

            reader.onerror = (error) => {
                reject(error);
            };
            // Stores large binary data
            const blob = new Blob([file]);
            reader.readAsDataURL(blob);
        });
    };

    

    const apply = async () => {

        // const { error } = await client.auth.signInWithPassword({
        //     team: email.value,
        //     nickname: password.value
        // })
        console.log(pfp.value, "pfp.value")
        console.log(team.value, "team.value")
        console.log(nickname.value, "nickname.value")

        // process.env.

        // const formData = new FormData();
        // formData.append('key', process.env.IMGBB_API_KEY as string);
        // formData.append('image', pfp.value);

        const payload = {
            key: "2a8619cee5b2f532a6999df531266f22",
            image: pfp.value
        };

        console.log(payload, "payload")

        const response = await axios.post('https://api.imgbb.com/1/upload', payload);

        console.log(response.data.data.url, "response.data.data.url")

        // Handle the response here
        // console.log(response.data);
            
            updatedText.value = "Updated"
            pfp.value = ""
            team.value = ""
            nickname.value = ""
    }

    const handleFileChange = async (e: any) => {
        const file = e;

        const base64Data = await readFileAsBase64(file);
        // Assign the selected file to the `pfp` variable
        pfp.value = base64Data

         // Create a new FileReader
        // const reader = new FileReader();
        // // Set up the onload event handler
        // reader.onload = () => {
        //     // Get the base64 data from the result
        //     const base64Data = reader.result;
            
        //     // Assign the base64 data to the `pfp` variable
        //     pfp.value = base64Data;
        //     console.log(pfp.value, "pfp.value")
        //     // console.log("hi")
        // };
        // console.log(pfp.value, "pfp.value")
        
        // console.log(e.target.files[0], "e.target.files[0]")

        // const reader = new FileReader();
        // reader.readAsDataURL(file);
    }

    // handleFileChange(event) {
    //   const file = event.target.files[0];
    //   // Assign the selected file to the `pfp` variable
    //   this.pfp = file;
    // },

</script>

<template>
    <div>
        <form @submit.prevent="apply()" class ="flex flex-col gap-2">
            <input
                type="file"
                @change="handleFileChange"
                accept="image/*"
                ref="fileInput"
                class="p-2 bg-gray-600 rounded"
            />
            <input
                type="text"
                v-model="team"
                placeholder="Team"
                class="p-2 bg-gray-600 rounded"
            />
            <input
                type="text"
                v-model="nickname"
                placeholder="Nickname"
                class="p-2 bg-gray-600 rounded"
            />
            <button 
                type="submit"
                class="p-2 bg-gray-600 rounded"

            >
                {{ "Apply" }}
            </button>
        </form>
        {{ updatedText }}
    </div>
</template>


<style scoped>

</style>