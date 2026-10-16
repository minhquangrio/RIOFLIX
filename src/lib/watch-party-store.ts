export interface WatchRoomItem {
  id: string;
  slug: string;
  title: string;
  movie_id: string;
  movie_slug: string;
  movie_title: string;
  movie_poster: string;
  episode_name: string;
  video_url: string;
  host_user_id: string;
  host_name: string;
  host_avatar: string;
  host_avatar_frame?: string;
  is_private: boolean;
  password?: string;
  max_viewers: number;
  current_viewers: number;
  scheduled_time: string;
  status: "active" | "ended";
  current_time: number;
  is_playing: boolean;
  created_at: string;
  updated_at: string;
}

export interface WatchMessage {
  id: string;
  room_id: string;
  user_id?: string;
  user_name: string;
  user_avatar?: string;
  user_role: "host" | "viewer" | "system";
  content: string;
  created_at: string;
}

export interface Participant {
  user_id: string;
  user_name: string;
  user_avatar?: string;
  last_ping: number;
}

// Global singleton to persist state in Node / Next dev server
declare global {
  // eslint-disable-next-line no-var
  var __watchRooms: Map<string, WatchRoomItem> | undefined;
  // eslint-disable-next-line no-var
  var __watchMessages: Map<string, WatchMessage[]> | undefined;
  // eslint-disable-next-line no-var
  var __watchParticipants: Map<string, Map<string, Participant>> | undefined;
}

if (!global.__watchRooms) {
  global.__watchRooms = new Map();
} else {
  global.__watchRooms.clear();
}

if (!global.__watchMessages) {
  global.__watchMessages = new Map();
} else {
  global.__watchMessages.clear();
}

if (!global.__watchParticipants) {
  global.__watchParticipants = new Map();
} else {
  global.__watchParticipants.clear();
}

export const watchPartyStore = {
  getRooms(): WatchRoomItem[] {
    const rooms = Array.from(global.__watchRooms!.values())
      .filter((r) => r.status === "active")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return rooms;
  },

  getRoom(slug: string): WatchRoomItem | null {
    const room = global.__watchRooms!.get(slug);
    if (!room || room.status === "ended") return null;
    return room;
  },

  createRoom(data: Omit<WatchRoomItem, "id" | "created_at" | "updated_at" | "current_viewers" | "status" | "current_time" | "is_playing">): WatchRoomItem {
    const id = `room-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();
    const newRoom: WatchRoomItem = {
      ...data,
      id,
      current_viewers: 1,
      scheduled_time: data.scheduled_time || now,
      status: "active",
      current_time: 0,
      is_playing: true,
      created_at: now,
      updated_at: now,
    };
    global.__watchRooms!.set(newRoom.slug, newRoom);

    // Initial system message
    this.addMessage({
      room_id: newRoom.slug,
      user_name: "Hệ Thống",
      user_role: "system",
      content: `Phòng chiếu "${newRoom.title}" đã được tạo. Chúc bạn xem phim vui vẻ! 🎉`,
    });

    return newRoom;
  },

  updateRoomState(slug: string, updates: Partial<WatchRoomItem>): WatchRoomItem | null {
    const room = global.__watchRooms!.get(slug);
    if (!room) return null;
    const updated = { ...room, ...updates, updated_at: new Date().toISOString() };
    global.__watchRooms!.set(slug, updated);
    return updated;
  },

  endRoom(slug: string): boolean {
    const room = global.__watchRooms!.get(slug);
    if (!room) return false;
    room.status = "ended";
    global.__watchRooms!.set(slug, room);
    return true;
  },

  getMessages(slug: string): WatchMessage[] {
    return global.__watchMessages!.get(slug) || [];
  },

  addMessage(msg: Omit<WatchMessage, "id" | "created_at">): WatchMessage {
    const id = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newMsg: WatchMessage = {
      ...msg,
      id,
      created_at: new Date().toISOString(),
    };
    const list = global.__watchMessages!.get(msg.room_id) || [];
    list.push(newMsg);
    // Keep max 200 recent messages
    if (list.length > 200) list.shift();
    global.__watchMessages!.set(msg.room_id, list);
    return newMsg;
  },

  pingParticipant(slug: string, participant: Participant): number {
    let roomMap = global.__watchParticipants!.get(slug);
    if (!roomMap) {
      roomMap = new Map();
      global.__watchParticipants!.set(slug, roomMap);
    }
    roomMap.set(participant.user_id, { ...participant, last_ping: Date.now() });

    // Clean up participants inactive for > 15s
    const now = Date.now();
    for (const [uid, p] of roomMap.entries()) {
      if (now - p.last_ping > 15000) {
        roomMap.delete(uid);
      }
    }

    const count = Math.max(1, roomMap.size);
    this.updateRoomState(slug, { current_viewers: count });
    return count;
  },

  getParticipants(slug: string): Participant[] {
    const roomMap = global.__watchParticipants!.get(slug);
    if (!roomMap) return [];
    return Array.from(roomMap.values());
  }
};
