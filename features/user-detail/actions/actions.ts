"use server";

import { User } from "@/features/users/schema";
import { Post } from "@/features/post/schema";
import { Todo } from "@/features/todo/schema";

export async function getUserDetail(userId: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("User not found");

  return res.json();
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}

export async function getUserTodos(userId: string): Promise<Todo[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch todos");

  return res.json();
}
