"use client"

import {useRouter} from "next/navigation";
import { Button } from "./ui/button";
import { Brush } from 'lucide-react';

export default function ClearSearch(){
    const router = useRouter()

    const handleClck = () => {
        router.replace(`events`, { scroll: false });
    }

    return (
        <Button className="w-11 h-11 pointer" onClick={() => handleClck()}>
            Clear
        </Button>
    )
}