// @deno-types="npm:@types/bull-arena#3.0.7"
import Arena from "npm:bull-arena@3.30.4";
import { Queue } from "npm:bullmq"

const redis = {
  port: parseInt(Deno.env.get('REDIS_PORT') || '10000'),
  host: Deno.env.get('REDIS_HOST') || 'localhost',
  password: Deno.env.get('REDIS_PASS'),
  db: parseInt(Deno.env.get('REDIS_DB') || '0'),
}

const queues =
  (Deno.env.get("QUEUES") || '')
    .split(',')
    .map((s) => s.trim())
    .sort()
    .map((name) => ({
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
