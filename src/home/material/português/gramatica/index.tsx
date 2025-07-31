import { useState, useEffect } from "react";
import {useNavigate}from "react-router-dom"
import { FaCheckSquare } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
 import { db } from "../../../../services/firebaseConnections"; 
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export interface Questao {
  id: number;
  enunciado: string;
  alternativas: { [key: string]: string };
  correta: string;
  errada: string;
  explicacao: string;
  categoria: string;
  link: string;
  
}

interface Metadados {
  id: string;
  materia: string;
  nivel: string;
  arquivo: string;
  quantidade: number;
  ultimaAtualizacao: string;
}

export function Gramatica() {
  const navigate = useNavigate();
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState<{
    [key: number]: string;
  }>({});
  let [contador, setContador] = useState(0);
  let [ContadorErrado, setContadorErrado] = useState(0);

  useEffect(() => {
    async function carregarQuestoes() {
      try {
        const resMeta = await fetch("/data/metadados.json");
        const metadados: Metadados[] = await resMeta.json();

        const meta = metadados.find((m) => m.id === "pt_gramatica");
        if (!meta) {
          console.warn("Metadado pt_geral não encontrado");
          return;
        }
        const resQuestoes = await fetch(`/data/${meta.arquivo}`);
        const questoesData: Questao[] = await resQuestoes.json();

        const categoriaAlvo = "gramatica";
        const questoesFiltradas = questoesData.filter(
          (q) => q.categoria === categoriaAlvo
        );
        const selecionadas = [...questoesFiltradas]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        setQuestoes(selecionadas);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarQuestoes();
  }, []);

  if (carregando) {
    return (
      <div className="text-white text-xl mt-10">Carregando questões...</div>
    );
  }
   async function handleGetConclusion() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Você precisa estar logado para concluir a prova.");
    return;
  }

  const respostasCorretas = Object.entries(respostasSelecionadas)
    .filter(([id, letra]) => {
      const questao = questoes.find(q => q.id === Number(id));
      return questao?.correta === letra;
    })
    .map(([id, letra]) => {
      const questao = questoes.find(q => q.id === Number(id));
      return {
        id: questao?.id,
        enunciado: questao?.enunciado,
        resposta: letra,
        explicacao: questao?.explicacao,
        link: questao?.link,
      };
    });

  const respostasErradas = Object.entries(respostasSelecionadas)
    .filter(([id, letra]) => {
      const questao = questoes.find(q => q.id === Number(id));
      return questao?.correta !== letra;
    })
    .map(([id, letra]) => {
      const questao = questoes.find(q => q.id === Number(id));
      return {
        id: questao?.id,
        enunciado: questao?.enunciado,
        resposta: letra,
          explicacao: questao?.explicacao,  
      link: questao?.link    
      };
    });

  const resultado = {
    categoria: "gramatica",
    acertos: contador,
    erros: ContadorErrado,
    respostasCorretas,
    respostasErradas,
    data: new Date().toISOString(),
  };

  try {
    const userResultsRef = collection(db, "usuarios", user.uid, "resultados");
    await addDoc(userResultsRef, resultado);
    alert("Resultado salvo com sucesso!");
    navigate("/result", { state: { resultado }, replace: true })
  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
    alert("Erro ao salvar resultado.");
  }
}
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden text-white">
      <div className="bg-[#121212] w-2xl p-10 rounded-3xl mt-8 flex flex-col items-center">
        <h1 className="text-3xl my-10 font-bold">Questões de Português</h1>


     <div className="flex flex-col items-center justify-center mt-4 w-[200px]">
  <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4  rounded-full shadow-lg w-full">
    <FaCheckSquare size={20} />
    <span className="text-lg font-semibold">{contador}</span>
  </div>
  <p className="text-sm text-gray-300 mt-1">Acertos</p>

  {/* Barra de progresso para acertos */}
  <div className="w-full bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
    <div
      className="bg-green-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${(contador / questoes.length) * 100}%` }}
    ></div>
  </div>
</div>
<div className="flex flex-col items-center justify-center mt-4 w-[200px]">
  <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-4  rounded-full shadow-lg w-full">
      <FaTimesCircle color="black" size={20} />
    <span className="text-lg font-semibold">{ContadorErrado}</span>
  </div>
  <p className="text-sm text-gray-300 mt-1">Erros</p>

  {/* Barra de progresso para erros */}
  <div className="w-full bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
    <div
      className="bg-red-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${(ContadorErrado / questoes.length) * 100}%` }}
    ></div>
  </div>
</div>



        <div className="w-full p-10 rounded-3xl flex flex-col items-start text-xl">
          {questoes.map((q, index) => (
            <div key={q.id} className="mb-10 w-full">
              <p className="text-lg mb-4">
                {index + 1}. {q.enunciado}
              </p>

              {Object.entries(q.alternativas).map(([letra, texto]) => {
                let bgColor = "";

                if (respostasSelecionadas[q.id]) {
                  if (letra === q.correta) {
                    bgColor = "bg-green-600"; // correta
                  } else if (letra === respostasSelecionadas[q.id]) {
                    bgColor = "bg-red-600"; // marcada errada
                  }
                }

                return (
                  <button
                    key={letra}
                    onClick={() => {
                       if (respostasSelecionadas[q.id]) return;
                      if (!respostasSelecionadas[q.id]) {
                        setRespostasSelecionadas((prev) => ({
                          ...prev,
                          [q.id]: letra,
                        }));
                      }
                        if (letra === q.correta) {
                        setContador((prev) => prev + 1);
                        
                      } else  {
                        setContadorErrado((prev) => prev + 1);
                       
                      }
                    }}
                    className={`px-5 w-[300px] text-[16px] py-2 m-3 border-[0.5px] rounded-3xl 
                    cursor-pointer transition ease-in-out flex items-center  ${bgColor}`}
                  >
                    ({letra}) {texto}
                  </button>
                );
              })}

              {respostasSelecionadas[q.id] && (
                <p className="text-sm text-gray-400 mt-2">💡 {q.explicacao}</p>
              )}
            </div>
          ))}
          <div>
           <button
  onClick={handleGetConclusion}
  className="w-30 bg-green-600 cursor-pointer font-bold rounded-xl"
>
  Concluir
</button>
          </div>
        </div>
      </div>
    </div>
  );
}
