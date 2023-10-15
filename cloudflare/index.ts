import { FetchEvent } from '@cloudflare/workers-types';
import { PrismaClient } from '@prisma/client/edge';
import { handleRequest } from 'bridg/server/request-handler';

const db = new PrismaClient();

// @ts-ignore
addEventListener('fetch', (event) => event.respondWith(handleEvent(event)));

async function handleEvent(event: FetchEvent): Promise<Response> {
  const { request } = event;
  const body = await getRequestBody(request);

  const { data } = await handleRequest(body, { db, uid: 'MOCK_UID', rules: { default: true } });

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

const getRequestBody = async (request: FetchEvent['request']) => {
  const data: string = await ((request.headers.get('content-type') || '').includes('application/json')
    ? request.json()
    : request.text());

  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};
