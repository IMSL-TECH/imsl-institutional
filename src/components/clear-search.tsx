"use client"

import {useRouter} from "next/navigation";
import { Button } from "./ui/button";
import { Brush, Eraser } from 'lucide-react';

export default function ClearSearch({local}: {local: string}){
    const router = useRouter()

    const handleClck = () => {
        router.replace(local, { scroll: false });
    }

    return (
        <Button className="w-11 h-11 bg-[#179389] hover:hover:bg-teal-700" onClick={() => handleClck()}>
            <Eraser className="w-6 h-6" />
        </Button>
    )
}