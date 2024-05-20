import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login.jsx'; // Sesuaikan dengan path file Login.jsx
import AuthContext from '../assets/context/AuthContext.jsx';

// Mock useNavigate hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

const mockLogin = vi.fn();

const renderWithAuthContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
};

test('renders Login page and handles login', async () => {
  const providerProps = {
    login: mockLogin,
  };

  renderWithAuthContext(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    { providerProps }
  );

  // Cek apakah judul halaman telah diatur
  expect(document.title).toBe('Login');

  // Cek apakah input email dan password dirender dengan benar
  const emailInput = screen.getByPlaceholderText('Your name');
  const passwordInput = screen.getByPlaceholderText('Password');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  // Simulasikan pengisian form dan submit
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByText('Sign in');
  fireEvent.click(submitButton);

  // Cek apakah fungsi login dipanggil dengan payload yang benar
  expect(mockLogin).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
