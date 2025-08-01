import { useState } from "react";
import { auth, db } from "../../services/firebaseConnections";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../../../public/Cat.png";
export function Account() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Criar usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualizar displayName no Firebase Authentication
      await updateProfile(user, { displayName: username });

      // Forçar reload para garantir que displayName esteja atualizado no auth.currentUser
      await auth.currentUser?.reload();

      // Criar documento no Firestore com os dados do usuário
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      setLoading(false);
      navigate("/"); // Redireciona para a página inicial (ou outra)

    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setError("Erro ao criar conta. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center overflow-hidden text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] w-[480px] p-10 rounded-3xl mt-8 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Crie sua Conta
        </h1>
        <img  className="w-[150px] h-[150px] rounded-full mb-5 cursor"src={Cat} alt="Cat" />
        <div className="flex flex-col w-full mt-4">
          <label className="mb-2.5 mt-2 text-white text-left">Nome:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite Seu Nome"
            className="border rounded-[16px] px-4 py-2 w-full bg-black text-white"
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          <label className="mb-2.5 mt-2 text-white text-left">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite Seu Email"
            className="border rounded-[16px] px-4 py-2 w-full bg-black text-white"
          />
        </div>

        <div className="flex flex-col w-full mt-4 mb-4">
          <label className="mb-2.5 mt-2 text-white text-left">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite Sua Senha"
            className="border rounded-[16px] px-4 py-2 w-full bg-black text-white"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-2xl h-10 cursor-pointer bg-green-300 text-black font-bold hover:bg-green-600 hover:text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Criando..." : "Criar"}
        </button>

        <Link to="/">
          <p className="text-purple-950 mt-1 cursor-pointer">Já tenho uma conta!</p>
        </Link>
      </form>
    </div>
  );
}

export default Account;
