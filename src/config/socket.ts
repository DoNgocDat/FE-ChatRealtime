import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://smartchat-fh2a.onrender.com";

class SocketService {
    private socket: Socket | null = null;

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event: string, callback: (data: any) => void) {
        this.socket?.on(event, callback);
    }

    emit(event: string, data: any) {
        this.socket?.emit(event, data);
    }

    getSocket() {
        return this.socket;
    }

    getId(): string | null {
        return this.socket?.id || null;
    }
}

export const socketService = new SocketService();