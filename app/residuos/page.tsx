'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCamera } from '../contexts/cameraContext';
import Image from 'next/image';

export default function Residuos() {
  const { stream, startCamera, stopCamera } = useCamera(); // Obtém as funções do contexto da câmera
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [detectedItems, setDetectedItems] = useState();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  // Efeito para configurar o vídeo sempre que o stream for atualizado
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;

      // Captura a foto automaticamente após 3 segundos
      setInterval(() => {
        capturePhoto();
      }, 3000);
    }
  }, [stream]);

  // Função para capturar a foto
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Define o tamanho da imagem a ser capturada com base no vídeo
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Desenha o vídeo no canvas (captura o frame)
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Converte o conteúdo do canvas em um blob (imagem)
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
            setSelectedFile(file);  // Define o arquivo capturado
            handleUpload(file);  // Faz o upload automaticamente após capturar a imagem
          }
        }, 'image/jpeg');
      }
    }
  };

  // Função para enviar a imagem capturada para o backend (Flask)
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('imagem', file);

    try {
      const response = await fetch('http://localhost:5000/detectar-objetos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();
      setResult(data);  // Armazena o resultado da requisição no estado
        handleSelectItems(data)
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };

  const handleSelectItems = (data:any) => {
    if(data && data["objetos_detectados"]){
        data["objetos_detectados"].map((item:any)=>{
            if(item["nome"] == "Mobile phone"){
                
            }
        })
    }  
    }

  return (
    <main className="flex h-screen">
      <div className="w-8/12 m-auto text-center">
        <div className="w-20 mb-2 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#4153cd" d="m21.82 15.42l-2.5 4.33c-.49.86-1.4 1.31-2.32 1.25h-2v2l-2.5-4.5L15 14v2h2.82l-2.22-3.85l4.33-2.5l1.8 3.12c.52.77.59 1.8.09 2.65M9.21 3.06h5c.98 0 1.83.57 2.24 1.39l1 1.74l1.73-1l-2.64 4.41l-5.15.09l1.73-1l-1.41-2.45l-2.21 3.85l-4.34-2.5l1.8-3.12c.41-.83 1.26-1.41 2.25-1.41m-4.16 16.7l-2.5-4.33c-.49-.85-.42-1.87.09-2.64l1-1.73l-1.73-1l5.14.08l2.65 4.42l-1.73-1L6.56 16H11v5H7.4a2.51 2.51 0 0 1-2.35-1.24"/>
          </svg>
        </div>
        <div>
          <span className="font-bold text-[#4153cd] text-3xl">Resíduos</span>
        </div>
        <div className="mt-2">
          <span>Coloque o(s) eletrônico(s) no recipiente PEV</span>
        </div>

        {/* Botão para ativar a câmera */}
        <Button onClick={startCamera} className='bg-[#4153cd] hover:bg-[#4153cd] mt-2'>
          Ativar Câmera
        </Button>

        {/* Exibe o vídeo se a câmera estiver ativa */}
        {stream && (
          <div className="mt-4">
            <video ref={videoRef} autoPlay className="border rounded-lg" />
          </div>
        )}

        {/* Canvas invisível para capturar a imagem */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Resultado da requisição após enviar a imagem */}
        {result && (
          <div className="mt-4">
            <h3 className="text-xl font-bold" >Resultado da Detecção:</h3>
            <pre className="text-left">{JSON.stringify(result, null, 2)}</pre>
            <div id='ImagesItems'>
                <div>
                    {result["objetos_detectados"].map(()=>{

                    })}
                </div>
            
         </div>
            
          </div>
        )}

        {/* Botão para desativar a câmera */}
        {stream && (
          <Button onClick={stopCamera} className='bg-red-500 hover:bg-red-700 mt-2'>
            Desativar Câmera
          </Button>
        )}
      </div>
    </main>
  );
}