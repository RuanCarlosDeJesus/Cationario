import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../services/firebaseConnections';
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
const [loading, setLoading] = useState<boolean>(false);
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
 setLoading(true);
    if (email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
   
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Verifique suas credenciais.");
      });
    if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white text-2xl">
      Carregando...
    </div>
  );
}
  }

  return (
    <div className="w-full flex justify-center overflow-hidden text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#121212] w-[480px] p-10 rounded-3xl mt-8 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Seja bem-vindo(a) ao Cationário!
        </h1>

        <button className="px-5 w-[90%] py-2 m-3 border-[0.5px] rounded-3xl cursor-pointer hover:bg-green-600 hover:text-black transition ease-in-out flex items-center">
          <i className="bi bi-google mr-3"></i> Continua com Google
        </button>

        <button className="px-5 w-[90%] py-2 m-3 border-[0.5px] rounded-3xl cursor-pointer hover:bg-green-600 hover:text-black transition ease-in-out flex items-center">
          <i className="bi bi-facebook mr-3"></i> Continua com Facebook
        </button>

        <button className="px-5 w-[90%] py-2 m-3 border-[0.5px] rounded-3xl cursor-pointer hover:bg-green-600 hover:text-black transition ease-in-out flex items-center">
          <i className="bi bi-apple mr-3"></i> Continua com Apple
        </button>

        <div className="flex flex-col w-full mt-4">
          <label htmlFor="email" className="mb-2.5 mt-2 text-white text-left">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite Seu Email"
            className="border rounded-[16px] px-4 py-2 w-full bg-black text-white"
          />
        </div>

        <div className="flex flex-col w-full mb-4 mt-4">
          <label htmlFor="senha" className="mb-2.5 mt-2 text-white text-left">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite Sua Senha"
            className="border rounded-[16px] px-4 py-2 w-full bg-black text-white"
          />
        </div>

        <button
          type="submit"
        disabled={loading}
          className="w-full rounded-2xl h-10 cursor-pointer bg-green-300 text-black font-bold hover:bg-green-600 hover:text-white"
        >
          Entrar
        </button>

        <Link to="/create-account">
          <p className="text-purple-300 hover:text-green-600  mt-1 cursor-pointer">Não tem uma conta? Crie já</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
