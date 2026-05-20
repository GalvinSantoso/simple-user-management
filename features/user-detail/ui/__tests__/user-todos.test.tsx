import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTodos from "../user-todos";
import { useUserTodos } from "../../hooks/useUserTodos";

jest.mock("../../hooks/useUserTodos", () => ({
  useUserTodos: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("UserTodos Component", () => {
  const mockTodos = [
    { id: 1, userId: 1, title: "Completed Task A", completed: true },
    { id: 2, userId: 1, title: "Pending Task B", completed: false },
    { id: 3, userId: 1, title: "Completed Task C", completed: true },
    { id: 4, userId: 1, title: "Pending Task D", completed: false },
    { id: 5, userId: 1, title: "Completed Task E", completed: true },
    { id: 6, userId: 1, title: "Pending Task F", completed: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading skeleton when isLoading is true", () => {
    (useUserTodos as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(<UserTodos userId="1" />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("should render error state when fetch fails", () => {
    const mockRefetch = jest.fn();
    (useUserTodos as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Server error"),
      refetch: mockRefetch,
    });

    render(<UserTodos userId="1" />);

    expect(screen.getByText("Error Loading Todos")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("should sort pending tasks first", () => {
    (useUserTodos as jest.Mock).mockReturnValue({
      data: mockTodos,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserTodos userId="1" />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(5);
    expect(listItems[0]).toHaveTextContent("Pending Task B");
    expect(listItems[1]).toHaveTextContent("Pending Task D");
    expect(listItems[2]).toHaveTextContent("Pending Task F");
    expect(listItems[3]).toHaveTextContent("Completed Task A");
    expect(listItems[4]).toHaveTextContent("Completed Task C");
  });

  it("should render done and pending badges with correct values", () => {
    (useUserTodos as jest.Mock).mockReturnValue({
      data: mockTodos,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserTodos userId="1" />);

    expect(screen.getByText("3 Done")).toBeInTheDocument();
    expect(screen.getByText("3 Pending")).toBeInTheDocument();
  });

  it("should handle expand and collapse correctly", () => {
    (useUserTodos as jest.Mock).mockReturnValue({
      data: mockTodos,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserTodos userId="1" />);

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    const expandBtn = screen.getByRole("button", { name: /Show All 6 Todos/i });
    expect(expandBtn).toBeInTheDocument();

    fireEvent.click(expandBtn);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getByText("Completed Task E")).toBeInTheDocument();

    const collapseBtn = screen.getByRole("button", { name: /Show Less/i });
    expect(collapseBtn).toBeInTheDocument();

    fireEvent.click(collapseBtn);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});
