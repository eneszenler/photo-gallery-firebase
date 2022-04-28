import React from "react";
import {useEffect} from "react";
import useStorage from "../hooks/useStorage";
import {motion} from "framer-motion";

function ProgressBar({file, setFile}) {
  const {url, progress} = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url]);

  return (
    <motion.div
      className="progress-bar"
      initial={{width: 0}}
      animate={{width: progress + "%"}}
    ></motion.div>
  );
}

export default ProgressBar;
