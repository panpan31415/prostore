import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convert<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(number: number) {
  return number.toFixed(2);
}

// Format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldErrors = error.issues.map((issue) => issue.message);
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const filed = error.meta?.target ? error.meta.target[0] : "Field";
    return `${filed.charAt(0).toUpperCase() + filed.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function round2(value: number | string) {
  if (typeof value === "number" || typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }
  throw new Error("invalid value");
}
