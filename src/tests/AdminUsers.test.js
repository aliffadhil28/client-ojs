import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import Users from "../pages/Users.jsx";
import AuthContext from "../assets/context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// Mock axios
vi.mock("axios");   

const mockUsers = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    noInduk: "123456",
    role: "admin",
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    noInduk: "654321",
    role: "student",
  },
];

const mockLoaderData = {
  data: mockUsers,
};

const mockToken = "test-token";

const renderWithProviders = (ui) => {
  return render(
    <AuthContext.Provider value={{ token: mockToken }}>
      <Router>{ui}</Router>
    </AuthContext.Provider>
  );
};

describe("Users Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { data: mockUsers[0] } });
    axios.post.mockResolvedValue({});
    axios.put.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });

  it("renders Users component correctly", () => {
    renderWithProviders(<Users loader={mockLoaderData} />);

    expect(screen.getByText("User List")).toBeInTheDocument();
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.username)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.noInduk)).toBeInTheDocument();
      expect(screen.getByText(user.role)).toBeInTheDocument();
    });
  });

  it("opens Add User modal when Add button is clicked", () => {
    renderWithProviders(<Users loader={mockLoaderData} />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("submits Add User form", async () => {
    renderWithProviders(<Users loader={mockLoaderData} />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("name@gmail.com"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter ID"), {
      target: { value: "111111" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "password" },
    });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "https://ojs-gateway.localgems.my.id/users",
        {
          username: "newuser",
          email: "newuser@example.com",
          password: "password",
          noInduk: "111111",
          role: "user",
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      )
    );

    expect(screen.queryByText("Add User")).not.toBeInTheDocument();
  });

  it("opens Edit User modal and updates user", async () => {
    renderWithProviders(<Users loader={mockLoaderData} />);

    const detailLinks = screen.getAllByText("Detail");
    fireEvent.click(detailLinks[0]);

    await waitFor(() =>
      expect(screen.getByText("Edit User")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
      target: { value: "updateduser" },
    });

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    await waitFor(() =>
      expect(axios.put).toHaveBeenCalledWith(
        "https://ojs-gateway.localgems.my.id/users/1",
        {
          username: "updateduser",
          email: mockUsers[0].email,
          noInduk: mockUsers[0].noInduk,
          role: mockUsers[0].role,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      )
    );

    expect(screen.queryByText("Edit User")).not.toBeInTheDocument();
  });

  it("deletes user when Delete link is clicked", async () => {
    renderWithProviders(<Users loader={mockLoaderData} />);

    const deleteLinks = screen.getAllByText("Delete");
    fireEvent.click(deleteLinks[0]);

    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(
        "https://ojs-gateway.localgems.my.id/users/1",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      )
    );
  });
});
