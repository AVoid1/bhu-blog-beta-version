import React, { useEffect, useState } from 'react'

import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase-config';
import { getAllFeeds } from '../utils/fetchData';
const Feed = () => {
  const firestoreDb = getFirestore(firebaseApp);

  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllFeeds(firestoreDb).then((data) => {
      setFeeds(data);
      console.log(feeds);
      setLoading(false);
    })
  }, []);
  return (
    <div>Feed</div>
  )
}

export default Feed