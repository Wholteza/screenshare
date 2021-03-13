import React, { useEffect, useMemo, useState } from "react";
import Video from "~elements/video";
import useMediaDevices from "~hooks/useMediaDevices";

const Root: React.FC = () => {
  const {
    cameraDevices,
    getCameraStreamAsync,
    getScreenStreamAsync,
  } = useMediaDevices();
  const [cameraStream, setCameraStream] = useState<MediaStream>();
  const [screenStream, setScreenStream] = useState<MediaStream>();

  useEffect(() => {
    if (!cameraDevices || cameraDevices?.length === 0) return;
    getCameraStreamAsync(cameraDevices[0]).then(setCameraStream);
  }, [cameraDevices, getCameraStreamAsync]);

  useEffect(() => {
    getScreenStreamAsync().then(setScreenStream);
  }, [getScreenStreamAsync]);

  const deviceInfo = useMemo<JSX.Element>(
    () => (
      <div>
        {cameraDevices?.map((device) => device && JSON.stringify(device)) ||
          "no devices"}
      </div>
    ),
    [cameraDevices]
  );
  return (
    <>
      <Video stream={screenStream} />
    </>
  );
};

export default Root;
