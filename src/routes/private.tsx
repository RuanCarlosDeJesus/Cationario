import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../services/firebaseConnections';
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        localStorage.setItem("@Cationario2", JSON.stringify(userData));
        setSigned(true);
      } else {
        setSigned(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!loading && !signed) {
      navigate("/", { replace: true });
    }
  }, [loading, signed, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!signed) {
    // Enquanto redireciona, pode mostrar nada ou loading
    return null;
  }

  return <>{children}</>;
}
