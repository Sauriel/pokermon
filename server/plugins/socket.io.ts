import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server, Socket } from "socket.io";
import { defineEventHandler } from "h3";
import { ChatMessage } from "~/components/chatMessage";

const sockets: Socket[] = [];

export function sendMessages(message: ChatMessage) {
  sockets.forEach((socket) => {
    socket.emit('message-channel', message);
  });
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  // @ts-ignore type conversion
  io.bind(engine);

  io.on("connection", (socket) => {
    sockets.push(socket);
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      // @ts-ignore type conversion
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});