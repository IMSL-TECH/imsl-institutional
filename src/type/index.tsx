import { HomePageEventsQueryResult, internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from "sanity-shared/types";

export type IconProps = React.HTMLAttributes<HTMLDivElement>;

export type PortableTextBlock = {
    children?: Array<{
      marks?: string[];
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  };

export type ScheduleType = Array<
  NonNullable<
    NonNullable<
      NonNullable<HomePageEventsQueryResult>[number]["schedule"]
    >[number]
  >
> | null;

export type ImageType = {
  asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
} | null | undefined;