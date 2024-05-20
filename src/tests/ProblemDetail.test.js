// tests/ProblemDetails.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProblemDetails from '../pages/ProblemDetails.jsx';
import AuthContext from '../assets/context/AuthContext';
import moment from 'moment';

const mockData = {
  data: {
    id: "b1fc3f7c-22e2-4746-b533-2756770e4eec",
    title: "Calc Average",
    code: "CA-0001",
    level: 3,
    description: "Deskripsi Masalah: Menghitung Rata-rata dari Sebuah List Angka\nAnda diminta untuk mengimplementasikan fungsi calculate_average yang akan menerima sebuah list angka sebagai input dan menghitung rata-rata dari seluruh angka dalam list tersebut. Fungsi ini harus mengembalikan nilai rata-rata.\nContoh:\n\nInput: [10, 20, 30, 40, 50]\n\nRata-rata: 10+20+30+40+50​=30\n\nInput: [5, 7, 9, 11]\n\nRata-rata: 5+7+9+11​=8",
    testCases: [
      "\"[1,2,3,4,5]\",\"3.0\"",
      "\"[10,20,30,40,50]\",\"30.0\"",
      "\"[2,4,6,8,10]\",\"6.0\""
    ],
    workTime: {
      hours: "2"
    },
    startDate: "2024-02-21T20:02:00.000Z",
    endDate: "2024-05-15T20:07:00.000Z",
    baseImport: "import sys\nimport time\n\n",
    baseFunction: "def calculate_average(numbers):\n  return ''",
    baseMain: "print(calculate_average([${test[0]}]) == ${test[1]})",
    createdAt: "2024-02-21T20:06:07.000Z",
    updatedAt: "2024-05-14T00:30:32.000Z"
  }
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => mockData,
    useParams: () => ({ id: 'b1fc3f7c-22e2-4746-b533-2756770e4eec' }),
  };
});

describe('ProblemDetails', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ token: 'mock-token' }}>
        <MemoryRouter initialEntries={['/dashboard/problems/b1fc3f7c-22e2-4746-b533-2756770e4eec']}>
          <Routes>
            <Route path="/dashboard/problems/:id" element={<ProblemDetails />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  it('renders ProblemDetails component', () => {
    expect(screen.getByText('Problem Details')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Calc Average')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CA-0001')).toBeInTheDocument();
  });

  it('enables edit mode on clicking edit button', () => {
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('disables edit mode on clicking cancel button', () => {
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('updates form values correctly', () => {
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput.value).toBe('New Title');
  });
});
