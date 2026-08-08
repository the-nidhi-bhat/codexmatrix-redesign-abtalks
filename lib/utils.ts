import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountdownToMidnightIST(): { hours: number; minutes: number; seconds: number; totalMs: number } {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffsetMs + now.getTimezoneOffset() * 60 * 1000);
  const midnight = new Date(istNow);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - istNow.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, totalMs: diff };
}

export function isValidGithubUrl(url: string) {
  return /^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/(commit|tree|pull)\/[\w.-]+)?\/?$/i.test(
    url.trim()
  );
}

export function isValidLinkedinUrl(url: string) {
  return /^https:\/\/(www\.)?linkedin\.com\/(posts|feed)\/[\w\-?=&%.]+/i.test(url.trim());
}
