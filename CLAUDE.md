# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — run the server with live reload via `tsx watch` (no build step needed).
- `npm run build` — compile TypeScript to `dist/` with `tsc`.
- `npm start` — run the compiled output (`node dist/server.js`); requires `npm run build` first.

There is currently no test runner, linter, or formatter configured.

## Environment

`connectDB()` in [src/db.ts](src/db.ts) reads `MONGO_URI` from `.env` (loaded via `dotenv/config`) and **throws on startup if it is unset**, so the server will not boot without a reachable MongoDB URI. The listen `PORT` is hardcoded to `5000` in [src/server.ts](src/server.ts).

## Architecture

Express 5 + TypeScript REST API for tracking expenses. Two source files:

- [src/server.ts](src/server.ts) — app setup, `connectDB()` call, and all routes (`/api/expenses` GET/POST, `/api/expenses/:id` GET).
- [src/db.ts](src/db.ts) — Mongoose connection helper.

**Key thing to know:** the database is wired up but not yet used. `connectDB()` opens a Mongoose connection, but the route handlers read from and write to an in-memory `expenses` array declared in `server.ts` — there are no Mongoose models/schemas yet. IDs are assigned as `array.length + 1`. Any real persistence work means introducing a model and replacing the in-memory array in the handlers; expect that migration to be the main direction of new work here.

Note the config mismatch to keep in mind when adding files: `tsconfig.json` uses `module: NodeNext` while `package.json` sets `"type": "commonjs"`. Imports in the source are written without file extensions, which works under the current `tsx`/`tsc` setup.
