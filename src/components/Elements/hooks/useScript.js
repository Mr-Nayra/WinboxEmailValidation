import React, { useEffect } from "react";

var u = "";

export const useScript = (url, onload) => {
  useEffect(() => {
    if (u !== url) {
      u = url;
      let script = document.createElement("script");

      script.src = url;
      script.onload = onload;

      document.head.appendChild(script);

      return () => document.head.removeChild(script);
    }
  }, [url, onload]);
};
