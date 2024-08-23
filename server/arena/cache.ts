import { Arena } from "./types";

const DEFINITION_OF_OLD = 1000 * 60 * 60 * 24 * 14; // 14 Days

// ToDo: replace with cache
const ARENAS: Map<string, Arena> = new Map();

export function addArena(arena: Arena) {
  ARENAS.set(arena.id, arena);
}

export function existsNot(arenaId: string): boolean {
  return !ARENAS.has(arenaId);
}

export function get(arenaId: string): Arena | null {
  return ARENAS.get(arenaId) ?? null;
}

export function removeOldArenas() {
  const oldLimit = new Date().getTime() - DEFINITION_OF_OLD;
  [...ARENAS.values()]
    .filter(r => r.lastUsed.getTime() < oldLimit)
    .map(r => r.id)
    .forEach(id => ARENAS.delete(id));
}