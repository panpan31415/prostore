"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signUpFormDefaultValue } from "@/lib/constants";

const SignUpButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" variant={"default"}>
      {pending ? "Signing Up ..." : "Sign Up"}
    </Button>
  );
};

const SignUpForm = () => {
  const [state, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log("callbackUrl:", callbackUrl);

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            className="mt-2"
            defaultValue={signUpFormDefaultValue.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-2"
            defaultValue={signUpFormDefaultValue.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            defaultValue={signUpFormDefaultValue.password}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Password</Label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Enter your password again"
            defaultValue={signUpFormDefaultValue.confirmPassword}
            className="mt-2"
          />
        </div>
        {state && !state.success && (
          <div className="text-center text-destructive">{state.message}</div>
        )}
        <div>
          <SignUpButton />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Have an account already? {` `}
          <Link href={"/sign-in"} className="text-black" target="_self">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
