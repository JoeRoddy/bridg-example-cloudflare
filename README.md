# Bridg - Cloudflare Workers

### Up and Running

1. Grab a hosted Postgres DB. You can get a free one on https://www.elephantsql.com
2. `git clone https://github.com/JoeRoddy/bridg-example-cloudlare` and cd into directory
3. Create a file called `.env.local` at the root of your project and add your connection string to your DB:

   ```
   DATABASE_URL="your-postgres-connection-string"
   ```

4. Create a [Prisma Data Platform](https://cloud.prisma.io/) account if you don't have one yet and configure your Database for use with [Prisma Data Proxy](https://www.prisma.io/docs/guides/deployment/edge/deploy-to-cloudflare-workers#6-import-your-project-into-the-prisma-data-platform)
   - This is necessary to use Prisma with Cloudflare workers
   - After configuring the data proxy, you should be given a proxy url
5. Initialize your Cloudflare project:

   - `npx wrangler generate`
   - Select "None"
   - In your generated `wrangler.toml` file, add your Prisma proxy url from step 3.

   ```shell
    [vars]
    DATABASE_URL="prisma://aws-us-east-1...."
   ```

6. `npm install`
7. `npm run generate`
8. `npm run dev`

### Learning

- Open `/src/pages/index.tsx` to start modifying your query, your prisma client should work exactly as it would on the server
- Open `/cloudflare/index.ts` to see how Bridg runs queries, and to change your database rules
