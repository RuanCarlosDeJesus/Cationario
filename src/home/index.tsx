import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConnections";
import { Link } from "react-router-dom";

export function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonOpen, setButtonOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "Usuário");
      } else {
        setUserName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function handleToClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const explicacao = document.getElementById("explicacao");
    if (explicacao) {
      explicacao.style.display = "none";
    }
  }

  function handleSelect(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setButtonOpen(!buttonOpen);
  }

  if (loading) return <div>Carregando...</div>;
  if (!userName) return <div>Usuário não logado</div>;

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#0d0d0d] text-white relative">
       <header className="max-w-5xl w-full p-3 rounded mt-8 flex gap-4 fixed justify-around top-0 items-center font-bold font-Helvetica uppercase bg-gradient-to-br from-[#000] via-[#111] to-[#111] shadow-2xl border border-neutral-800"> 
          {/* Botão de logout */}

          <Link to="#" className=" hover:text-red-400 text-xl transition-all duration-300 "> Perfil <i className="bi bi-person"></i></Link>
          <Link to="#" className=" hover:text-red-400 text-xl transition-all duration-300 "> Histórico de Provas <i className="bi bi-person"></i></Link>
       
        <button
          onClick={() => auth.signOut()}
          className="  text-white hover:text-red-400 text-3xl transition-all duration-300 cursor-pointer"
          title="Sair"
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>  </header>
   

      <div className="max-w-7xl w-full px-8 py-10 rounded-3xl mt-8 flex flex-col items-center bg-gradient-to-br from-[#000] via-[#111] to-[#111] shadow-2xl border border-neutral-800">
        <h1 className="text-4xl font-extrabold tracking-wide mb-10">
          Bem-vindo, {userName}!
        </h1>

        <p className="text-center text-lg max-w-2xl mb-12 text-neutral-300">
          Esta é a página inicial do seu aplicativo. Aqui você pode acessar as funcionalidades disponíveis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div
            onClick={handleSelect}
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Português

            {buttonOpen && (
              <div className="flex justify-center items-center gap-10 mt-10">
                {/* Literatura */}
                <div className="flex rounded-2xl p-1 font-bold mt-3 w-40 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer">
                  <Link
                    to="/portugues_literatura"
                    className="w-full text-center hover:text-[#62001f]"
                  >
                    Literatura
                  </Link>
                </div>

                {/* Gramática */}
                <div className="flex rounded-2xl p-1 font-bold mt-3 w-40 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer">
                  <Link
                    to="/portugues_gramatica"
                    className="w-full text-center hover:text-[#62001f]"
                  >
                    Gramática
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Matemática
          </div>

          <div
            
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            História
          </div>

          <div
            
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Geografia
          </div>

          <div
            
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Inglês
          </div>

          <div
            
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Biologia
          </div>
        </div>

      
      </div>

      {/* Caixa de explicação flutuante */}
      <div
        id="explicacao"
        className="fixed top-24 right-10 w-[300px] bg-white text-black font-bold flex flex-col p-4 rounded-2xl shadow-2xl animate-pulse z-50"
      >
        <button
          onClick={handleToClose}
          className="absolute top-2 right-2 text-sm bg-red-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"
        >
          X
        </button>
        <p className="mt-8 text-sm leading-relaxed">
          Este é um projeto em desenvolvimento para ajudar as pessoas a estudarem para o Enem 😊
        </p>
      </div>
    </div>
  );
}
