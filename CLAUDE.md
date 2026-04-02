# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Development server (Turbopack)
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run test       # Jest tests
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

### State Management

Two layers:

1. **Zustand** (`store/`) — client-side persistent state
   - `authStore.ts` — JWT token, currentUser, role flags (`isArtisan`, `isAdmin`, `isClient`, `isVerified`). Persists to `sessionStorage`.
   - `useModalStore.ts` — modal visibility state
   - `filterStore.ts`, `artisanProfileStore.ts`, `kycStore.ts`

2. **TanStack Query** (`contexts/query-provider.tsx`) — server state via custom hooks:
   - `hooks/useApiQuery.ts` — wraps `useQuery`
   - `hooks/useApiMutation.ts` — wraps `useMutation`

### API Layer

- Base URL: `https://api.artisanshub.org` (defined in `constants/index.ts`)
- HTTP client: Axios, configured in `hooks/axiosInstance.ts`
- Auth: JWT Bearer tokens; expired tokens automatically redirect to `/login`

### Component Organization

- `components/ui/` — base shadcn/ui components (Radix UI primitives)
- `components/shared/` — cross-role reusable components
- `components/{Admin,Artisan,Client}/` — role-specific components
- `components/modals/` — modal components
- `components/controlledInputs/` — form input wrappers for React Hook Form

### Forms & Validation

- React Hook Form + Zod (`schemas/dynamicSchema.ts`) + `@hookform/resolvers`
- Reusable form logic in `hooks/useDynamicForm.ts`

### Styling

- Tailwind CSS with a custom palette (primary: `#02198B`, accent: `#F0C422`)
- Dark mode via `next-themes` (class-based)
- Animations with Framer Motion
- Toast notifications via Sonner

### Key Config

- `next.config.ts`: `output: "standalone"` (Docker), trailing slashes, images from Cloudinary/Unsplash, `/home` redirects to `/`
- `tailwind.config.ts`: custom colors, shadows, container max-width 1440px
- TypeScript path alias: `@/*` maps to root
