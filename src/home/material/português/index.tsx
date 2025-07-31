import { useState, useEffect } from "react";

interface Questao {
  id: number;
  enunciado: string;
  alternativas: { [key: string]: string };
  correta: string;
  explicacao: string;
}

interface Metadados {
  id: string;
  materia: string;
  nivel: string;
  arquivo: string;
  quantidade: number;
  ultimaAtualizacao: string;
}

export function Portugues() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    async function carregarQuestoes() {
      try {
        const resMeta = await fetch("/data/metadados.json");
        const metadados: Metadados[] = await resMeta.json();

        const meta = metadados.find(m => m.id === "pt_geral");
        if (meta) {
          const resQuestoes = await fetch(`/data/${meta.arquivo}`);
          const questoesData = await resQuestoes.json();
          setQuestoes(questoesData);
        } else {
          console.warn("Metadado pt_geral não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarQuestoes();
  }, []);

  if (carregando) {
    return <div className="text-white text-xl mt-10">Carregando questões...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden text-white">
      <div className="bg-[#121212] w-2xl p-10 rounded-3xl mt-8 flex flex-col items-center">
        <h1 className="text-3xl my-10 font-bold">Questões de Português</h1>

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
                      if (!respostasSelecionadas[q.id]) {
                        setRespostasSelecionadas(prev => ({ ...prev, [q.id]: letra }));
                      }
                    }}
                    className={`px-5 w-[300px] text-[16px] py-2 m-3 border-[0.5px] rounded-3xl 
                    cursor-pointer transition ease-in-out flex items-center ${bgColor}`}
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
        </div>
      </div>
    </div>
  );
}
