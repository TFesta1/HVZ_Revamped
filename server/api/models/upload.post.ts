import initializeNitroApp from '../../index';
import { User } from '../../../types';
import { ref } from 'vue';
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';



export default defineEventHandler(async (event) => {
	// Set the necessary CORS headers
	event.node.res.setHeader('Access-Control-Allow-Origin', 'https://api.imgbb.com');
	event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const body = await readBody(event) //this is the payload
	const key = body.key 
	const image = body.image
	console.log(body, "body")

	if(!key || !image) {
		console.log("Missing key or data")
		return {
			data: "Missing key or image"
		}
	}

	const payload = {
		key: key,
		image: image
	}

	console.log(payload, "payload")

	const response = await axios.post('https://api.imgbb.com/1/upload', payload)
	console.log(response, "response")



	// Make the request to 'https://api.imgbb.com/1/upload'
	//   const response = await axios.post('https://api.imgbb.com/1/upload', payload);

	return {
		data: "Uploaded"
	}
});
