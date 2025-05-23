export const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const shortMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const shortWeekDays = ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"];


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function phoneFormat(phone: string|null|undefined): string {


  if(!phone) return ""

  const digits = phone.replace(/\D/g, '');


  if (digits.length !== 13 || !digits.startsWith('55')) {
    return phone; 
  }

  const ddd = digits.slice(2, 4);        
  const firstPart = digits.slice(4, 9); 
  const secondPart = digits.slice(9);  

  return `(${ddd})${firstPart}-${secondPart}`;
}