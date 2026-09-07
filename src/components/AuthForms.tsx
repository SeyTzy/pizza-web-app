import { Link, useRouter } from "@tanstack/react-router";
import { Pizza } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

export function AuthLayout({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-muted/30 px-4 py-16">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon ?? <Pizza className="h-7 w-7" />}
          </div>
          <CardTitle className="font-display text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">{children}</CardContent>
      </Card>
    </div>
  );
}

export function useAuthSubmit(redirect?: string) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(
    kind: "login" | "register",
    fields: { name?: string; email: string; password: string },
    event: FormEvent,
  ) {
    event.preventDefault();
    setError(null);
    const result =
      kind === "login"
        ? login(fields.email, fields.password)
        : register(fields.name ?? "", fields.email, fields.password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.history.push(redirect ?? "/");
  }

  return { error, handleSubmit };
}

export function AuthFooterLink({
  prompt,
  to,
  label,
  redirect,
}: {
  prompt: string;
  to: "/login" | "/register";
  label: string;
  redirect?: string | undefined;
}) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {prompt}{" "}
      <Link
        to={to}
        search={redirect ? { redirect } : {}}
        className="font-medium text-primary hover:underline"
      >
        {label}
      </Link>
    </p>
  );
}
