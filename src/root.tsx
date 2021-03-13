import * as React from "react";
import { ReactNode } from "react";
import useMediaDevices from "~hooks/useMediaDevices";

const Root = (): ReactNode => {
  const { devices } = useMediaDevices();
  return <div>{devices?.map((device) => device.groupId) ?? "no devices"}</div>;
};

export default Root;
