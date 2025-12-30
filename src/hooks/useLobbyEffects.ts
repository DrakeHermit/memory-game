import { useSocketStore } from "../store/socketStore";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UseLobbyEffectsProps {
  roomId: string | undefined;
  isJoiningViaLink: boolean;
  isRoomCreator: boolean;
}
export const useGameSocketEffects = () => {
  const navigate = useNavigate();
  const { socket, connect, isConnected } = useSocketStore();
  const hasAttemptedConnect = useRef(false);

  useEffect(() => {
    if (!isConnected && !hasAttemptedConnect.current) {
      hasAttemptedConnect.current = true;
      connect();
    }
  }, [isConnected, connect]);

  useEffect(() => {
    if (!socket) return;

    const handleNavigateHome = () => {
      navigate("/");
    };

    socket.on("gameReset", handleNavigateHome);
    socket.on("roomRemoved", handleNavigateHome);

    return () => {
      socket.off("gameReset", handleNavigateHome);
      socket.off("roomRemoved", handleNavigateHome);
    };
  }, [socket, navigate]);
};
 
export const useLobbyEffects = ({ roomId, isJoiningViaLink, isRoomCreator }: UseLobbyEffectsProps) => { 
  const navigate = useNavigate(); 
  const { socket, joinRoom, connect, isConnected } = useSocketStore();
  const hasJoinedRoom = useRef(false);
  const hasAttemptedConnect = useRef(false);

  useEffect(() => {
    if (!isConnected && !hasAttemptedConnect.current) {
      hasAttemptedConnect.current = true;
      connect();
    }
  }, [isConnected, connect]);

  useEffect(() => { 
    if (!socket) return; 

    const handleGameStarted = () => {
      navigate(`/game/${roomId}`);
    };

    const handleRoomRemoved = () => {
      navigate("/");
    };
    
    socket.on("gameStarted", handleGameStarted);
    socket.on("roomRemoved", handleRoomRemoved);

    return () => {
      socket.off("gameStarted", handleGameStarted);
      socket.off("roomRemoved", handleRoomRemoved);
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