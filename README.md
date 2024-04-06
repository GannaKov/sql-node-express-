# template-node-js

npm run start:dev
npm run dev
import { nanoid } from 'nanoid'
model.id = nanoid()
nanoid(10)
\ \_id:'id' + nanoid(),

"nanoid": "^3.3.4" !Nessesary

vercel.json

´´´json
{
"version": 2,
"builds": [
{
"src": "server.js",
"use": "@vercel/node",
"config": { "includeFiles": ["dist/**"] }
}
],
"routes": [
{
"src": "/(.*)",
"dest": "server.js"
}
]
}
´´´

- [Using Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel)
- [How to Deploy Your Node.js Backend on Vercel:](https://kanakkholwal.medium.com/how-to-deploy-your-node-js-backend-on-vercel-a-step-by-step-guide-21796db74601)
- [Step-by-Step Guide](https://masteringbackend.com/posts/how-to-deploy-your-node-js-backend-project-to-vercel-a-step-by-step-guide)
- [postgree node](https://www.youtube.com/watch?v=LZQ5n4PK1jM)
- [mongoose](https://mongoosejs.com/docs/index.html)
