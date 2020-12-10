import { render, screen } from '@testing-library/react';
import App from './App';


describe ("register testing", () => {
  test("render a register button", () => {

    const { getByText } = render(<App />);
    const linkElement = getByText("Register");
    expect(linkElement).toBeInTheDocument();
  })
})

