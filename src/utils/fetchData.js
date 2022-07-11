import { firebaseApp } from "../firebase-config";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const getAllFeeds = async (firestoreDp) => {
  const feeds = await getDocs(
    query(collection(firestoreDp, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map((doc) => doc.data());
};
// category feeds
export const categoryFeeds = async (firestoreDb, categoryId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      orderBy("id", "desc")
    )
  );

  return feeds.docs.map((doc) => doc.data());
};
//recommended feeds
export const recommendedFeed = async (firestoreDb, categoryId, videoId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("category", "==", categoryId),
      where("id", "!=", videoId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

// user uploaded videos
export const userUploadedVideos = async (firestoreDb, userId) => {
  const feeds = await getDocs(
    query(
      collection(firestoreDb, "videos"),
      where("userId", "==", userId),
      orderBy("id", "desc")
    )
  );
  return feeds.docs.map((doc) => doc.data());
};

// fetch the user information
export const gertUserInfo = async (firestoreDp, userId) => {
  const userRef = doc(firestoreDp, "user", userId);

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return "No Such Document";
  }
};

//fetch the video information
export const getSpecificVideo = async (firestoreDp, videoId) => {
  const videoRef = doc(firestoreDp, "videos", videoId);

  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return "No Such Document";
  }
};

export const deleteVideo = async (firestoreDb, videoId) => {
  await deleteDoc(doc(firestoreDb, "videos", videoId));
};
