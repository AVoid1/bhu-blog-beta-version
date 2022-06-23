import { firebaseApp } from "../firebase-config";

import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { async } from "@firebase/util";

export const getAllFeeds = async (firestoreDp) => {
  const feeds = await getDocs(
    query(collection(firestoreDp, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map((doc) => doc.data());
};
