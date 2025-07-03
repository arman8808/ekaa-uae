import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";
import { FaClosedCaptioning, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DecodeComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        ease: "easeOut",
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const VideoPlayer = ({
    src = "https://d2nxi4iq5glqsu.cloudfront.net/3-Decode+2nd+video+on+homepage.mp4",
    poster,
    thumbnailSrc = "/thumbnailvideo2.png",
  }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [showThumbnail, setShowThumbnail] = useState(true);

    const handlePlayPause = () => {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
        setVideoEnded(false);
        if (!videoStarted) {
          setVideoStarted(true);
        }
      }
      setPlaying(!playing);
    };

    const handleThumbnailClick = () => {
      setVideoStarted(true);
      setShowThumbnail(false);
      setVideoEnded(false);
      videoRef.current.play();
      setPlaying(true);
    };

    const handleVideoEnd = () => {
      setPlaying(false);
      setVideoEnded(true);
      setShowThumbnail(true);
      setProgress(0);
      videoRef.current.currentTime = 0;
    };

    const handleVideoPause = () => {
      setPlaying(false);
      setShowThumbnail(true);
    };

    const handleMute = () => {
      setMuted(!muted);
      videoRef.current.muted = !muted;
    };

    const handleTimeUpdate = () => {
      const current = videoRef.current.currentTime;
      setProgress((current / duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(videoRef.current.duration);
    };

    const handleProgressBar = (e) => {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percent * 100);
    };

    const handleFullscreen = () => {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    };

    return (
      <div className="w-full lg:w-1/2 relative order-2 lg:order-2 h-full">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[521px] overflow-hidden">
          {/* Thumbnail Overlay */}
          {showThumbnail && (
            <div
              className="absolute inset-0 z-20 cursor-pointer group"
              onClick={handleThumbnailClick}
            >
              {/* Thumbnail Image */}
              <img
                src={thumbnailSrc}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, #6E2D79 0%, #B97AC9 100%)";
                }}
              />

              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>

              {/* Large Play Button */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <FaPlay className="text-[#6E2D79] text-xl sm:text-2xl lg:text-3xl ml-1" />
              </div>

              {/* Video Status Badge */}

              {/* Progress indicator for paused/ended videos */}
              {videoStarted && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                  <div
                    className="h-1 bg-[#B97AC9] transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
              showThumbnail ? "opacity-0" : "opacity-100"
            }`}
            onClick={handlePlayPause}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setPlaying(true)}
            onPause={handleVideoPause}
            onEnded={handleVideoEnd}
            muted={muted}
            preload="metadata"
          />

          {/* Video Controls Play Button Overlay */}
          {videoStarted && !playing && !showThumbnail && (
            <button
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-black/60 hover:bg-black/80 transition border-2 border-white/30 shadow-lg cursor-pointer"
              onClick={handlePlayPause}
              style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.25)" }}
            >
              <FaPlay className="text-white text-lg sm:text-2xl lg:text-3xl opacity-90" />
            </button>
          )}

          {/* Controls Box at Bottom Center */}
          {videoStarted && !showThumbnail && showControls && (
            <div className="absolute left-1/2 bottom-3 sm:bottom-4 lg:bottom-1 -translate-x-1/2 z-[1000] flex flex-col items-center px-2 sm:px-0">
              <div
                className="flex flex-col bg-[#6E2D79] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 w-full max-w-sm sm:max-w-lg lg:w-[622px] lg:h-[51px]"
                style={{
                  width: "min(calc(100vw - 32px), 622px)",
                  flexShrink: 0,
                }}
              >
                {/* Progress Bar on Top */}
                <div
                  className="w-full h-1 bg-white/30 rounded-full mb-1 relative cursor-pointer"
                  onClick={handleProgressBar}
                >
                  <div
                    className="h-1 bg-[#B97AC9] rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="relative flex items-center justify-between w-full py-0.5 sm:py-1 lg:py-0">
                  {/* Left Controls */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                    >
                      {playing ? (
                        <FaPause className="text-white text-xs sm:text-sm lg:text-lg" />
                      ) : (
                        <FaPlay className="text-white text-xs sm:text-sm lg:text-lg" />
                      )}
                    </button>
                    <button
                      onClick={handleMute}
                      className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                    >
                      {muted ? (
                        <FaVolumeMute className="text-white text-xs sm:text-sm lg:text-lg" />
                      ) : (
                        <FaVolumeUp className="text-white text-xs sm:text-sm lg:text-lg" />
                      )}
                    </button>
                    <span className="hidden sm:inline text-xs text-white font-mono select-none">
                      {videoRef.current
                        ? `${Math.floor(videoRef.current.currentTime / 60)}:${(
                            "0" + Math.floor(videoRef.current.currentTime % 60)
                          ).slice(-2)} / ${Math.floor(duration / 60)}:${(
                            "0" + Math.floor(duration % 60)
                          ).slice(-2)}`
                        : "0:00 / 0:00"}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                    <span className="sm:hidden text-xs text-white font-mono select-none">
                      {videoRef.current
                        ? `${Math.floor(videoRef.current.currentTime / 60)}:${(
                            "0" + Math.floor(videoRef.current.currentTime % 60)
                          ).slice(-2)}`
                        : "0:00"}
                    </span>

                    <button
                      className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                      title="Closed Captions"
                    >
                      <FaClosedCaptioning className="text-white text-xs sm:text-sm lg:text-lg" />
                    </button>

                    <button
                      className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                      title="Settings"
                    >
                      <FaCog className="text-white text-xs sm:text-sm lg:text-lg" />
                    </button>

                    <button
                      onClick={handleFullscreen}
                      className="focus:outline-none p-1 sm:p-1.5 lg:p-0"
                    >
                      <FaExpand className="text-white text-xs sm:text-sm lg:text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full overflow-hidden p-4"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8">
        {/* DECODE Section */}
        <motion.div
          className="bg-[#6E2D79] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[64px] xl:text-[64px] font-medium text-gray-50 font-poppins mb-6 sm:mb-8 lg:mb-8 leading-tight"
            variants={fadeUp}
          >
            DECODE
          </motion.h2>

          <motion.p
            className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] text-[#F6F6F6] font-poppins max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 sm:mb-8 lg:mb-8 leading-relaxed"
            variants={fadeUp}
          >
            Take charge of the unconscious programs playing out as fate in your
            sub-conscious mind.
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-8 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 border-2 border-gray-50 rounded-full text-base sm:text-base lg:text-[22px] font-medium font-poppins transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 bg-transparent text-gray-50 hover:bg-white/10"
            variants={fadeUp}
            aria-label="Sign up for Decode service"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#F6F6F6",
              color: "#6E2D79",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/decode">Know More</Link>
          </motion.button>
        </motion.div>

        {/* ICH Section */}
        <motion.div
          className="bg-[#6E2D79] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[64px] xl:text-[64px] font-medium text-gray-50 font-poppins mb-6 sm:mb-8 lg:mb-8 leading-tight"
            variants={fadeUp}
          >
          individual Customized Training
          </motion.h2>

          <motion.p
            className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] text-[#F6F6F6] font-poppins max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 sm:mb-8 lg:mb-8 leading-relaxed"
            variants={fadeUp}
          >
            Take charge of the unconscious programs playing out as fate in your
            sub-conscious mind.
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-8 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 border-2 border-gray-50 rounded-full text-base sm:text-base lg:text-[22px] font-medium font-poppins transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 bg-transparent text-gray-50 hover:bg-white/10"
            variants={fadeUp}
            aria-label="Sign up for ICH service"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#F6F6F6",
              color: "#6E2D79",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/ich">Know More</Link>
          </motion.button>
        </motion.div>

        {/* TASSO Section */}
        <motion.div
          className="bg-[#6E2D79] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[64px] xl:text-[64px] font-medium text-gray-50 font-poppins mb-6 sm:mb-8 lg:mb-8 leading-tight"
            variants={fadeUp}
          >
            Transpersonal Regression
          </motion.h2>

          <motion.p
            className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] text-[#F6F6F6] font-poppins max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 sm:mb-8 lg:mb-8 leading-relaxed"
            variants={fadeUp}
          >
            Description for TASSO program goes here.
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-8 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 border-2 border-gray-50 rounded-full text-base sm:text-base lg:text-[22px] font-medium font-poppins transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 bg-transparent text-gray-50 hover:bg-white/10"
            variants={fadeUp}
            aria-label="Sign up for TASSO service"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#F6F6F6",
              color: "#6E2D79",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/tasso">Know More</Link>
          </motion.button>
        </motion.div>

        {/* INDIVIDUAL Section */}
        <motion.div
          className="bg-[#6E2D79] flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
          variants={containerVariants}
        >
          <motion.h2
            className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[64px] xl:text-[64px] font-medium text-gray-50 font-poppins mb-6 sm:mb-8 lg:mb-8 leading-tight"
            variants={fadeUp}
          >
            Customized Individual Training
          </motion.h2>

          <motion.p
            className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px] text-[#F6F6F6] font-poppins max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 sm:mb-8 lg:mb-8 leading-relaxed"
            variants={fadeUp}
          >
            Description for INDIVIDUAL program goes here.
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-8 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 border-2 border-gray-50 rounded-full text-base sm:text-base lg:text-[22px] font-medium font-poppins transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30 bg-transparent text-gray-50 hover:bg-white/10"
            variants={fadeUp}
            aria-label="Sign up for INDIVIDUAL service"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#F6F6F6",
              color: "#6E2D79",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/individual">Know More</Link>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
