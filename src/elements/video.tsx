import React, { useEffect, useRef } from "react";
import "./video.scss";

type Props = {
  stream: MediaStream | undefined;
};

const Video: React.FC<Props> = ({ stream }: Props) => {
  const ref = useRef<HTMLVideoElement>();

  useEffect(() => {
    const current = ref.current;
    if (!stream || !current) return;
    current.srcObject = stream;
  }, [stream, ref]);
  return (
    <video
      className="video-container"
      ref={ref}
      autoPlay
      playsInline
      controls={false}
    ></video>
  );
};

export default Video;
