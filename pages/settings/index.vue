<script setup lang="ts">
    import axios from 'axios';
    import multer, { MulterError } from 'multer';

    const pfp = ref("") as any
    const team = ref("") as Ref<string>
    const nickname = ref("") as Ref<string>
    const userEmail = useSupabaseUser().value?.email as string
    const updatedText = ref("") as Ref<string>
    const displayPfp = ref("") as Ref<string>

    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, './assets/images');
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + "--" + file.originalname);
    //     }
    // }); 

    // const fileFilter = (req: any, file: { mimetype: any; }, cb: (arg0: null, arg1: boolean) => void) => {
    //     if(((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) && (userEmail !== "" && userEmail !== null)){
    //         cb(null, true);
    //     } else{
    //         cb(null, false);

    //     }
    // };

    // let upload = multer({ storage: storage, fileFilter: fileFilter,});

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
        // console.log(pfp.value, "pfp.value")
        // console.log(team.value, "team.value")
        // console.log(nickname.value, "nickname.value")
        const pfpVal : string = pfp.value
        // console.log(pfpVal, "pfpVal")

        // process.env.

        // const formData = new FormData();
        // formData.append('key', process.env.IMGBB_API_KEY as string);
        // formData.append('image', pfp.value);

        // const updatePfp = async () => {
        const payload : Object = {
            email: await useSupabaseUser().value?.email,
            parameterToUpdate: "photo",
            newValue: pfpVal
        }
        console.log("updating pfp")
        try {
            const response = await axios.post('api/models/updatePfp', payload);
            // const item = response.data.data;
            // user.value = item;
            console.log(response);
            navPfp().value = pfpVal
            // isNotRequesting.value = false;

        } catch (error) {
            console.error(error);
        }
            
        // }
        

        // console.log(payload, "payload")
        // https://api.imgbb.com/1/upload
        // api/models/upload

        // const response = await axios.post('api/models/upload', pfp.value);
        // console.log(response.data.data.url, "response.data.data.url")
        

        // Handle the response here
        // console.log(response.data);
            
        updatedText.value = "Updated"
        pfp.value = ""
        team.value = ""
        nickname.value = ""
    }

    const handleFileChange = async (e: any) => {
        // const file = e;
        const file = e.target.files[0];
        console.log(file, "file")

        const base64Data = await readFileAsBase64(file);
        // console.log(base64Data, "base64Data")
        // const binFile = await createBinaryFile(file);
        // Assign the selected file to the `pfp` variable
        // pfp.value = base64Data
        pfp.value = base64Data
        displayPfp.value = base64Data

        
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