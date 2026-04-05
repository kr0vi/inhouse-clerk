# Inhouse Clerk (Frontend Demo)

This repo is a demo that shows how to build a Clerk-style auth UI with a small, reusable auth helper layer. Use it as a reference for structure and flow rather than a full product.

## Build This Structure In Your Own App

# 1) Create the auth helper folder

Create a small auth library under `src/lib/auth`:

```
src/lib/auth/
	api.ts
	context.tsx
	token.ts
	useUser.ts
```

What each file does:

- `api.ts`: wraps axios and exposes `login`, `signup`, `getCurrentUser`, `logout`.
- `token.ts`: local storage token helpers (`getToken`, `setToken`, `removeToken`).
- `context.tsx`: global auth state and `AuthProvider`.
- `useUser.ts`: hook that exposes auth state to components.

Reference implementation:

- [src/lib/auth/api.ts](src/lib/auth/api.ts)
- [src/lib/auth/context.tsx](src/lib/auth/context.tsx)
- [src/lib/auth/token.ts](src/lib/auth/token.ts)
- [src/lib/auth/useUser.ts](src/lib/auth/useUser.ts)

## Auth Helper Files (Detailed)

Use these as a blueprint when recreating the helper layer in another project.

### [src/lib/auth/token.ts](src/lib/auth/token.ts)

 A utils file which exports jwt token helpers

What to implement:

- `getToken()`: returns the current token string or `null`.
- `setToken(token)`: stores the token after login.
- `removeToken()`: clears the token on logout.


### [src/lib/auth/api.ts](src/lib/auth/api.ts)

 an API wrapper around axios that always includes the auth token and exposes auth calls.

What to implement:

- Create an axios instance with a shared `baseURL`.
- Add a request interceptor to attach `Authorization: Bearer <token>` if a token exists.
- `login(email, password)`: `POST /login`, store token on success, return the response payload.
- `signup(email, password, name)`: `POST /signup`, optionally redirect to `/login` on success.
- `getCurrentUser()`: `GET /me`, return the user object.
- `logout()`: just clears the token (no network call in this demo).

### [src/lib/auth/context.tsx](src/lib/auth/context.tsx)

 global auth state.

What to implement:

- Create a React context with an initial `null` value.
- Track `user` and `loading` state.
- `loadUser()`: call `getCurrentUser()` and update `user` + `loading`.
- Run `loadUser()` on mount (initial auth check).
- Expose these fields via the provider:
  - `user`: current user object or `null`
  - `isLoaded`: inverse of `loading`
  - `isSignedIn`: boolean based on `user`
  - `logout()`: clears token and user
  - `refresh()`: re-run `loadUser()` (used after login)

### [src/lib/auth/useUser.ts](src/lib/auth/useUser.ts)

 a hook so components can access auth state.

What to implement:

- Use `useContext(AuthContext)` to read the provider state.
- Throw a helpful error if the hook is used outside of the provider.

# 2) Wire the provider at the root

Wrap the app in `AuthProvider` inside your root layout so auth state is available everywhere.

See [src/app/layout.tsx](src/app/layout.tsx).

# 3) Auth routes

Create the pages that use the helpers:

implementation:

- [src/app/page.tsx](src/app/page.tsx) (landing with email prefill)
- [src/app/login/page.tsx](src/app/login/page.tsx)
- [src/app/signup/page.tsx](src/app/signup/page.tsx)
- [src/app/me/page.tsx](src/app/me/page.tsx) (protected profile)

# 4) Responsive Navbar

The navbar reads auth state from `useUser()` and switches links based on signed-in state.

See [src/components/Navbar.tsx](src/components/Navbar.tsx).

## Backend Expectations

Your backend should provide these endpoints:

- `POST /signup` (email, password, name)
- `POST /login` (email, password)
- `GET /me` (expects a bearer token)

The API base URL is set in [src/lib/auth/api.ts](src/lib/auth/api.ts). Update it to match your backend.

## Quick Run (Demo)

```bash
npm install
npm run dev
```

Visit http://localhost:3000
