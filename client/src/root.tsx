import React, { useCallback, useState } from "react";
import Video from "~elements/video";
import useMediaDevices from "~hooks/useMediaDevices";
import "./root.scss";

const Root: React.FC = () => {
  const { getScreenStreamAsync } = useMediaDevices();
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const toggleStreaming = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(undefined);
      return;
    }
    getScreenStreamAsync().then(setScreenStream);
  }, [getScreenStreamAsync, screenStream]);

  const togglePreview = useCallback(() => setShowPreview((prev) => !prev), []);
  return (
    <div className="root-container">
      <div className="status-container"></div>
      <div className="controls-container">
        <button onClick={toggleStreaming}>
          {screenStream ? "Stop streaming" : "Start streaming"}
        </button>
        <button onClick={togglePreview}>Toggle preview</button>
      </div>
      {showPreview && <Video stream={screenStream} isPreview />}
    </div>
  );
};

export default Root;
