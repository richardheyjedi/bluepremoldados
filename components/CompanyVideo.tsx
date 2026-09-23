"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

const videoId = "pIl2oEWLG3I";
const videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`;

export function CompanyVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const sendCommand = (command: "playVideo" | "pauseVideo" | "mute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  };

  const handleLoad = () => {
    setIsReady(true);
    sendCommand("mute");
    const shouldPlay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sendCommand(shouldPlay ? "playVideo" : "pauseVideo");
    setIsPlaying(shouldPlay);
  };

  const togglePlayback = () => {
    const nextPlayingState = !isPlaying;
    sendCommand(nextPlayingState ? "playVideo" : "pauseVideo");
    setIsPlaying(nextPlayingState);
  };

  return (
    <section className="company-video section dark-section" aria-labelledby="company-video-title">
      <div className="shell">
        <div className="company-video__heading">
          <span className="eyebrow eyebrow--light reveal">Conheça a Blue</span>
          <h2 id="company-video-title" className="section-title section-title--light reveal">
            Experiência que se transforma<br />em estruturas sólidas.
          </h2>
        </div>

        <div className="company-video__frame reveal">
          <iframe
            ref={iframeRef}
            src={videoSrc}
            title="Vídeo institucional da Blue Premoldados"
            allow="autoplay; encrypted-media"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            onLoad={handleLoad}
          />
          <div className="company-video__shade" aria-hidden="true" />
          <button
            className="company-video__control"
            type="button"
            onClick={togglePlayback}
            disabled={!isReady}
            aria-label={isPlaying ? "Pausar vídeo" : "Continuar vídeo"}
          >
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            <span>{isPlaying ? "Pausar" : "Continuar"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
