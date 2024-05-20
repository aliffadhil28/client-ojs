import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Problems from '../pages/Problems.jsx'; // Sesuaikan dengan path file Problems.jsx
import { useLoaderData } from 'react-router-dom';

// Mock useLoaderData hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLoaderData: vi.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

const mockLoaderData = {
  data: [
    {
      id: "1",
      code: "PRB-001",
      title: "Problem 1",
      startDate: "2024-05-01T10:00:00.000Z",
      endDate: "2024-05-15T10:00:00.000Z",
      level: 1,
    },
    {
      id: "2",
      code: "PRB-002",
      title: "Problem 2",
      startDate: "2024-05-02T10:00:00.000Z",
      endDate: "2024-05-16T10:00:00.000Z",
      level: 2,
    },
    // Tambahkan lebih banyak data untuk pengujian paginasi jika diperlukan
  ],
};

useLoaderData.mockReturnValue(mockLoaderData);

test('renders Problems page and paginates correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/problems']}>
      <Routes>
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </MemoryRouter>
  );

  // Cek apakah judul halaman telah diatur
  expect(document.title).toBe('Problems List');

  // Cek apakah judul "Problem List" dirender dengan benar
  expect(screen.getByText(/Problem List/i)).toBeInTheDocument();

  // Cek apakah data dari loader dirender dengan benar
  expect(screen.getByText(/PRB-001/i)).toBeInTheDocument();
  expect(screen.getByText(/Problem 1/i)).toBeInTheDocument();
  expect(screen.getByText(/10:00 01-05-2024/i)).toBeInTheDocument();
  expect(screen.getByText(/10:00 15-05-2024/i)).toBeInTheDocument();

  expect(screen.getByText(/PRB-002/i)).toBeInTheDocument();
  expect(screen.getByText(/Problem 2/i)).toBeInTheDocument();
  expect(screen.getByText(/10:00 02-05-2024/i)).toBeInTheDocument();
  expect(screen.getByText(/10:00 16-05-2024/i)).toBeInTheDocument();

  // Simulasikan perubahan halaman pada paginasi
  const nextButton = screen.getByRole('button', { name: /next/i });
  fireEvent.click(nextButton);

  // Paginasi ke halaman berikutnya
  // Cek apakah data halaman berikutnya dirender dengan benar (sesuaikan jika ada lebih banyak data)
});
