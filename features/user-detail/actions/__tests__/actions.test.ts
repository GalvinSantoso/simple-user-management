import { getUserDetail, getUserPosts, getUserTodos } from "../actions";

describe("user detail server actions", () => {
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserDetail", () => {
    it("should return user details on success", async () => {
      const mockUser = { id: 1, name: "Leanne Graham" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

      const result = await getUserDetail("1");
      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1",
        expect.any(Object),
      );
    });

    it("should throw 'User not found' on 404 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getUserDetail("999")).rejects.toThrow("User not found");
    });

    it("should throw network error on reject", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      await expect(getUserDetail("1")).rejects.toThrow("Network Error");
    });
  });

  describe("getUserPosts", () => {
    it("should return posts for a given user", async () => {
      const mockPosts = [{ id: 1, userId: 1, title: "Title 1", body: "Body 1" }];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

      const result = await getUserPosts("1");
      expect(result).toEqual(mockPosts);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts?userId=1",
        expect.any(Object),
      );
    });

    it("should throw 'Failed to fetch posts' on error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getUserPosts("1")).rejects.toThrow("Failed to fetch posts");
    });
  });

  describe("getUserTodos", () => {
    it("should return todos for a given user", async () => {
      const mockTodos = [{ id: 1, userId: 1, title: "Title 1", completed: false }];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      });

      const result = await getUserTodos("1");
      expect(result).toEqual(mockTodos);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        expect.any(Object),
      );
    });

    it("should throw 'Failed to fetch todos' on error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getUserTodos("1")).rejects.toThrow("Failed to fetch todos");
    });
  });
});
