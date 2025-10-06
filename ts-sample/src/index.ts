// A tiny TypeScript program to verify your setup

function greet(name: string): string {
  return `Hello, ${name}! TypeScript is working.`;
}

const who = process.env.USER || process.env.USERNAME || "developer";
console.log(greet(who));
