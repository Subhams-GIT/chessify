import { wss } from './index';
import { createClient, RedisClientType } from 'redis';
const client:RedisClientType = createClient();



async function main(){
    await client.connect();

}
