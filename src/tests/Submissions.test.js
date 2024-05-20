import { createTest, render, screen } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Solutions from '..pages/Solutions.jsx';

createTest('Solutions component renders correctly', () => {
  const loaderData = {
    data: [
      {
        username: 'John Doe',
        noInduk: '12345',
        submitions: [
          {
            testPass: 'Test 1',
            workTime: { hours: 1, minutes: 30, seconds: 15 },
            success: true,
          },
          {
            testPass: 'Test 2',
            workTime: { hours: 0, minutes: 45, seconds: 30 },
            success: false,
          },
        ],
      },
    ],
  };

  render(<Solutions />, { wrapper: (props) => <Router>{props.children}</Router> });

  screen.getByText('John Doe');
  screen.getByText('12345');
  screen.getByText('Test 1');
  screen.getByText('Test 2');
});

