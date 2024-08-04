// src/LazyVideo.js
import React, { useState, useEffect, useRef } from "react";

const LazyVideo = ({ src, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Observer to handle playback when the video becomes visible
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Observer to handle pausing the video when it goes out of view
    const pauseObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      playObserver.observe(videoRef.current);
      pauseObserver.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        playObserver.unobserve(videoRef.current);
        pauseObserver.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      src={isVisible ? src : ""}
      controls
      className="w-full h-full object-cover"
      {...props}
    />
  );
};

export default LazyVideo;
