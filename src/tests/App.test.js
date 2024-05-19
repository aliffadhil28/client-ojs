import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { describe, it, beforeAll, afterEach, afterAll, expect } from "vitest";

import Home from "../pages/Home.jsx"; // Pastikan path ini benar
import Code from "../pages/Code.jsx"; // Pastikan path ini benar
import Profile from "../pages/Profile.jsx"; // Pastikan path ini benar
import Problem from "../pages/Problem.jsx"; // Pastikan path ini benar
import ProblemDetail from "../pages/ProblemDetail.jsx"; // Pastikan path ini benar
import AddProblem from "../pages/AddProblem.jsx"; // Pastikan path ini benar
import Solutions from "../pages/Solutions.jsx"; // Pastikan path ini benar
import Users from "../pages/Users.jsx"; // Pastikan path ini benar
import { AppLayout, AuthLayout, DefaultLayout, AdminLayout } from "../main.jsx";

const server = setupServer(
  rest.get("http://13.215.153.88:8001/problems", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(
    "http://13.215.153.88:8001/problems/:id",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
  rest.get(
    "http://13.215.153.88:8001/submition/user/:id",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
  rest.get("http://13.215.153.88:8001/users", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(
    "http://13.215.153.88:8001/submition/solutions/:id",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const router = createMemoryRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "solve/:id",
            element: <Code />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <AdminLayout />,
        children: [
          {
            path: "problems",
            element: <Problem />,
          },
          {
            path: "problems/:id",
            element: <ProblemDetail />,
          },
          {
            path: "problems/add",
            element: <AddProblem />,
          },
          {
            path: "solutions/:id",
            element: <Solutions />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
      {
        path: "/login",
        element: <AuthLayout />,
      },
    ],
  },
]);

describe("App Router", () => {
  it("renders Home component at root path", async () => {
    render(<RouterProvider router={router} initialEntries={["/"]} />);
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
  });

  it("renders Code component at solve/:id path", async () => {
    render(<RouterProvider router={router} initialEntries={["/solve/1"]} />);
    expect(await screen.findByText(/Code/i)).toBeInTheDocument();
  });

  it("renders Profile component at profile path", async () => {
    render(<RouterProvider router={router} initialEntries={["/profile"]} />);
    expect(await screen.findByText(/Profile/i)).toBeInTheDocument();
  });

  it("renders Problem component at /dashboard/problems path", async () => {
    render(
      <RouterProvider
        router={router}
        initialEntries={["/dashboard/problems"]}
      />
    );
    expect(await screen.findByText(/Problem/i)).toBeInTheDocument();
  });

  it("renders ProblemDetail component at /dashboard/problems/:id path", async () => {
    render(
      <RouterProvider
        router={router}
        initialEntries={["/dashboard/problems/1"]}
      />
    );
    expect(await screen.findByText(/ProblemDetail/i)).toBeInTheDocument();
  });

  it("renders AddProblem component at /dashboard/problems/add path", async () => {
    render(
      <RouterProvider
        router={router}
        initialEntries={["/dashboard/problems/add"]}
      />
    );
    expect(await screen.findByText(/AddProblem/i)).toBeInTheDocument();
  });

  it("renders Solutions component at /dashboard/solutions/:id path", async () => {
    render(
      <RouterProvider
        router={router}
        initialEntries={["/dashboard/solutions/1"]}
      />
    );
    expect(await screen.findByText(/Solutions/i)).toBeInTheDocument();
  });

  it("renders Users component at /dashboard/users path", async () => {
    render(
      <RouterProvider router={router} initialEntries={["/dashboard/users"]} />
    );
    expect(await screen.findByText(/Users/i)).toBeInTheDocument();
  });

  it("renders AuthLayout component at /login path", async () => {
    render(<RouterProvider router={router} initialEntries={["/login"]} />);
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });
});
