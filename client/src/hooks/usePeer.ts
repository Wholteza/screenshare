import { useCallback, useEffect, useMemo, useState } from "react";
import Peer, { MediaConnection } from "peerjs";

type Props = {
  id: string;
  connectToPeer: (peerId: string) => void;
  peerStream: MediaStream | undefined;
};

const usePeer = (stream: MediaStream | undefined): Props => {
  const [id, setId] = useState<string>();
  const [peer, setPeer] = useState<Peer>();
  const [mediaConnections, setMediaConnections] = useState<MediaConnection[]>(
    []
  );
  const [peerStream, setPeerStream] = useState<MediaStream>();

  useEffect(() => {
    if (peer) return;
    const newPeer = new Peer({
      debug: 3,
      host: "127.0.0.1",
      port: 9000,
      path: "/peerjs",
    });
    newPeer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      setId(id);
    });
    newPeer.on("call", function (call) {
      call.answer();
      setMediaConnections((prev) => [...prev, call]);
      call.on("stream", setPeerStream);
    });
    setPeer(newPeer);
  }, [peer, stream]);

  const connectToPeer = useCallback(
    (peerId: string) => {
      console.log("Calling:", peerId);
      const call = peer.call(peerId, stream);
      setMediaConnections((prev) => [...prev, call]);
      call.on("stream", setPeerStream);
    },
    [peer, stream]
  );

  const props = useMemo<Props>(
    () => ({
      id,
      connectToPeer,
      peerStream,
    }),
    [connectToPeer, id, peerStream]
  );

  return props;
};

export default usePeer;
// (Math.random() * 100000000000000000).toString(),
