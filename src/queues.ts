import Arena from "npm:bull-arena";
import { Queue } from "npm:bullmq"

const redis = { url: Deno.env.get('REDIS_URL') };
const queues = (Deno.env.get("QUEUES") || '')
  .split(',')
  .map((s) => s.trim())
  .sort()
  .map(name => ({
    name,
    redis,
    type: 'bullmq',
    hostId: "worker",
  }));

export const arenaConfig = Arena({
  BullMQ: Queue,
  queues,
}, {
  basePath: '/',
  disableListen: true, // let Express listen
});
