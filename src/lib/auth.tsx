import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = User & { password: string };

type AuthContextValue = {
  user: User | null;
  register: (name: string, email: string, password: string) => Result;
  login: (email: string, password: string) => Result;
  logout: () => void;
};

export type Result = { ok: true } | { ok: false; error: string };

const USERS_KEY = "harvest-pizza-users";
const SESSION_KEY = "harvest-pizza-session";

const AuthContext = createContext<AuthContextValue | null>(null);

// NOTE: demo-only auth. Passwords live in localStorage and are NOT secure —
// a real app must hash passwords server-side.
function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // storage unavailable — registration won't persist
  }
}

function loadSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { id, name, email } = parsed as Partial<User>;
    if (typeof id !== "string" || typeof name !== "string" || typeof email !== "string") {
      return null;
    }
    return { id, name, email };
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  try {
    if (user) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // storage unavailable — session stays in memory
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadSession);

  const register = useCallback((name: string, email: string, password: string): Result => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser: StoredUser = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `u-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
    };
    saveUsers([...users, newUser]);
    const session: User = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(session);
    saveSession(session);
    return { ok: true };
  }, []);

  const login = useCallback((email: string, password: string): Result => {
    const normalizedEmail = email.trim().toLowerCase();
    const match = loadUsers().find((u) => u.email === normalizedEmail);
    if (!match || match.password !== password) {
      return { ok: false, error: "Incorrect email or password." };
    }
    const session: User = { id: match.id, name: match.name, email: match.email };
    setUser(session);
    saveSession(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, register, login, logout }),
    [user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
