import { useCallback, useMemo } from "react";

type Props = {
  getScreenStreamAsync: () => Promise<MediaStream>;
};

const useMediaDevices = (): Props => {
  const getScreenStreamAsync = useCallback(async (): Promise<MediaStream> => {
    let captureStream: MediaStream | undefined = undefined;
    try {
      // This is a missalignment with TypeScript where getDisplayMedia is not defined on mediaDevices
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mediaDevices = navigator.mediaDevices as any;
      captureStream = await mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          width: { max: 3440 },
          height: { max: 1440 },
          frameRate: { max: 144 },
        },
      });
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }, []);

  const props = useMemo<Props>(
    () => ({
      getScreenStreamAsync,
    }),
    [getScreenStreamAsync]
  );

  return props;
};
export default useMediaDevices;
