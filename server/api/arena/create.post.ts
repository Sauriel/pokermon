import randomHex from '~/utils/randomHex';
import type { Arena } from '~/server/arena/types';
import { existsNot, addArena } from '~/server/arena/cache';

export default defineEventHandler(async (event) => {
  let id = '';
  while (id === '') {
    const randomId = randomHex(10);
    if (existsNot(randomId)) {
      id = randomId;
    }
  }
  const now = new Date();
  const arena: Arena = {
    id,
    created: now,
    lastUsed: now,
  }
  addArena(arena);
  return id;
})
