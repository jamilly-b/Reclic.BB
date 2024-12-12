'use client'

import { createContext, useState, useContext } from 'react';

// Criando o contexto da câmera
const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

// Provedor para o contexto da câmera
export const CameraProvider = ({ children }:any) => {
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <CameraContext.Provider value={{ stream, startCamera, stopCamera }}>
      {children}
    </CameraContext.Provider>
  );
};