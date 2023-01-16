import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config"
import { updateDoc, doc, collection, query, getDocs, where } from "firebase/firestore";
import { useFetchDocuments } from "./useFetchDocuments";


const initialState = {
    loading: null,
    error: null
}

const updateReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };

        case "UPDATE_DOC":
            return { loading: false, error: null };

        case "ERROR":
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection: any) => {
    const [response, dispatch] = useReducer(updateReducer, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const {documents} = useFetchDocuments(docCollection)
    const checkCancelBeforeDispatch = (action: any) => {
        if (!cancelled) dispatch(action)
    }

    const updateDocument = async (data: any, uid?: any, userId?: string) => {
        checkCancelBeforeDispatch({ type: "LOADING" })
        try {
            if (userId) {
                const collectionRef = await collection(db, docCollection)
                let id = "";
                const q = await getDocs(query(
                    collectionRef,
                    where("userId", "==", userId)
                ))
                await q.forEach((doc:any) => {
                    id = doc.id
                })
                const docRef = await doc(db, docCollection, id)
                const updateDocument = await updateDoc(docRef, data) 
                checkCancelBeforeDispatch({
                    type: "UPDATE_DOC",
                    payload: updateDocument
                })
            } else {
                const docRef = await doc(db, docCollection, uid)

                const updateDocument = await updateDoc(docRef, data)
                checkCancelBeforeDispatch({
                    type: "UPDATE_DOC",
                    payload: updateDocument
                })
            }
            
        } catch (error: any) {
            console.log(error);
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message })
        }
    }
    useEffect(() => () => setCancelled(true), [])
    return { updateDocument, response }
}