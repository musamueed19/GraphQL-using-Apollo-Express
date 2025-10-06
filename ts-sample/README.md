# TypeScript Sample Project

This is a minimal TypeScript project to verify your setup.

## Scripts
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run the compiled JavaScript
- `npm run dev` — run TypeScript directly via ts-node (no build step)

## Try it (Windows cmd)
```cmd
cd /d "E:\Codes\Udemy Learn\Apollo + GraphQL\ts-sample"
npm install
npm run build
npm start
```
Expected output:
```
Hello, <your-username>! TypeScript is working.
```

Optional (run without build):
```cmd
npm run dev
```

Notes:
- This project uses CommonJS to avoid ESM loader issues.
- If you prefer ESM, change `tsconfig.json` -> `module` to `ESNext` and use `ts-node-esm`.
