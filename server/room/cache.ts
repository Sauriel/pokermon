import { Room } from "./types";

const DEFINITION_OF_OLD = 1000 * 60 * 60 * 24 * 14; // 14 Days

// ToDo: replace with cache
const ROOMS: Map<string, Room> = new Map();

export function addRoom(room: Room) {
  ROOMS.set(room.id, room);
}

export function existsNot(roomId: string): boolean {
  return !ROOMS.has(roomId);
}

export function get(roomId: string): Room | null {
  return ROOMS.get(roomId) ?? null;
}

export function removeOldRooms() {
  const oldLimit = new Date().getTime() - DEFINITION_OF_OLD;
  [...ROOMS.values()]
    .filter(r => r.lastUsed.getTime() < oldLimit)
    .map(r => r.id)
    .forEach(id => ROOMS.delete(id));
}