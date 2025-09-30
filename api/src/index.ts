import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'


import premarketRoutes from './routes/premarketRoutes.js'
import dashRoutes from './routes/dashboardRoutes.js'
import priceRoutes from './routes/priceRoutes.js'

const app = new Hono()
app.use("/*", cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }))
// app.use('*', cors({
//   origin: 'http://localhost:3000', // or '*' for dev
//   allowHeaders: ['Content-Type', 'Authorization'],
//   allowMethods: ['GET', 'POST', 'OPTIONS'],
//   maxAge: 86400, // 1 day preflight cache
// }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/premarket", premarketRoutes);
app.route("/dashboard", dashRoutes);
app.route("/price", priceRoutes);

serve({
  fetch: app.fetch,
  port: 4000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
