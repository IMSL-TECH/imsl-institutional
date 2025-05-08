import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function phoneFormat(phone: string): string {

  const digits = phone.replace(/\D/g, '');


  if (digits.length !== 13 || !digits.startsWith('55')) {
    return phone; 
  }

  const ddd = digits.slice(2, 4);        
  const firstPart = digits.slice(4, 9); 
  const secondPart = digits.slice(9);  

  return `(${ddd})${firstPart}-${secondPart}`;
}