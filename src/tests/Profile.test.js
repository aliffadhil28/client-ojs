import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Profile from '../pages/Profile.jsx';
import AuthContext from '../assets/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockLoaderData = {
  data: [
    {
      title: 'Palindrome',
      code: 'PR-0003',
      submitions: [
        {
          testPass: '0/4',
          workTime: { hours: 0, minutes: 5, seconds: 26 },
          success: true,
        },
      ],
    },
  ],
};

const mockUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  noInduk: '12345678',
};

vi.mock('react-router-dom', () => ({
  useLoaderData: () => mockLoaderData,
}));

describe('Profile Component', () => {
  it('renders user information correctly', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
  });

  it('renders submissions correctly', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Palindrome')).toBeInTheDocument();
    expect(screen.getByText('PR-0003')).toBeInTheDocument();
    expect(screen.getByText('0/4')).toBeInTheDocument();
    expect(screen.getByText('00:05:26')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
