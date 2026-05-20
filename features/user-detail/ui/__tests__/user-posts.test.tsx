import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserPosts from "../user-posts";
import { useUserPosts } from "../../hooks/useUserPosts";

jest.mock("../../hooks/useUserPosts", () => ({
  useUserPosts: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("UserPosts Component", () => {
  const mockPosts = [
    { id: 1, userId: 1, title: "first post title", body: "first post body contents" },
    { id: 2, userId: 1, title: "second post title", body: "second post body contents" },
    { id: 3, userId: 1, title: "third post title", body: "third post body contents" },
    { id: 4, userId: 1, title: "fourth post title", body: "fourth post body contents" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading skeleton when isLoading is true", () => {
    (useUserPosts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(<UserPosts userId="1" />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("should render error state when error is present", () => {
    const mockRefetch = jest.fn();
    (useUserPosts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to load posts"),
      refetch: mockRefetch,
    });

    render(<UserPosts userId="1" />);
    expect(screen.getByText("Error Loading Posts")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("should render posts list up to 3 items initially", () => {
    (useUserPosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserPosts userId="1" />);

    expect(screen.getByText("First post title")).toBeInTheDocument();
    expect(screen.getByText("first post body contents")).toBeInTheDocument();
    expect(screen.getByText("Second post title")).toBeInTheDocument();
    expect(screen.getByText("Third post title")).toBeInTheDocument();

    expect(screen.queryByText("Fourth post title")).not.toBeInTheDocument();
  });

  it("should expand and collapse the posts list correctly", () => {
    (useUserPosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserPosts userId="1" />);

    const expandBtn = screen.getByRole("button", { name: /Show All 4 Posts/i });
    expect(expandBtn).toBeInTheDocument();

    fireEvent.click(expandBtn);

    expect(screen.getByText("Fourth post title")).toBeInTheDocument();

    const collapseBtn = screen.getByRole("button", { name: /Show Less/i });
    expect(collapseBtn).toBeInTheDocument();

    fireEvent.click(collapseBtn);

    expect(screen.queryByText("Fourth post title")).not.toBeInTheDocument();
  });
});
