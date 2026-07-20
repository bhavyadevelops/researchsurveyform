# Running the Survey App (TanStack Start + Vite)

## How to reproduce the artifacts

This project uses standard npm dependencies only (no env files or special artifacts needed).

```
npm install
```

## How to run the dev server

```bash
cd <project-root>
npx vite dev --port 3000
```

The server starts on `http://localhost:3000/`.

To run in background (for preview):

```bash
npx vite dev --port 3000 > .freebuff/preview-<thread-id>.log 2>&1 &
```
