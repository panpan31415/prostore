"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import prisma from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// signin the user with credentials

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirectTo: (formData.get("callbackUrl") as string) || "/",
    });
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

// sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        password: user.password,
        email: user.email,
      },
    });
    await await signIn("credentials", {
      email: user.email,
      password: user.confirmPassword,
      redirectTo: (formData.get("callbackUrl") as string) || "/",
    });
    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "User was not registered",
    };
  }
}
