import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConnections";

interface UserData {
  username: string;
  email: string;
  // outros campos do perfil, se quiser adicionar
}

export function Perfil() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
  if (!auth.currentUser) {
    console.log("Usuário não logado");
    return;
  }
  
  async function fetchUserData() {
    const docRef = doc(db, "users", auth.currentUser!.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data() as UserData);
    } else {
      console.log("Nenhum dado de usuário encontrado");
    }
  }

  fetchUserData();
}, []);

  if (!userData) return <div>Carregando perfil...</div>;

  return (
    <div>
      <h1>Perfil de {userData.username}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
}
