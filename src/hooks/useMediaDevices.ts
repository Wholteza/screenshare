import { useCallback, useEffect, useMemo, useState } from "react";
import { DeviceType } from "~types/enums";

type Props = {
  cameraDevices?: MediaDeviceInfo[];
  getCameraStreamAsync: (device: MediaDeviceInfo) => Promise<MediaStream>;
  getScreenStreamAsync: () => Promise<MediaStream>;
};

const useMediaDevices = (): Props => {
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>();
  const [screenDevices, setScreenDevices] = useState<MediaDeviceInfo[]>();

  const getCameraStreamAsync = useCallback(
    async (device: MediaDeviceInfo): Promise<MediaStream> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          peerIdentity: device.deviceId,
        });
        console.log("Got MediaStream:", stream);
        return stream;
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    },
    []
  );

  const getScreenStreamAsync = useCallback(async (): Promise<MediaStream> => {
    let captureStream: MediaStream | undefined = undefined;
    try {
      // This is a missalignment with TypeScript where getDisplayMedia is not defined on mediaDevices
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mediaDevices = navigator.mediaDevices as any;
      captureStream = await mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          mandatory: { maxHeight: 1440, maxWidth: 3440 },
        },
      });
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }, []);

  const getConnectedDevices = useCallback(async (type: DeviceType): Promise<
    MediaDeviceInfo[]
  > => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }, []);

  useEffect(() => {
    getConnectedDevices(DeviceType.VideoInput).then(setCameraDevices);
  }, [getConnectedDevices]);

  useEffect(() => {
    const callback = () => {
      getConnectedDevices(DeviceType.VideoInput).then(setCameraDevices);
    };
    navigator.mediaDevices.addEventListener("devicechange", callback);
    return () =>
      navigator.mediaDevices.removeEventListener("devicechange", callback);
  });

  const props = useMemo<Props>(
    () => ({
      cameraDevices,
      getCameraStreamAsync,
      getScreenStreamAsync,
    }),
    [cameraDevices, getCameraStreamAsync, getScreenStreamAsync]
  );

  return props;
};
export default useMediaDevices;
