// src/LazyImage.js
import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const LazyImage = ({ src, alt, className, containerClassName, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={twMerge(`${containerClassName}`)}>
      {isVisible ? (
        <img
          src={src}
          alt={alt}
          className={twMerge(`${className}`)}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-[gray]/50"></div>
      )}
    </div>
  );
};

export default LazyImage;
