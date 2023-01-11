import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
import {auth} from "../firebase/config"

import {useState, useEffect} from "react"
import { NavLink } from "react-router-dom"

export const useAuthentication = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const userAuth = auth;
  

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data:{email:string, password:string, displayName:string}) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        userAuth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error:any) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

    }

    setLoading(false);
  };
  const logOut = () => {
    checkIfIsCancelled()
    signOut(userAuth)
  }
  //login - sign in
  const login = async (data:{email:string, password:string}) => {
    checkIfIsCancelled()

    setLoading(true)
    setError("")

    try {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        setLoading(false)
    } catch (error:any) {
        let systemErrorMessage= '';

        if (error.message.includes("user-not-found")) {
            systemErrorMessage = "Usuário não encontrado"
        } else if (error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta"
        } else {
            systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
        }

        setError(systemErrorMessage)
        setLoading(false)
    }
}

useEffect(() => {
    return () => setCancelled(true)
}, [])
  return {
    createUser,
    error,
    loading,
    userAuth,
    logOut,
    login
  }
}