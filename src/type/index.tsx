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