import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { type FormEvent, useState } from "react";

import { AuthFooterLink, AuthLayout, useAuthSubmit } from "@/components/AuthForms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const raw = search["redirect"];
    const redirect = typeof raw === "string" ? raw : undefined;
    return redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? { redirect } : {};
  },
  head: () => ({
    meta: [
      { title: "បង្កើតគណនី — Harvest Pizza" },
      {
        name: "description",
        content: "បង្កើតគណនី Harvest Pizza ដើម្បីកុម្ម៉ង់ និងទូទាត់ប្រាក់តាមអនឡាញ។",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { user, logout } = useAuth();
  const { redirect } = Route.useSearch();
  const { error, handleSubmit } = useAuthSubmit(redirect);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (user) {
    return (
      <AuthLayout
        title="អ្នកបានចូលគណនីហើយ"
        description={`បានចូលគណនីជា ${user.email}។`}
        icon={<UserPlus className="h-7 w-7" />}
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

  function onSubmit(e: FormEvent) {
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "សូមបញ្ចូលឈ្មោះរបស់អ្នក។";
    if (!email.trim()) next["email"] = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក។";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next["email"] = "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។";
    if (password.length < 6) next["password"] = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 6 តួអក្សរ។";
    if (confirm !== password) next["confirm"] = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។";
    setFieldErrors(next);
    if (Object.keys(next).length > 0) {
      e.preventDefault();
      return;
    }
    handleSubmit("register", { name, email, password }, e);
  }

  return (
    <AuthLayout
      title="បង្កើតគណនីថ្មី"
      description="ចុះឈ្មោះដើម្បីកុម្ម៉ង់ និងទូទាត់ប្រាក់នៅ Harvest Pizza។"
      icon={<UserPlus className="h-7 w-7" />}
    >
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="register-name">ឈ្មោះ</Label>
          <Input
            id="register-name"
            autoComplete="name"
            placeholder="ឈ្មោះរបស់អ្នក"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors["name"] && <p className="text-xs text-destructive">{fieldErrors["name"]}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-email">អ៊ីមែល</Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors["email"] && (
            <p className="text-xs text-destructive">{fieldErrors["email"]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-password">ពាក្យសម្ងាត់</Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="យ៉ាងហោចណាស់ 6 តួអក្សរ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors["password"] && (
            <p className="text-xs text-destructive">{fieldErrors["password"]}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="register-confirm">បញ្ជាក់ពាក្យសម្ងាត់</Label>
          <Input
            id="register-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="វាយពាក្យសម្ងាត់ម្តងទៀត"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {fieldErrors["confirm"] && (
            <p className="text-xs text-destructive">{fieldErrors["confirm"]}</p>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          បង្កើតគណនី
        </Button>
      </form>
      <AuthFooterLink
        prompt="មានគណនីរួចហើយមែនទេ?"
        to="/login"
        label="ចូលគណនី"
        redirect={redirect}
      />
    </AuthLayout>
  );
}
