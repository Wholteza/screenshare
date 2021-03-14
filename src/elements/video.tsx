import React, { useEffect, useRef } from "react";
import "./video.scss";

type Props = {
  stream: MediaStream | undefined;
  isPreview?: boolean;
};

const Video: React.FC<Props> = ({ stream, isPreview }: Props) => {
  const ref = useRef<HTMLVideoElement>();

  useEffect(() => {
    const current = ref.current;
    if (!stream || !current) return;
    current.srcObject = stream;
  }, [stream, ref]);
  return (
    <video
      className={isPreview ? "preview video-container" : "video-container"}
      ref={ref}
      autoPlay
      playsInline
      controls={false}
    ></video>
  );
};

export default Video;
