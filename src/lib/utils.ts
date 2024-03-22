import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
    const utcDate = DateTime.fromISO(date);
    const jstDate = utcDate.setZone("Asia/Tokyo");
    return jstDate.toFormat("yyyy/MM/dd HH:mm");
};
