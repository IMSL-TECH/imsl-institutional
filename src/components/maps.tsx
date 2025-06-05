"use client";

import React from "react";

interface MapsProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  placeUrl: string;
}

const Maps: React.FC<MapsProps> = ({ placeUrl, ...props }) => {
  return (
    <iframe
      src={placeUrl}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      {...props}
    ></iframe>
  );
};

export default Maps;