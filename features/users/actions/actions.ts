"use server";

import { Todo } from "@/features/todo/schema";
import { User, UserTableData } from "../schema";
import { Post } from "@/features/post/schema";

const convertUserData = (data: [User[], Post[], Todo[]]): UserTableData[] => {
  const [users, posts, todos] = data;

  if (users.length == 0) return [];

  const postsByUser = new Map<number, number>();
  const todosByUser = new Map<number, { completed: number; pending: number }>();
  const userTableData: UserTableData[] = [];

  for (const post of posts) {
    postsByUser.set(
      post.userId,
      postsByUser.has(post.userId) ? (postsByUser.get(post.userId) ?? 0) + 1 : 1,
    );
  }

  for (const todo of todos) {
    const current = todosByUser.get(todo.userId) ?? { completed: 0, pending: 0 };

    if (todo.completed) current.completed++;
    else current.pending++;

    todosByUser.set(todo.userId, current);
  }

  for (const user of users) {
    userTableData.push({
      userId: user.id,
      email: user.email,
      website: user.website,
      name: user.name,
      post: postsByUser.get(user.id) ?? 0,
      todo: {
        pending: todosByUser.get(user.id)?.pending ?? 0,
        completed: todosByUser.get(user.id)?.completed ?? 0,
      },
    });
  }

  return userTableData || [];
};

export interface GetUserTableParams {
  page: number;
  pageSize: number;
  search?: string;
  sorting?: { id: string; desc: boolean }[];
  filter?: string[];
}

export interface GetUserTableResponse {
  data: UserTableData[];
  totalCount: number;
}

export const getUsersTableData = async ({
  page,
  pageSize,
  search = "",
  sorting = [],
  filter = [],
}: GetUserTableParams) => {
  const [usersRes, postsRes, todosRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users", { next: { revalidate: 60 } }),
    fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 60 } }),
    fetch("https://jsonplaceholder.typicode.com/todos", { next: { revalidate: 60 } }),
  ]);

  const userPostTodo = await Promise.all([
    usersRes.json() as Promise<User[]>,
    postsRes.json() as Promise<Post[]>,
    todosRes.json() as Promise<Todo[]>,
  ]);

  let usersTableData = convertUserData(userPostTodo);

  if (filter && filter.length > 0) {
    usersTableData = usersTableData.filter((u) => {
      return filter.every((f) => {
        if (f === "completed_gt_10") return u.todo.completed > 10;
        if (f === "completed_lt_10") return u.todo.completed < 10;
        if (f === "pending_gt_10") return u.todo.pending > 10;
        if (f === "pending_lt_10") return u.todo.pending < 10;
        return true;
      });
    });
  }

  if (search.trim().length > 0) {
    const lowerSearch = search.toLowerCase();
    usersTableData = usersTableData.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) || u.email.toLowerCase().includes(lowerSearch),
    );
  }

  if (sorting.length > 0) {
    const { id, desc } = sorting[0];
    const dir = desc ? -1 : 1;

    usersTableData.sort((a: any, b: any) => {
      if (a[id] < b[id]) return -dir;
      if (a[id] > b[id]) return dir;
      return 0;
    });
  }

  const totalCount = usersTableData.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = usersTableData.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedUsers,
    totalCount,
  };
};
