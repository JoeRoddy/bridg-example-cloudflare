import { FetchEvent } from '@cloudflare/workers-types';
import { PrismaClient } from '@prisma/client/edge';
import { handleRequest } from 'bridg/server/request-handler';
const db = new PrismaClient();

// @ts-ignore
addEventListener('fetch', (event) => event.respondWith(handleEvent(event)));

async function handleEvent(event: FetchEvent): Promise<Response> {
  const { request } = event;
  const body = await getRequestBody(request);

  const userId = 'cld4ar9fg000clfd96gujbblu';
  const { data, status } = await handleRequest(body, {
    db,
    uid: undefined,
    rules: { default: true },
  });

  return getJsonResponse(data);
}

const getJsonResponse = (data: {}) =>
  new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',

      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  });

async function parseBodyFromReq(request: FetchEvent['request']) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await request.json());
  } else if (contentType.includes('application/text')) {
    return request.text();
  } else if (contentType.includes('text/html')) {
    return request.text();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    const body: Record<string, any> = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return 'a file';
  }
}

const parseJsonSafely = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return json;
  }
};

const getRequestBody = (request: FetchEvent['request']) =>
  parseBodyFromReq(request).then((json) => parseJsonSafely(json));
