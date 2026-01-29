import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@components/common';

describe('PrivateRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render outlet content when authenticated', () => {
    localStorage.setItem('token', 'test-token');

    render(
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={true} />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should not render outlet when not authenticated', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={false} />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </BrowserRouter>
    );

    // Should redirect to login instead of showing protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
