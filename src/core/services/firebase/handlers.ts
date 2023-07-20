import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { db, app } from ".";

export const getData = async (collectionName: string) => {
  const data: Record<string, string>[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};
