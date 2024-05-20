import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Code from "../pages/Code.jsx"; // Sesuaikan dengan path file Code.jsx
import AuthContext from "../assets/context/AuthContext.jsx";
import axios from "axios";

// Mock axios
vi.mock("axios");

// Mock data loader
const mockLoaderData = {
  data: {
    id: "b1fc3f7c-22e2-4746-b533-2756770e4eec",
    title: "Calc Average",
    code: "CA-0001",
    level: 3,
    description:
      "Deskripsi Masalah: Menghitung Rata-rata dari Sebuah List Angka\nAnda diminta untuk mengimplementasikan fungsi calculate_average yang akan menerima sebuah list angka sebagai input dan menghitung rata-rata dari seluruh angka dalam list tersebut. Fungsi ini harus mengembalikan nilai rata-rata.\nContoh:\n\nInput: [10, 20, 30, 40, 50]\n\nRata-rata: 10+20+30+40+50​=30\n\nInput: [5, 7, 9, 11]\n\nRata-rata: 5+7+9+11​=8",
    testCases: ["[1,2,3,4,5],3.0", "[10,20,30,40,50],30.0", "[2,4,6,8,10],6.0"],
    workTime: {
      hours: "2",
    },
    startDate: "2024-02-21T20:02:00.000Z",
    endDate: "2024-05-15T20:07:00.000Z",
    baseImport: "import sys\nimport time\n\n",
    baseFunction: "def calculate_average(numbers):\n  return ''",
    baseMain: "print(calculate_average([${test[0]}]) == ${test[1]})",
    createdAt: "2024-02-21T20:06:07.000Z",
    updatedAt: "2024-05-14T00:30:32.000Z",
  },
};

// Mock useLoaderData hook
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useLoaderData: () => mockLoaderData,
  useParams: () => ({ id: "b1fc3f7c-22e2-4746-b533-2756770e4eec" }),
  useNavigate: vi.fn(),
}));

const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

test("renders Code page and submits code", async () => {
  const providerProps = {
    user: { id: "test-user-id" },
    token: "test-token",
  };

  axios.post.mockResolvedValue({
    data: {
      results: ["True", "True", "True"],
      feedBacks: ["Correct", "Correct", "Correct"],
      executionTime: "0.1s",
    },
  });

  renderWithAuthContext(
    <MemoryRouter
      initialEntries={["/code/b1fc3f7c-22e2-4746-b533-2756770e4eec"]}
    >
      <Routes>
        <Route path="/code/:id" element={<Code />} />
      </Routes>
    </MemoryRouter>,
    { providerProps }
  );

  // Cek apakah judul halaman telah diatur
  expect(document.title).toBe("Code");

  // Cek apakah judul tugas dirender dengan benar
  expect(screen.getByText(/CA-0001 \| Calc Average/i)).toBeInTheDocument();

  // Simulasikan pengisian code editor dan submit
  const codeMirror = screen.getByRole("textbox");
  fireEvent.change(codeMirror, {
    target: {
      value: "def calculate_average(numbers): return sum(numbers)/len(numbers)",
    },
  });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  // Cek apakah fungsi axios.post dipanggil dengan payload yang benar
  expect(axios.post).toHaveBeenCalledWith(
    "https://ojs-gateway.localgems.my.id/judge",
    expect.objectContaining({
      code: "def calculate_average(numbers): return sum(numbers)/len(numbers)",
      testCases: mockLoaderData.data.testCases,
      baseMain: mockLoaderData.data.baseMain,
      workTime: null, // Sesuaikan jika menggunakan localStorage untuk waktu kerja
    }),
    expect.any({
      success: true,
      results: ["True", "True", "True"],
      feedBacks: ["CA", "CA", "CA"],
      executionTime: 34,
    })
  );

//   // Tunggu hingga hasil tes ditampilkan
//   await screen.findByText("Correct");
});
