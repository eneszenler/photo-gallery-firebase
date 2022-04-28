import {useState, useEffect} from "react";
import {projectStorage, projectFirestore, timestamp} from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storaageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    storaageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storaageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({url, createdAt});
        setUrl(url);
      }
    );
  }, [file]);

  return {progress, url, error};
};

export default useStorage;
