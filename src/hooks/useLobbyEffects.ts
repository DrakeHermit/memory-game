import { useSocketStore } from "../store/socketStore";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UseLobbyEffectsProps {
  roomId: string | undefined;
  isJoiningViaLink: boolean;
  isRoomCreator: boolean;
}
 
export const useLobbyEffects = ({ roomId, isJoiningViaLink, isRoomCreator }: UseLobbyEffectsProps) => { 
  const navigate = useNavigate(); 
  const { socket, joinRoom } = useSocketStore();
  const hasJoinedRoom = useRef(false);

  useEffect(() => { 
    if (!socket) return; 

    const handleGameStarted = () => {
      navigate(`/game/${roomId}`);
    }
    
    socket.on("gameStarted", handleGameStarted);

    return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  }, [socket, navigate, roomId]);
  
  useEffect(() => {
    if (socket && roomId && isJoiningViaLink && !hasJoinedRoom.current) {
      const defaultName = `Guest-${Math.random().toString(36).substr(2, 4)}`;
      joinRoom(roomId, defaultName);
      hasJoinedRoom.current = true;
    }

    if(!roomId || !isJoiningViaLink) {
      hasJoinedRoom.current = false;
    }
  }, [socket, roomId, joinRoom, isJoiningViaLink]);
  
  useEffect(() => {
    if (socket && roomId && isRoomCreator) {
      socket.emit("getGameState", { roomId });
    }
  }, [socket, roomId, isRoomCreator]);
  
  useEffect(() => {
    if (socket && roomId && isJoiningViaLink) {
      const timer = setTimeout(() => {
        socket.emit("getGameState", { roomId });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [socket, roomId, isJoiningViaLink]);
}