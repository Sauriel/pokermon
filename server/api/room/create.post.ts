import randomHex from '~/utils/randomHex';
import type { Room } from '~/server/room/types';
import { existsNot, addRoom } from '~/server/room/cache';

export default defineEventHandler(async (event) => {
  let id = '';
  while (id === '') {
    const randomId = randomHex(10);
    if (existsNot(randomId)) {
      id = randomId;
    }
  }
  const now = new Date();
  const room: Room = {
    id,
    created: now,
    lastUsed: now,
  }
  addRoom(room);
  return id;
})
