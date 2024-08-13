<template>
  <div>
    <p>Status: {{ isConnected ? 'connected' : 'disconnected' }}</p>
    <p>Transport: {{ transport }}</p>
    <input type="text" v-model="userName" placeholder="Please enter your username">
    <button @click='() => sendCard(0)'>0</button>
    <button @click='() => sendCard(1)'>1</button>
    <button @click='() => sendCard(2)'>2</button>
    <button @click='() => sendCard(3)'>3</button>
    <button @click='() => sendCard(5)'>5</button>
    <button @click='() => sendCard(8)'>8</button>
    <button @click='() => sendCard(13)'>13</button>
    <ul>
      <li v-for="message of messages" :key="message.date">
        <span>{{ message.date }}</span>
        <span>{{ message.user }}</span>
        <span>{{ message.cardValue }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { socket } from './socket';
import type { ChatMessage } from './chatMessage';

const DEFAULT_USERNAMES = [
  "NullPointerDerek",
  "BugHunter77",
  "404BrainNotFound",
  "SemicolonBandit",
  "InfiniteLoopGuru",
  "DebuggerInDisguise",
  "SyntaxTerrorist",
  "StackOverflower",
  "CoffeeOrDie",
  "BinaryBeast",
  "CodeNinja42",
  "CtrlAltDelight",
  "CommitmentIssues",
  "VariableVillain",
  "ScriptKitty",
  "VersionController",
  "InfiniteRecursion",
  "LoopDeLoop",
  "BracketsAndBraces",
  "CompileMeMaybe"
];

const isConnected = ref(false);
const transport = ref('N/A');
const userName = ref('');
const messages = ref<ChatMessage[]>([]);

onMounted(() => {
  userName.value = DEFAULT_USERNAMES[Math.floor(Math.random() * DEFAULT_USERNAMES.length)];

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

function sendCard(cardValue: number) {
  const message: ChatMessage = {
    user: userName.value,
    date: new Date(),
    cardValue,
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