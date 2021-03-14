import React, { ChangeEvent, useCallback, useState } from "react";
import Video from "~elements/video";
import useMediaDevices from "~hooks/useMediaDevices";
import usePeer from "~hooks/usePeer";
import "./root.scss";

const Root: React.FC = () => {
  const { getScreenStreamAsync } = useMediaDevices();
  const [screenStream, setScreenStream] = useState<MediaStream>();
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const { id, connectToPeer, peerStream } = usePeer(screenStream);
  const [peerId, setPeerId] = useState<string>("");

  const toggleStreaming = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(undefined);
      return;
    }
    getScreenStreamAsync().then(setScreenStream);
  }, [getScreenStreamAsync, screenStream]);

  const togglePreview = useCallback(() => setShowPreview((prev) => !prev), []);

  const handleConnectButton = useCallback(() => connectToPeer(peerId), [
    connectToPeer,
    peerId,
  ]);

  const updatePeerId = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPeerId(event.target.value),
    []
  );
  return (
    <div className="root-container">
      <div className="status-container">
        <div>ID: {id}</div>
      </div>
      <div className="controls-container">
        <button onClick={toggleStreaming}>
          {screenStream ? "Stop streaming" : "Start streaming"}
        </button>
        <button onClick={togglePreview}>Toggle preview</button>
        <input
          value={peerId}
          onChange={updatePeerId}
          placeholder="Peer id"
        ></input>
        <button onClick={handleConnectButton}>Connect</button>
      </div>
      {showPreview && <Video stream={screenStream} isPreview />}
      {peerStream && <Video stream={peerStream} />}
    </div>
  );
};

export default Root;
