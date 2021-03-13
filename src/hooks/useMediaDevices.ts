import { useCallback, useEffect, useMemo, useState } from "react";
import { DeviceType } from "~types/enums";

type Props = {
  devices?: MediaDeviceInfo[];
  getStreamAsync: (device: MediaDeviceInfo) => Promise<MediaStream>;
};

const useMediaDevices = (): Props => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();

  const getStreamAsync = useCallback(
    async (device: MediaDeviceInfo): Promise<MediaStream> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
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

  const getConnectedDevices = useCallback(async (type: DeviceType): Promise<
    MediaDeviceInfo[]
  > => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }, []);

  useEffect(() => {
    getConnectedDevices(DeviceType.VideoInput).then(setDevices);
  }, [getConnectedDevices]);

  const props = useMemo<Props>(
    () => ({
      devices,
      getStreamAsync,
    }),
    [devices, getStreamAsync]
  );

  return props;
};
export default useMediaDevices;
