import Image from 'next/image'

const ItensEnviados = () =>{
    return(
        <main className="flex h-screen">
        <div className="w-8/12 m-auto text-center">
          <div className="w-20 mb-2 mx-auto">
                <Image src="/assets/images/bateria.svg" alt='' width={100} height={100} unoptimized/>
            </div>
          <div>
            <span className="font-bold text-[#4153cd] text-3xl">Resíduos</span>
          </div>
          <div className="mt-2">
            <span>Coloque o(s) eletrônico(s) no recipiente PEV</span>
          </div>
          </div>
      </main>
    )

}

export default function Complete() { 

    return (
      <main className="flex h-screen">
        <div className="w-8/12 m-auto text-center">
          <div className="w-20 mb-2 mx-auto">
                <Image src="/assets/images/bateria.svg" alt='' width={100} height={100} unoptimized/>
            </div>
          <div>
            <span className="font-bold text-[#4153cd] text-3xl">Resíduos</span>
          </div>
          <div className="mt-2">
            <span>Coloque o(s) eletrônico(s) no recipiente PEV</span>
          </div>
          </div>
      </main>
    )
    
  }
  