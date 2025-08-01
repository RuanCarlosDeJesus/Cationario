import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConnections";
import { Link } from "react-router-dom";

export function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fase, setFase] = useState<"materia" | "nivel" | null>(null);
  const [materiaSelecionada, setMateriaSelecionada] = useState<
    "literatura" | "gramatica" | null
  >(null);

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

  function abrirModal() {
    setModalOpen(true);
    setFase("materia");
  }

  function fecharModal() {
    setModalOpen(false);
    setFase(null);
    setMateriaSelecionada(null);
  }

  if (loading) return <div>Carregando...</div>;
  if (!userName) return <div>Usuário não logado</div>;

  function handleToClose(){
    const explicacao = document.getElementById("explicacao");
    if (explicacao) {
      explicacao.style.display = "none";
    }
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#0d0d0d] text-white relative">
      
      <header className="max-w-5xl w-full p-3 rounded mt-8 flex gap-4 fixed justify-around top-0 items-center font-bold font-Helvetica uppercase bg-gradient-to-br from-[#000] via-[#111] to-[#111] shadow-2xl border border-neutral-800">
        <Link
          to="#"
          className=" hover:text-red-400 text-xl transition-all duration-300 "
        >
          Perfil <i className="bi bi-person"></i>
        </Link>
        <Link
          to="#"
          className=" hover:text-red-400 text-xl transition-all duration-300 "
        >
          Histórico de Provas <i className="bi bi-person"></i>
        </Link>
        <button
          onClick={() => auth.signOut()}
          className="  text-white hover:text-red-400 text-3xl transition-all duration-300 cursor-pointer"
          title="Sair"
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </header>
      

    <div
        id="explicacao"
        className="fixed top-24 right-10 w-[300px] bg-white text-black font-bold flex flex-col p-4 rounded-2xl shadow-2xl animate-pulse z-50"
      >
        <button
          onClick={handleToClose} id="close-button"
          className="absolute top-2 right-2 text-sm bg-red-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700"
        >
          X
        </button>
        <p className="mt-8 text-sm leading-relaxed">
          Este é um projeto em desenvolvimento para ajudar as pessoas a estudarem para o Enem 😊
        </p>
      </div>


      <div className="max-w-7xl w-full px-8 py-10 rounded-3xl mt-8 flex flex-col items-center bg-gradient-to-br from-[#000] via-[#111] to-[#111] shadow-2xl border border-neutral-800">
        <h1 className="text-4xl font-extrabold tracking-wide mb-10">
          Bem-vindo, {userName}!
        </h1>

        <p className="text-center text-lg max-w-2xl mb-12 text-neutral-300">
          Esta é a página inicial do seu aplicativo. Aqui você pode acessar as
          funcionalidades disponíveis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div
            onClick={abrirModal}
            className="flex flex-col rounded-2xl p-6 font-bold h-36 bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border-red-300 hover:border-[#583431] hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out border shadow-md items-center justify-center text-xl cursor-pointer"
          >
            Português
          </div>

          {/* Outras matérias... */}
        </div>
      </div>
      
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 bg-black/40"
          onClick={fecharModal} // fechar ao clicar fora da modal
        >
          <div
            className="bg-gradient-to-br from-[#1b0604] via-[#150508] to-[#0b050c] border border-red-300 rounded-2xl p-8 shadow-2xl flex flex-col gap-4 w-[300px]"
            onClick={(e) => e.stopPropagation()} // evita fechar modal ao clicar dentro
          >
            <button
              onClick={fecharModal}
              className="self-end text-red-700 text-2xl font-bold cursor-pointer hover:text-red-900"
              aria-label="Fechar modal"
            >
              [ X ]
            </button>

            {fase === "materia" && (
              <>
                <h2 className="text-white text-center text-2xl font-bold mb-4">
                  Escolha a matéria
                </h2>
                <button
                  className="text-center bg-white text-[#62001f] font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#ffe5e5] transition-all"
                  onClick={() => {
                    setMateriaSelecionada("gramatica");
                    setFase("nivel");
                  }}
                >
                  Gramática
                </button>
                <button
                  className="text-center bg-white text-[#62001f] font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#ffe5e5] transition-all"
                  onClick={() => {
                    setMateriaSelecionada("literatura");
                    setFase("nivel");
                  }}
                >
                  Literatura
                </button>
              </>
            )}

            {fase === "nivel" && materiaSelecionada && (
              <>
                <h2 className="text-white text-center text-2xl font-bold mb-4">
                  Escolha o nível
                </h2>
                <Link
                  to={`/portugues_${materiaSelecionada}/facil`}
                  className="text-center bg-white text-[#62001f] font-bold py-2 px-4 rounded-xl hover:bg-[#ffe5e5] transition-all"
                  onClick={fecharModal} // fecha modal ao navegar
                >
                  Fácil
                </Link>
                <Link
                  to={`/portugues_${materiaSelecionada}/medio`}
                  className="text-center bg-white text-[#62001f] font-bold py-2 px-4 rounded-xl hover:bg-[#ffe5e5] transition-all"
                  onClick={fecharModal}
                >
                  Médio
                </Link>
                <Link
                  to={`/portugues_${materiaSelecionada}/dificil`}
                  className="text-center bg-white text-[#62001f] font-bold py-2 px-4 rounded-xl hover:bg-[#ffe5e5] transition-all"
                  onClick={fecharModal}
                >
                  Difícil
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
