import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../app/_components/Header'; 
import '@testing-library/jest-dom';

// Mocking necessary hooks and components
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);
jest.mock('next/link', () => ({ children }) => children);
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({ isSignedIn: true }),
  SignInButton: ({ children }) => <div>{children}</div>,
  UserButton: () => <div>UserButton</div>,
}));
jest.mock('next/navigation', () => ({
  usePathname: () => 'testpath',
}));

describe('Header Component', () => {
  test('should display "Form Wizard" text', () => {
    render(<Header />);
    const formWizardText = screen.getByText(/Form Wizard/i);
    expect(formWizardText).toBeInTheDocument();
  });
});