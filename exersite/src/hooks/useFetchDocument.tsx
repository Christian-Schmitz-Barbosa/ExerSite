import { useState, useEffect } from "react";
import { db } from "../firebase/config"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import IGrade from "../interfaces/IGrades";


export const useFetchDocument = (docCollection: any, id: any, userId?: any) => {
    const [document, setDocument] = useState<IGrade>();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [cancelled, setCancelled] = useState(false)


    useEffect(() => {
        const loadDocument = async () => {
            if (cancelled) {
                return
            }
            setLoading(true)

            try {
                if (userId) {
                    const collectionRef = await collection(db, docCollection)
                    const q = await getDocs(query(
                        collectionRef,
                        where("userId", "==", userId)
                    ))
                    await q.forEach((doc: any) => {
                        const tempIGrande = doc.data()
                        setDocument(tempIGrande)
                    })

                } else {
                    const docRef = await doc(db, docCollection, id)
                    const docSnap = await getDoc(docRef)
                    const arrayGrades = await docSnap.data()
                    if (arrayGrades) {
                        setDocument(arrayGrades.arrayGrades)
                    }
                }
            } catch (error: any) {
                console.log(error);
                setError(error.message)
            }
            setLoading(false)
        }
        loadDocument()
    }, [docCollection, id, cancelled])

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error }
}