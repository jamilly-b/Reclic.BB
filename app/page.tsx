import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="w-8/12 m-auto text-center">
      <div className="w-20 mb-2 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1536"><path fill="#4153cd" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5m-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384"/></svg>
      </div>
      <div>
        <span className="font-bold text-[#4153cd]">
          Identificação
        </span>
      </div>
      <div>
        <span>Você gostaria de se identificar colocando o CPF na coleta?</span>
      </div>
      <div className="">
        <Button variant={'outline'} className="w-64 me-5 mt-5">
          Não
        </Button>
        <Button className="bg-green-600 w-64" >
          Sim
        </Button>

      </div>
      </div>

    </main>
  );
}
