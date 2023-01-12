import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection:any, search = null, uid = null) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {

            if (cancelled) {
                return;
            }

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q:any;
                if(search){
                    q = await getDocs(query(collectionRef, where("tagsArray", "array-contains", search)));

                }else if(uid){
                    q = await getDocs(query(collectionRef, where("uid", "==", uid)))
                }else{
                    q = await getDocs(query(collectionRef));
                }

              await q.forEach((doc:any) => {
                    setDocuments(
                        q.docs.map((doc:any) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                })
                documents.sort((a:any, b:any) => (a.title < b.name) ? - 1 : 1)


            } catch (error:any) {
                console.log(error);
                setError(error.message);
            }


            setLoading(false);
        }


        loadData();
    }, [docCollection, search, uid, cancelled]);

    //   console.log(documents);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};