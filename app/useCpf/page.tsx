'use client';

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CpfUse() {
  const [formatedCPF, setFormatedCPF] = useState<string>(''); // Estado para armazenar o CPF formatado

  // Função para atualizar o valor do input ao clicar nos botões
  const updatedEntry = (value: string) => {
    // Limita a entrada a 11 dígitos antes de formatar
    if (formatedCPF.replace(/\D/g, '').length >= 11) return;

    // Atualiza o valor do CPF com o novo número e aplica a máscara
    setFormatedCPF(aplicarMascaraCPF(formatedCPF + value));
  };

  // Função que aplica a máscara de CPF
  function aplicarMascaraCPF(valor: string): string {
    valor = valor.replace(/\D/g, ''); // Remove qualquer coisa que não seja número

    // Aplica a máscara: 000.000.000-00
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return valor;
  }

  // Função para remover o último dígito (funcionalidade do botão "X")
  const handleBackspace = () => {
    // Remove o último caractere e reaplica a máscara no restante
    const valorAtualizado = formatedCPF.slice(0, -1);
    setFormatedCPF(aplicarMascaraCPF(valorAtualizado));
  };

  return (
    <main className="flex h-screen">
      <div className="w-8/12 m-auto text-center">
        <div className="w-20 mb-2 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#4153cd" d="M22 4h-8v3h-4V4H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8 9a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m4 8H4v-1c0-1.33 2.67-2 4-2s4 .67 4 2zm8 1h-6v-2h6zm0-4h-6v-2h6zm0-4h-6V8h6zm-7-4h-2V2h2z"/>
          </svg>
        </div>
        <div>
          <span className="font-bold text-[#4153cd]">CPF</span>
        </div>
        <div>
          <span>Insira seu CPF</span>
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
