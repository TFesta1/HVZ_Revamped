import initializeNitroApp from '../../index';
import { User } from '../../../types';
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client } from 'discord.js';

export default defineEventHandler(async (event, page = 1, pageSize = 30) => {
    const module = await initializeNitroApp();
    // Use the exported functions
    const { connect, ObjectId, DB_Name, collection } = module;

    const db = await connect();

    const col = await collection(process.env.USER_COLNAME!);
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();

    //  For each item, update the user's days++ if they are a human
    console.log("Hello!")


    return null

  
})