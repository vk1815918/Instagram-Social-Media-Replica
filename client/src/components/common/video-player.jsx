import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const VideoPlayer = ({
  src,
  style,
  videoClassName,
  containerClassName,
  className,
  forReelPage,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to muted for autoplay
  const [seekBarProgress, setSeekBarProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
        if (isPlaying) {
          videoRef.current
            .play()
            .then(() => {
              pauseOtherVideos();
            })
            .catch((error) => {
              // Handle the error if playback is blocked
              console.error("Playback error:", error);
            });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible, isPlaying]);

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
    setIsPlaying(!isPlaying);
    pauseOtherVideos();
  };

  const handleMouseOver = () => {
    if (!isPlaying) {
      videoRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
    pauseOtherVideos();
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    videoRef.current.volume = 1; // Set volume to desired level
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = Math.ceil(videoRef.current.currentTime);
      const duration = Math.ceil(videoRef.current.duration);
      setSeekBarProgress((currentTime / duration) * 100);
    }
  };

  const handleVolumeMute = () => {
    videoRef.current.muted = true;
    setIsMuted(videoRef.current.muted);
  };

  const handleVolumeUp = () => {
    videoRef.current.muted = false;
    setIsMuted(videoRef.current.muted);
  };

  const handleVideoEnded = () => {
    videoRef.current.currentTime = 0;
  };

  const pauseOtherVideos = () => {
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((video) => {
      if (video !== videoRef.current) {
        video.pause();
      }
    });
  };

  return forReelPage ? (
    <div
      className={twMerge(
        `flex items-center justify-center w-full h-full relative ${containerClassName}`
      )}
    >
      {!isPlaying && (
        <span className="z-50">
          <FaPlay className="flex z-50 text-[80px] opacity-75" />
        </span>
      )}

      {/* Sound Actions up and mute */}
      <div className="z-50 absolute top-4 right-4">
        {!isMuted ? (
          <span className="cursor-pointer" onClick={handleVolumeMute}>
            <FaVolumeUp className="text-xl" />
          </span>
        ) : (
          <span className="cursor-pointer" onClick={handleVolumeUp}>
            <FaVolumeMute className="text-xl" />
          </span>
        )}
      </div>
      <video
        ref={videoRef}
        src={isVisible ? src : ""}
        className={twMerge(
          `${videoClassName || "w-fit h-fit absolute object-fill"}`
        )}
        onClick={handleVideoClick}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        onMouseOver={handleMouseOver}
        muted={isMuted} // Ensure video is muted to allow autoplay
        autoPlay={isVisible} // Auto play if the video is visible
        loop
        {...props}
      ></video>
      <div
        style={{ width: `${seekBarProgress}%` }}
        className={`absolute bottom-0 left-0 w-[0%] h-[3px] bg-white z-50 transition`}
      ></div>
    </div>
  ) : (
    <div
      style={style}
      className={twMerge(
        ` overflow-hidden flex items-center justify-center min-w-full relative ${
          className || containerClassName
        }`
      )}
    >
      <video
        ref={videoRef}
        src={isVisible ? src : ""}
        className={twMerge(
          `${videoClassName || "w-fit h-fit absolute object-fill"}`
        )}
        onClick={handleVideoClick}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        onMouseOver={handleMouseOver}
        muted={isMuted} // Ensure video is muted to allow autoplay
        autoPlay={isVisible} // Auto play if the video is visible
        {...props}
      ></video>

      <div className="z-50 absolute bottom-2 right-2">
        {!isMuted ? (
          <span className="cursor-pointer" onClick={handleVolumeMute}>
            <FaVolumeUp />
          </span>
        ) : (
          <span className="cursor-pointer" onClick={handleVolumeUp}>
            <FaVolumeMute />
          </span>
        )}
      </div>

      <div
        style={{ width: `${seekBarProgress}%` }}
        className={`absolute bottom-0 left-0 w-[0%] h-[3px] bg-white z-50 transition`}
      ></div>
    </div>
  );
};

export default VideoPlayer;
