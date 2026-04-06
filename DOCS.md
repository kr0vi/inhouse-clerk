# Global Auth State Demo (Beginner-Friendly Guide)

This project shows a simple pattern you can copy into almost any React or Next.js frontend:

- Keep auth token helpers in one place
- Wrap your app in one global Auth Provider
- Read auth state from any component with one hook
- Expose helper actions like login, logout, and refresh user

The main frontend implementation in this repo lives under:

- fe/src/lib/auth/
- fe/src/app/
- fe/src/components/Navbar.tsx

This document explains how to build the same setup in your own app from scratch.

---

## 1) What You Are Building

You are building a small auth layer with 4 files:

1. token.ts: save/read/remove token from localStorage
2. api.ts: API calls + auto attach Authorization header
3. context.tsx: global auth state (user, loading, signed-in)
4. useUser.ts: custom hook to access auth state anywhere

Then you:

- Wrap your app root with AuthProvider
- Use useUser() in pages/components
- Protect private pages (for example /me)

---

## 2) Backend Contract (What Frontend Expects)

Your backend should expose these endpoints:

1. POST /signup
2. POST /login
3. GET /me

Expected response behavior used by this frontend pattern:

- POST /login returns { success: true, token: "..." }
- GET /me returns { success: true, user: { id, email, name } }

In this repository, the backend server file is:

- be/src/index.ts

Important for local development:

- The backend currently runs on port 3000 in this repo.
- Next.js frontend also defaults to port 3000.
- You cannot run both on the same port.

Use one of these options:

1. Keep backend on 3000 and run frontend on 3001 with: npm run dev -- -p 3001
2. Or change backend to another port (for example 4000) and update frontend API base URL

---

## 3) Create Auth Folder in Your Frontend

Create this structure in your frontend app:

```text
src/
  lib/
    auth/
      token.ts
      api.ts
      context.tsx
      useUser.ts
```

Install Axios:

```bash
npm install axios
```

---

## 4) token.ts (Token Helpers)

Create src/lib/auth/token.ts:

```ts
// src/lib/auth/token.ts

// A single key keeps token naming consistent across your app.
const TOKEN_KEY = "token";

// Read token from localStorage.
// Returns string when token exists, otherwise null.
export const getToken = () => {
  // localStorage only exists in browser (client side).
  return localStorage.getItem(TOKEN_KEY);
};

// Save token after successful login.
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Clear token on logout.
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
```

Why this file matters:

- No repeated localStorage code all over your app
- Easy to change token key later in one place

---

## 5) api.ts (API Wrapper + Auth Calls)

Create src/lib/auth/api.ts:

```ts
// src/lib/auth/api.ts
import axios from "axios";
import { getToken, removeToken, setToken } from "./token";

// Create one shared axios client.
// Change this to your backend URL.
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor runs before every request.
// If token exists, attach it as Bearer token.
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    // Ensure headers object exists, then set Authorization.
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Login: save token when backend says success=true.
export const login = async (email: string, password: string) => {
  const { data } = await api.post("/login", { email, password });

  if (data.success && data.token) {
    setToken(data.token);
  }

  return data;
};

// Signup: backend creates account.
// This version redirects to login page on success.
export const signup = async (email: string, password: string, name: string) => {
  const { data } = await api.post("/signup", { email, password, name });

  if (data.success) {
    window.location.href = "/login";
  }

  return data;
};

// Me: fetch currently logged-in user from token.
export const getCurrentUser = async () => {
  const { data } = await api.get("/me");
  return data.user;
};

// Logout here is frontend-only for demo.
// (Some apps also call backend logout endpoint.)
export const logout = () => {
  removeToken();
};
```

Why this file matters:

- Every request automatically gets auth token
- Components do not need to know axios details
- Auth flow stays centralized and reusable

---

## 6) context.tsx (Global Auth State)

Create src/lib/auth/context.tsx:

```tsx
"use client";

// src/lib/auth/context.tsx
import { createContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "./api";

// Type for cleaner autocomplete and safety.
type AuthContextValue = {
  user: { id: number; email: string; name: string } | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
};

// Start as null so we can detect missing provider usage.
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [loading, setLoading] = useState(true);

  // Called on first load and after login when we want fresh user data.
  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      // If token is invalid / missing, user becomes signed out.
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check auth state once when app starts.
  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded: !loading,
        isSignedIn: !!user,
        refresh: loadUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

Why this file matters:

- One source of truth for auth state
- Avoids prop drilling user/auth info through many components

---

## 7) useUser.ts (Simple Hook)

Create src/lib/auth/useUser.ts:

```ts
"use client";

// src/lib/auth/useUser.ts
import { useContext } from "react";
import { AuthContext } from "./context";

export const useUser = () => {
  const ctx = useContext(AuthContext);

  // Helpful error for developers during setup.
  if (!ctx) {
    throw new Error("useUser must be used inside AuthProvider");
  }

  return ctx;
};
```

Why this file matters:

- Every component can just call useUser()
- You hide context internals behind a clean API

---

## 8) Wrap App With AuthProvider

In a Next.js app router project, wrap provider in src/app/layout.tsx:

```tsx
// src/app/layout.tsx
import { AuthProvider } from "@/lib/auth/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

If you forget this wrapper, useUser() will throw an error.

---

## 9) Login Page Example

This is the important pattern:

1. call login(email, password)
2. call refresh() so context fetches /me
3. redirect when signed in

```tsx
"use client";

import { useEffect, useState } from "react";
import { login } from "@/lib/auth/api";
import { useUser } from "@/lib/auth/useUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { refresh, isLoaded, isSignedIn } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1) backend returns token
      await login(email, password);

      // 2) context fetches /me and updates global user
      await refresh();
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  useEffect(() => {
    // 3) after state updates, send user to protected page
    if (isLoaded && isSignedIn) {
      window.location.href = "/me";
    }
  }, [isLoaded, isSignedIn]);

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
```

---

## 10) Protect a Private Page (/me)

Use isLoaded + isSignedIn to gate access:

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/auth/useUser";

export default function MePage() {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If auth check finished and user is not signed in, kick to login.
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Hello, {user?.name}</h1>
      <p>{user?.email}</p>
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
```

---

## 11) Use Auth State in Navbar

Anywhere in app, just call useUser():

```tsx
"use client";

import Link from "next/link";
import { useUser } from "@/lib/auth/useUser";

export default function Navbar() {
  const { isSignedIn, logout } = useUser();

  return (
    <nav>
      {isSignedIn ? (
        <>
          <Link href="/me">Account</Link>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <Link href="/signup">Sign up</Link>
          <Link href="/login">Log in</Link>
        </>
      )}
    </nav>
  );
}
```

---

## 12) Common Mistakes (And Fixes)

1. useUser throws "must be used inside AuthProvider"

- Fix: wrap your app root in AuthProvider.

2. /me always fails with 401

- Fix: check login response contains token and setToken(token) is called.
- Fix: make sure request interceptor sends Authorization header.

3. Signed in user still sees logged-out UI

- Fix: call refresh() after login so context re-fetches current user.

4. Frontend and backend conflict on port 3000

- Fix: run frontend on another port or move backend port.

5. Infinite redirect loop

- Fix: only redirect after isLoaded becomes true.

---

## 13) Recommended Small Improvements

These are optional but good for production:

1. Move base URL to env variable (NEXT_PUBLIC_API_BASE_URL)
2. Add loading/error state to login/signup buttons
3. Use typed API response interfaces
4. Use secure token storage strategy if required by your threat model
5. Add password hashing and secure JWT secret handling in backend

---

## 14) Real Project References In This Repo

Auth core files:

- fe/src/lib/auth/token.ts
- fe/src/lib/auth/api.ts
- fe/src/lib/auth/context.tsx
- fe/src/lib/auth/useUser.ts

Integration examples:

- fe/src/app/layout.tsx
- fe/src/components/Navbar.tsx
- fe/src/app/login/page.tsx
- fe/src/app/signup/page.tsx
- fe/src/app/me/page.tsx
- fe/src/app/page.tsx

Backend endpoints used by frontend:

- be/src/index.ts

---

## 15) Minimal Setup Checklist

1. Create auth helper files
2. Install axios
3. Add API base URL
4. Wrap app with AuthProvider
5. Implement login with refresh()
6. Protect private page with isLoaded + isSignedIn
7. Toggle navbar links from auth state

If these 7 steps are done, you have a working global frontend auth state pattern.
