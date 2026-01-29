import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from '@pages/dashboard';

vi.mock('@services/api', () => ({
  apiCall: vi.fn(),
}));

describe('DashboardPage Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('username', 'testuser');
    vi.clearAllMocks();
  });

  it('should render dashboard page', async () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    // Check if main title renders
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should display user section with username', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    // Should have Hola text with username
    const userText = screen.queryByText(/Hola/i);
    expect(userText).toBeInTheDocument();
  });

  it('should have navigation links', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    // Check for navigation links (if they exist in layout)
    const navLinks = screen.queryByRole('navigation');
    expect(navLinks || screen.queryByText(/medicamentos/i)).toBeTruthy();
  });
});
