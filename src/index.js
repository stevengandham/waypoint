import { handleSubmit } from './routes/submit.js';
import { handleGroup } from './routes/group.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/submit") {
      return handleSubmit(request, env);
    }

    if (request.method === "POST" && url.pathname === "/group") {
      return handleGroup(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
