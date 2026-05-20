import React from "react";
import { render, screen } from "@testing-library/react";
import UserInformation from "../user-information";
import { useUserDetail } from "../../hooks/useUserDetail";
import { notFound } from "next/navigation";

jest.mock("../../hooks/useUserDetail", () => ({
  useUserDetail: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("UserInformation Component", () => {
  const mockUser = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading skeleton when isLoading is true", () => {
    (useUserDetail as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(<UserInformation userId="1" />);

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("should trigger notFound when user data is undefined and not loading", () => {
    (useUserDetail as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserInformation userId="1" />);
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("should render error state when error is present", () => {
    (useUserDetail as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to load profile"),
      refetch: jest.fn(),
    });

    render(<UserInformation userId="1" />);
    expect(screen.getByText("Error Loading Profile")).toBeInTheDocument();
  });

  it("should render user detail fields when user data is successfully fetched", () => {
    (useUserDetail as jest.Mock).mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<UserInformation userId="1" />);

    expect(screen.getByText("User Information")).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("@Bret")).toBeInTheDocument();
    expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();
    expect(screen.getByText("hildegard.org")).toBeInTheDocument();
    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
    expect(screen.getByText("Multi-layered client-server neural-net")).toBeInTheDocument();
    expect(screen.getByText("Gwenborough")).toBeInTheDocument();
    expect(screen.getByText("92998-3874")).toBeInTheDocument();
  });
});
