import initializeNitroApp from '../../index';
import { User } from '../../../types';
import { ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import multer from 'multer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import fs from 'fs-extra';
import { join } from 'path';

axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';



export default defineEventHandler(async (event) => {
	// Set the necessary CORS headers
	// event.node.res.setHeader('Access-Control-Allow-Origin', 'https://api.imgbb.com');
	// event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	const body = await readBody(event) //this is the payload
	const image = body.image
	// console.log(body, "body")

	// if(!image) {
	// 	console.log("Missing key or data")
	// 	return {
	// 		data: "Missing key or image"
	// 	}
	// }

	return {
		data: "Error"
	}
});
