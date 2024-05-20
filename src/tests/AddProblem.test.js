import { createTest, render, screen, fireEvent ,expect} from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import AddProblem from '../pages/AddProblem.jsx';

createTest('AddProblem component renders correctly', () => {
  render(<AddProblem />, { wrapper: (props) => <Router>{props.children}</Router> });

  screen.getByText('Add problem');
  screen.getByText('Title');
  screen.getByText('Code');
  screen.getByText('Level');
  screen.getByText('Description');
  screen.getByText('Test Cases');
  screen.getByText('Work Time');
  screen.getByText('Due Date');
  screen.getByText('Base Function');
  screen.getByText('Base Import');
  screen.getByText('Base Main');
});

createTest('AddProblem component updates state correctly', () => {
  render(<AddProblem />, { wrapper: (props) => <Router>{props.children}</Router> });

  const titleInput = screen.getByLabelText('Title');
  const codeInput = screen.getByLabelText('Code');
  const levelInput = screen.getByLabelText('Level');
  const descriptionInput = screen.getByLabelText('Description');

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(codeInput, { target: { value: 'AD-123' } });
  fireEvent.change(levelInput, { target: { value: 2 } });
  fireEvent.change(descriptionInput, { target: { value: 'New Description' } });

  expect(titleInput.value).toBe('New Title');
  expect(codeInput.value).toBe('AD-123');
  expect(levelInput.value).toBe('2');
  expect(descriptionInput.value).toBe('New Description');
});
