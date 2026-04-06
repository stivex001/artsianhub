# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Development server (Turbopack)
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run test       # Jest tests (all)
npx jest path/to/test.spec.ts   # Run a single test file
npx jest --testNamePattern "test name"  # Run tests matching a name
```

## Architecture Overview

**Mensayhub** (Artisanshub) is a multi-role marketplace platform connecting artisans with clients.

### Routing Structure

Uses Next.js App Router with route groups by user role:

- `app/(public)/` — unauthenticated pages (landing, artisan listings, contact)
- `app/(Client)/` — buyer/client dashboard and features
- `app/(Artisan)/` — artisan dashboard (profile, jobs, subscriptions)
- `app/(Admin)/` — admin panel
- `app/auth/` — login/signup flows
- `app/api/` — API routes (Google Maps places)

There is no Next.js middleware for auth guards; access control is handled client-side within route layouts/components.

### State Management

Two layers:

1. **Zustand** (`store/`) — client-side persistent state
   - `authStore.ts` — JWT `accessToken` and `currentUser` (type `AuthUser`). Role flags (`isArtisan`, `isAdmin`, `isClient`, `isVerified`) live on `currentUser`, not the store directly. Persists to `sessionStorage`.
   - `useModalStore.ts` — modal visibility state
   - `filterStore.ts`, `artisanProfileStore.ts`, `kycStore.ts`

2. **TanStack Query** (`contexts/query-provider.tsx`) — server state via custom hooks:
   - `hooks/useApiQuery.ts` — wraps `useQuery`, prepends `BASE_URL` automatically
   - `hooks/useApiMutation.ts` — wraps `useMutation`, prepends `BASE_URL` automatically

### API Layer

- Base URL: `https://api.artisanshub.org` — hardcoded in `constants/index.ts` (not an env var)
- HTTP client: Axios in `hooks/axiosInstance.ts` — attaches Bearer token from `authStore`, redirects to `/auth/login` on 401
- Low-level helper: `hooks/apiFunction.ts` — called by `useApiQuery`/`useApiMutation`, errors normalized via `hooks/errorHandling.ts`
- Domain hooks: `api/crud/*.ts` — feature-specific hooks (auth, artisans, categories, services, etc.) built on top of `useApiMutation`/`useApiQuery`

### Component Organization

- `components/ui/` — base shadcn/ui components (Radix UI primitives)
- `components/shared/` — cross-role reusable components
- `components/{Admin,Artisan,Client}/` — role-specific components
- `components/modals/` — modal components
- `components/controlledInputs/` — form input wrappers for React Hook Form

### Forms & Validation

- React Hook Form + Zod + `@hookform/resolvers`
- `schemas/dynamicSchema.ts` exports `createSchema(fields: Field[])` — builds a Zod schema from a field config array supporting types: `text`, `email`, `password`, `number`, `date`, `time`, `select`, `radio`, `checkbox`, `file`, `multiselect`
- `hooks/useDynamicForm.ts` — convenience wrapper: accepts the same `Field[]` array, returns `useForm` methods with Zod resolver pre-wired

### Styling

- Tailwind CSS with a custom palette (primary: `#02198B`, accent: `#F0C422`)
- Font: Satoshi (local woff2, variable font loaded in `app/layout.tsx`)
- Dark mode via `next-themes` (class-based)
- Animations with Framer Motion
- Toast notifications via Sonner (`position="top-center"`)

### Key Config

- `next.config.ts`: `output: "standalone"` (Docker), trailing slashes, images from Cloudinary/Unsplash, `/home` redirects to `/`
- `tailwind.config.ts`: custom colors, shadows, container max-width 1440px
- TypeScript path alias: `@/*` maps to root
- Jest: configured in `jest.config.js` using `next/jest`; `@/` alias supported in tests
