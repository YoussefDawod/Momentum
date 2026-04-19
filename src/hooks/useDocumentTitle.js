import { useEffect, useRef } from "react";

export const useDocumentTitle = (title) => {
  const previousRef = useRef(document.title);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    const original = previousRef.current;
    return () => {
      document.title = original;
    };
  }, []);
};
