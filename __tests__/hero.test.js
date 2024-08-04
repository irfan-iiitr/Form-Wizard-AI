import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../app/_components/Hero'
import '@testing-library/jest-dom';
import { useUser } from '@clerk/nextjs';

// Mocking useUser hook from @clerk/nextjs
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

describe('Hero Component', () => {
  test('renders without crashing', () => {
    useUser.mockImplementation(() => ({ isSignedIn: false }));
    render(<Hero />);
    expect(screen.getByText(/Create your form with AI/i)).toBeInTheDocument();
  });

  test('displays "+ Create Form" button pointing to "/sign-up" for non-signed-in users', () => {
    useUser.mockImplementation(() => ({ isSignedIn: false }));
    render(<Hero />);
    const createFormButton = screen.getByText(/\+ Create Form/i);
    expect(createFormButton).toBeInTheDocument();
    expect(createFormButton).toHaveAttribute('href', '/sign-up');
  });

  test('displays "+ Create Form" button pointing to "/dashboard" for signed-in users', () => {
    useUser.mockImplementation(() => ({ isSignedIn: true }));
    render(<Hero />);
    const createFormButton = screen.getByText(/\+ Create Form/i);
    expect(createFormButton).toBeInTheDocument();
    expect(createFormButton).toHaveAttribute('href', '/dashboard');
  });

  test('displays "Learn More" button', () => {
    useUser.mockImplementation(() => ({ isSignedIn: false }));
    render(<Hero />);
    const learnMoreButton = screen.getByText(/Learn More/i);
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute('href', '#');
  });
});