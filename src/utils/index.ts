import { format, isSameDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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




type FormattedDate = {
  dd: string // 24
  mm: string // 05
  aa: string // 25
  aaaa:string // 2025
  shortMonth: string // Mai
  month: string; // Maio
  dayOfWeek:string // Sábado
}

export function formatDateBr(dataString: string ): FormattedDate{

  if(dataString === "")  
    return { dd: "",
              mm:"",
              aa: "",
              aaaa:"",
              shortMonth:"",
              month: "",
              dayOfWeek:"",
            }
  const data = parseISO(dataString)

  return {

      dd: format(data, "dd"),
      mm: format(data, "MM"),
      aa: format(data, "yy"),
      aaaa: format(data, "yyyy"),
      shortMonth:format(data,"MMM",{ locale: ptBR }),
      month: format(data,"MMMM",{ locale: ptBR }),
      dayOfWeek:format(data, "EEEE", { locale: ptBR }),

  }
}



export function isOneDayEvent(dataInicio: string, dataFim: string): boolean {
  const inicio = parseISO(dataInicio)
  const fim = parseISO(dataFim)
  return isSameDay(inicio, fim)
}


type ScheduleItem = {
  date: string | null; // formato esperado: 'YYYY-MM-DD'
  startTime?: string | null;
  endTime?: string | null;
};

export function getEventDateRange(schedule: ScheduleItem[] | null) {
  if (!schedule || schedule.length === 0) {
    return { first: null, last: null };
  }

  const validItems = schedule.filter(item => !!item.date && !isNaN(new Date(item.date).getTime()));

  if (validItems.length === 0) {
    return { first: null, last: null };
  }

  const sorted = [...validItems].sort((a, b) => {
    return new Date(a.date!).getTime() - new Date(b.date!).getTime();
  });

  return {
    first: sorted[0],
    last: sorted[sorted.length - 1],
  };
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

export function formatDateEventCard(schedule: ScheduleItem[] | null): string {
  const { first, last } = getEventDateRange(schedule)

  if (!first?.date || !last?.date) {
    return ''
  }

  if (isOneDayEvent(first.date, last.date)) {
    const dataFormatada = formatDateBr(first.date)
    return `${dataFormatada.dayOfWeek}, ${dataFormatada.dd}/${dataFormatada.mm}`
  }

  const inicio = `${formatDateBr(first.date).dd}/${formatDateBr(first.date).mm}`
  const fim = `${formatDateBr(last.date).dd}/${formatDateBr(last.date).mm}`
  return `${inicio} - ${fim}`
}
