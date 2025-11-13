"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInFormDefaultValue } from "@/lib/constants";
import Link from "next/link";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const SingInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" variant={"default"}>
      {pending ? "Signing In ..." : "Sign In"}
    </Button>
  );
};

const CredentialSignInForm = () => {
  const [state, action] = useActionState(signInWithCredentials, {
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
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="user@example.com"
            className="mt-2"
            defaultValue={signInFormDefaultValue.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="******"
            defaultValue={signInFormDefaultValue.password}
            className="mt-2"
          />
        </div>
        {state && !state.success && (
          <div className="text-center text-destructive">{state.message}</div>
        )}
        <div>
          <SingInButton />
        </div>
        <div className="text-sm text-center text-muted-foreground">
          don&apos;t have an account? {` `}
          <Link href={"/sign-up"} className="text-black" target="_self">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialSignInForm;
