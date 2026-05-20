import { getUsersTableData } from "../actions";

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: { name: "Romaguera-Crona", catchPhrase: "Multi-layered client-server neural-net" },
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: { name: "Deckow-Crist", catchPhrase: "Proactive didactic contingency" },
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: { name: "Romaguera-Jacobson", catchPhrase: "Face to face bifurcated interface" },
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
    },
  },
];

const mockPosts = [
  { id: 1, userId: 1, title: "post 1", body: "body 1" },
  { id: 2, userId: 1, title: "post 2", body: "body 2" },
  { id: 3, userId: 2, title: "post 3", body: "body 3" },
];

const mockTodos = [
  { id: 1, userId: 1, title: "todo 1", completed: true },
  { id: 2, userId: 1, title: "todo 2", completed: false },
  { id: 3, userId: 2, title: "todo 3", completed: true },
  { id: 4, userId: 2, title: "todo 4", completed: true },
  { id: 5, userId: 3, title: "todo 5", completed: false },
];

describe("getUsersTableData server action", () => {
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

  const setupMockSuccess = () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/users")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        });
      }
      if (url.includes("/posts")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPosts),
        });
      }
      if (url.includes("/todos")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodos),
        });
      }
      return Promise.reject(new Error("Unknown URL"));
    });
  };

  it("should return users list with derived activity signals", async () => {
    setupMockSuccess();

    const response = await getUsersTableData({
      page: 1,
      pageSize: 5,
    });

    expect(response.totalCount).toBe(3);
    expect(response.data).toHaveLength(3);

    const user1 = response.data.find((u) => u.userId === 1);
    expect(user1).toBeDefined();
    expect(user1?.post).toBe(2);
    expect(user1?.todo.completed).toBe(1);
    expect(user1?.todo.pending).toBe(1);

    const user2 = response.data.find((u) => u.userId === 2);
    expect(user2?.post).toBe(1);
    expect(user2?.todo.completed).toBe(2);
    expect(user2?.todo.pending).toBe(0);

    const user3 = response.data.find((u) => u.userId === 3);
    expect(user3?.post).toBe(0);
    expect(user3?.todo.completed).toBe(0);
    expect(user3?.todo.pending).toBe(1);
  });

  it("should filter users by search term (name or email)", async () => {
    setupMockSuccess();

    const resByName = await getUsersTableData({
      page: 1,
      pageSize: 5,
      search: "leanne",
    });
    expect(resByName.data).toHaveLength(1);
    expect(resByName.data[0].name).toBe("Leanne Graham");

    const resByEmail = await getUsersTableData({
      page: 1,
      pageSize: 5,
      search: "Shanna@melissa.tv",
    });
    expect(resByEmail.data).toHaveLength(1);
    expect(resByEmail.data[0].name).toBe("Ervin Howell");

    const resNone = await getUsersTableData({
      page: 1,
      pageSize: 5,
      search: "xyz",
    });
    expect(resNone.data).toHaveLength(0);
    expect(resNone.totalCount).toBe(0);
  });

  it("should apply filters correctly", async () => {
    setupMockSuccess();

    const resGt = await getUsersTableData({
      page: 1,
      pageSize: 5,
      filter: ["completed_gt_10"],
    });
    expect(resGt.data).toHaveLength(0);

    const resLt = await getUsersTableData({
      page: 1,
      pageSize: 5,
      filter: ["completed_lt_10"],
    });
    expect(resLt.data).toHaveLength(3);
  });

  it("should sort users correctly", async () => {
    setupMockSuccess();

    const resSortedDesc = await getUsersTableData({
      page: 1,
      pageSize: 5,
      sorting: [{ id: "name", desc: true }],
    });
    expect(resSortedDesc.data[0].name).toBe("Leanne Graham"); // L
    expect(resSortedDesc.data[1].name).toBe("Ervin Howell"); // E
    expect(resSortedDesc.data[2].name).toBe("Clementine Bauch"); // C

    const resSortedAsc = await getUsersTableData({
      page: 1,
      pageSize: 5,
      sorting: [{ id: "name", desc: false }],
    });
    expect(resSortedAsc.data[0].name).toBe("Clementine Bauch");
    expect(resSortedAsc.data[1].name).toBe("Ervin Howell");
    expect(resSortedAsc.data[2].name).toBe("Leanne Graham");
  });

  it("should paginate users list correctly", async () => {
    setupMockSuccess();

    const resPage1 = await getUsersTableData({
      page: 1,
      pageSize: 2,
    });
    expect(resPage1.data).toHaveLength(2);
    expect(resPage1.totalCount).toBe(3);

    const resPage2 = await getUsersTableData({
      page: 2,
      pageSize: 2,
    });
    expect(resPage2.data).toHaveLength(1);
    expect(resPage2.totalCount).toBe(3);
  });

  it("should handle empty database state gracefully", async () => {
    (global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const response = await getUsersTableData({
      page: 1,
      pageSize: 5,
    });
    expect(response.data).toHaveLength(0);
    expect(response.totalCount).toBe(0);
  });

  it("should throw error if fetch network request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Failure"));

    await expect(
      getUsersTableData({
        page: 1,
        pageSize: 5,
      }),
    ).rejects.toThrow("Failed to fetch user data. Please check your connection and try again.");
  });

  it("should throw error if API returns non-200/non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(
      getUsersTableData({
        page: 1,
        pageSize: 5,
      }),
    ).rejects.toThrow("Failed to retrieve user operations dashboard data. Non-200 response.");
  });
});
