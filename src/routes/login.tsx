import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useState } from "react";

import { AuthFooterLink, AuthLayout, useAuthSubmit } from "@/components/AuthForms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const raw = search["redirect"];
    const redirect = typeof raw === "string" ? raw : undefined;
    return redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? { redirect } : {};
  },
  head: () => ({
    meta: [
      { title: "ចូលគណនី — Harvest Pizza" },
      {
        name: "description",
        content: "ចូលគណនី Harvest Pizza របស់អ្នកដើម្បីទូទាត់ប្រាក់សម្រាប់ការកុម្ម៉ង់។",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, logout } = useAuth();
  const { redirect } = Route.useSearch();
  const { error, handleSubmit } = useAuthSubmit(redirect);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <AuthLayout
        title="អ្នកបានចូលគណនីហើយ"
        description={`បានចូលគណនីជា ${user.email}។`}
        icon={<LogIn className="h-7 w-7" />}
      >
        <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
          <Link to="/">បន្ត</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={logout}>
          ចាកចេញវិញ
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="សូមស្វាគមន៍ការត្រឡប់មកវិញ" description="ចូលគណនីរបស់អ្នកដើម្បីបន្ត។">
      <form
        className="space-y-4"
        onSubmit={(e) => handleSubmit("login", { email, password }, e)}
        noValidate
      >
        <div className="space-y-1.5">
          <Label htmlFor="login-email">អ៊ីមែល</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="login-password">ពាក្យសម្ងាត់</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          ចូលគណនី
        </Button>
      </form>
      <AuthFooterLink
        prompt="ថ្មីចំពោះ Harvest Pizza មែនទេ?"
        to="/register"
        label="បង្កើតគណនីថ្មី"
        redirect={redirect}
      />
    </AuthLayout>
  );
}
