// @deno-types="npm:@types/express@^4.17"
import "https://deno.land/std@0.177.0/dotenv/load.ts";
import express from "npm:express@^4.17";
import { arenaConfig } from "./queues.ts";

const port = Deno.env.get('PORT') || 4567;
const app = express();
app.use('/', arenaConfig);
app.listen(port, () => console.info(`Bull Arena started on http://localhost:${port}`));
