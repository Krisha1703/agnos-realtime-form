/* Server Setup with Socket.IO for Real-Time Updates */

import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

let latestPatient: any = null

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(httpServer, {
    cors: { origin: "*" }
  })

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    if (latestPatient) {
      socket.emit("staff-update", latestPatient)
    }

    socket.on("patient-update", (data) => {
      latestPatient = data
      io.emit("staff-update", latestPatient)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })

  httpServer.listen(port, () => {
    console.log(`Ready on http://${hostname}:${port}`)
  })
})