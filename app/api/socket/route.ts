import { Server } from "socket.io"

export async function GET(req: any, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)

    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("Connected:", socket.id)

      socket.on("patient-update", (data) => {
        socket.broadcast.emit("staff-update", data)
      })

      socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id)
      })
    })
  }

  return new Response("Socket ready")
}