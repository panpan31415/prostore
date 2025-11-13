export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Poststore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce store built with NEXTJS";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const signInFormDefaultValue = {
  email: "",
  password: "",
};
