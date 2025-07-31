import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
function BarraAcertosErros({
  acertos = 0,
  erros = 0,
}: {
  acertos: number;
  erros: number;
}) {
  const total = 10;
  const blocos = [];

  // Acertos verdes
  for (let i = 0; i < acertos && i < total; i++) {
    blocos.push(
      <div
        key={"acerto" + i}
        className="w-6 h-6 bg-green-500 m-1 rounded"
        title="Acerto"
      />
    );
  }

  // Erros vermelhos
  for (let i = 0; i < erros && blocos.length < total; i++) {
    blocos.push(
      <div
        key={"erro" + i}
        className="w-6 h-6 bg-red-600 m-1 rounded"
        title="Erro"
      />
    );
  }

  // Restante cinza (não respondido)
  while (blocos.length < total) {
    blocos.push(
      <div
        key={"vazio" + blocos.length}
        className="w-6 h-6 bg-gray-700 m-1 rounded"
        title="Não respondido"
      />
    );
  }

  return <div className="flex">{blocos}</div>;
}

export function Result() {
  const location = useLocation();
  const resultado = location.state?.resultado;
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
 function saveProof() {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Resultado da Prova`, 10, 20);
  doc.text(`Categoria: ${resultado?.categoria || "Não informado"}`, 10, 30);
  doc.text(`Data: ${dataFormatada || "Data desconhecida"}`, 10, 40);
  doc.text(`Acertos: ${resultado?.acertos ?? 0}`, 10, 50);
  doc.text(`Erros: ${resultado?.erros ?? 0}`, 10, 60);

  doc.setFontSize(14);
  doc.text("Respostas incorretas:", 10, 75);

  let y = 85;

  resultado?.respostasErradas.forEach((resposta: any, index: number) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    const texto = [
      `${index + 1}. Enunciado: ${resposta.enunciado}`,
      `Sua resposta: ${resposta.resposta}`,
      `Explicação: ${resposta.explicacao}`
    ];

    texto.forEach((linha) => {
      const linhas = doc.splitTextToSize(linha, 180);
      doc.text(linhas, 10, y);
      y += linhas.length * 6;
    });

    y += 4;
  });

  doc.save("prova.pdf");
}

  useEffect(() => {
    if (!resultado) {
      alert("Resultado não encontrado. Redirecionando para a página inicial.");
      window.location.href = "/";
    }
  }, [resultado]);

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden text-white">
      <div className="bg-[#121212] w-2xl p-10 rounded-3xl mt-8 flex flex-col items-center">
        <h1 className="m-10 text-2xl font-bold">
          Resultado da Prova de Português - {resultado?.categoria}
        </h1>

        {/* Barra visual de acertos e erros */}
        <div className="flex gap-8 mb-8 items-center">
          <div className="flex flex-col items-center">
            <span className="mb-2 font-semibold text-green-400">Acertos</span>
            <BarraAcertosErros acertos={resultado?.acertos ?? 0} erros={0} />
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 font-semibold text-red-400">Erros</span>
            <BarraAcertosErros acertos={0} erros={resultado?.erros ?? 0} />
          </div>
        </div>

        <h2 className="text-3xl font-bold m-5">Dificuldades</h2>

        <ul>
          {resultado?.respostasErradas.map((res: any, index: number) => (
            <div key={index} className="text-[16px] m-4 justify-center flex flex-col ">
              <p className="text-[16px] m-4 justify-center">
                Você demonstrou um pouco de dificuldade em algumas questões de{" "}
                {resultado?.categoria} e aqui vai as questões com dicas 😉 :
              </p>
              <p className="text-[20px] p-2">{res.enunciado}</p>
              <p className="text-[19px] p-2">
                Sua resposta:{" "}
                <span className="text-red-500 uppercase">{res.resposta}</span>
              </p>
              <p className="text-yellow-400 text-[16px] italic">
                💡 Dica: {res.explicacao}
              </p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] italic cursor-pointer"
              >
                🔗 Links para complementar seu estudo:{" "} <br />
                <span className="text-purple-700">{res.link}</span>
              </a>
            </div>
          ))}
        </ul>

        <div className="flex items-center justify-center mt-10">
          <button 
          onClick={saveProof}
          className="cursor-pointer bgw-30 bg-green-600 font-bold rounded h-10 m-2">
            Baixar Prova
          </button>
          <button
            className="bg-green-600 cursor-pointer font-bold rounded h-10"
            onClick={() => (window.location.href = "/home")}
          >
            Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
}
