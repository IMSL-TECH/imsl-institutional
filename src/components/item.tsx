import { Dispatch, ReactNode, SetStateAction } from "react";

interface EventItemProps {
    isSelect: string;
    setIsSelect: Dispatch<SetStateAction<number>>;
    idx: number;
    children: ReactNode;
    singleEventUrl:string
  }
// Melhorar nome
export default function Item({ isSelect, setIsSelect, idx, children, singleEventUrl }: EventItemProps) {
    return (
      <div
        onMouseEnter={() => setIsSelect(idx)}
        onMouseLeave={() => setIsSelect(0)}
        className={`${isSelect} h-full rounded-xl border relative transition-all duration-300 p-4`}
      >
        <a href={singleEventUrl}>
        {children}
        </a>

      </div>
    );
  }