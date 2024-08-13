<template>
  <div>
    <p>Status: {{ isConnected ? 'connected' : 'disconnected' }}</p>
    <p>Transport: {{ transport }}</p>
    <input type="text" v-model="userName">
    <button @click='onSendMessage'>Test</button>
    <ul>
      <li v-for="message of messages" :key="message.date">
        <span>{{ message.date }}</span>
        <span>{{ message.user }}</span>
        <span>{{ message.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { socket } from './socket';

type ChatMessage = {
  text: string;
  date: Date;
  user: strign;
}

const isConnected = ref(false);
const transport = ref('N/A');
const userName = ref('User123');
const messages = ref<ChatMessage[]>([]);

onMounted(() => {
  if (socket.connected) {
    onConnect();
  }

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
});

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on('upgrade', (rawTransport) => {
    transport.value = rawTransport.name;
  });

  socket.on('message-channel', (message: ChatMessage) => {
    messages.value.push(message);
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = 'N/A';
}

onBeforeUnmount(() => {
  socket.off('connect', onConnect);
  socket.off('disconnect', onDisconnect);
});

function onSendMessage() {
  const message: ChatMessage = {
    text: 'Hello World',
    date: new Date(),
    user: userName.value
  }
  $fetch('/api/chat', {
    method: 'POST',
    body: message
  });
}
</script>

<style>
  li {
    display: flex;
    gap: 2rem;
  }
</style>