import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback, options) => {
  const [element, setElement] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    const { current: currentObserver } = observer;
    if (element) currentObserver.observe(element);

    return () => currentObserver.disconnect();
  }, [element, callback, options]);

  return [setElement];
};

export default useIntersectionObserver;
