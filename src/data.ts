import type { TTip } from "./types";
import { randomUUID } from "crypto";

type TUser = { id: string; username: string; password: string; tips: TTip[] };

let database: TUser[] = [
  {
    id: "A0328Xhf8",
    username: "jimmy123",
    password: "jimmy123!",
    tips: [
      {
        id: "1",
        text: "Prefer const over let when you can.",
        likes: 2,
        createdAt: Date.now() - 10000,
      },
    ],
  },
  {
    id: "BFGZ8328X",
    username: "sandra123",
    password: "sandra123!",
    tips: [
      {
        id: "2",
        text: "Name things clearly, future you will thank you.",
        likes: 5,
        createdAt: Date.now() - 5000,
      },
    ],
  },
];

// Function to authenticate user - ADD THIS FUNCTION
export function authenticateUser(username: string, password: string): TUser | null {
  const user = database.find(u => u.username === username && u.password === password);
  return user || null;
}

// TODO: Add a userId field and modify inner logic to use it
export function getTips(userId: string) {
  const user = database.find((user) => user.id === userId);
  if (user) {
    return user.tips;
  }
  return [];
}

// TODO: Add a userId field and modify inner logic to use it
export function addTip(userId: string, text: string) {
  const user = database.find((user) => user.id === userId);
  if (!user) {
    return null;
  }
  const tip: TTip = {
    id: randomUUID(),
    text: text,
    likes: 0,
    createdAt: Date.now(),
  };
  database[0]?.tips.push(tip);
  return tip;
}

// TODO: Add a userId field and modify inner logic to use it
export function like(userId: string, id: string) {
  const user = database.find((user) => user.id === userId);
  if (!user) {
    return null;
  }
  const foundTip = database[0]?.tips.find((tip) => tip.id === id);
  if (foundTip) {
    foundTip.likes++;
  }
  return foundTip;
}

// TODO: Add a userId field and modify inner logic to use it
export function dislike(userId: string ,id: string) {
  const user = database.find((user) => user.id === userId);
  if (!user) {
    return null;
  }

  const foundTip = database[0]?.tips.find((tip) => tip.id === id);
  if (foundTip) {
    foundTip.likes--;
  }
  return foundTip;
}

// TODO: Add a userId field and modify inner logic to use it
export function remove(userId: string, id: string) {
  const user = database.find((user) => user.id === userId);
  if (!user) {
    return null;
  }

  const tipToDelete = database[0]?.tips.findIndex((tip) => tip.id === id);
  if (tipToDelete != undefined && tipToDelete != -1) {
    database[0]?.tips.splice(tipToDelete, 1);
  }
}
