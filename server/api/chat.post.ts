import { ChatMessage } from "~/components/chatMessage";
import { sendMessages } from "../plugins/socket.io";

export default defineEventHandler(
  async (event) => {
    const message = await readBody<ChatMessage>(event);
    sendMessages(message);
    return message;
  }
)