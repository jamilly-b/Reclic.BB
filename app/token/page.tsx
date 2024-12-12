'use client';

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CpfUse() {
  const [formatedCPF, setFormatedCPF] = useState<string>(''); // Estado para armazenar o CPF formatado

  // Função para atualizar o valor do input ao clicar nos botões
  const updatedEntry = (value: string) => {
    // Limita a entrada a 11 dígitos antes de formatar
    if (formatedCPF.replace(/\D/g, '').length >= 4) return;

    // Atualiza o valor do CPF com o novo número e aplica a máscara
    setFormatedCPF(formatedCPF + value);
  };

  // Função para remover o último dígito (funcionalidade do botão "X")
  const handleBackspace = () => {
    // Remove o último caractere e reaplica a máscara no restante
    const valorAtualizado = formatedCPF.slice(0, -1);
    setFormatedCPF(valorAtualizado);
  };

  return (
    <main className="flex h-screen">
      <div className="w-8/12 m-auto text-center">
        <div className="w-20 mb-2 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32"><path fill="#4153cd" d="M15 23v1a1 1 0 0 1-1 1h-2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.586A2 2 0 0 1 4.586 22l7.738-7.739A8 8 0 1 1 20 20h-2v2a1 1 0 0 1-1 1zm7-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/></svg>
          
        </div>
        <div>
          <span className="font-bold text-[#4153cd]">Token</span>
        </div>
        <div>
          <span>Insira o código de Identificação do ponto de coleta</span>
        </div>
        <div className="">
          {/* Campo de input para o CPF formatado */}
          <Input
            value={formatedCPF}
            readOnly
            className="w-60 text-center mt-2 mx-auto"
          />

          <div className="mt-5 space-y-3 grid">
            {/* Números de 1 a 9 */}
            <div className="flex gap-4 mx-auto">
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('1')}>1</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('2')}>2</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('3')}>3</button>
            </div>
            <div className="flex gap-4 mx-auto">
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('4')}>4</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('5')}>5</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('6')}>6</button>
            </div>
            <div className="flex gap-4 mx-auto">
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('7')}>7</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('8')}>8</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('9')}>9</button>
            </div>

            {/* Botão 0 e "X" para apagar */}
            <div className="flex gap-4 mx-auto">
              <button className="p-5 rounded-md bg-transparent" disabled>&nbsp;&nbsp;&nbsp;</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={() => updatedEntry('0')}>0</button>
              <button className="shadow-sm p-5 rounded-md border" onClick={handleBackspace}>X</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
