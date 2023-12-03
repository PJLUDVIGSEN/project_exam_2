import { render, screen } from '@testing-library/react';
import App from './App';


test('renders the login page', () => {
  render(<App />);
  const loginElement = screen.getByText(/login/i); 
  expect(login).toBeInTheDocument();
});
