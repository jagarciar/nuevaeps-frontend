import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Layout Component', () => {
  it('should render children correctly', () => {
    localStorageMock.getItem.mockReturnValue('testuser');

    render(
      <BrowserRouter>
        <Layout title="Test Page" currentPath="/test">
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should display username when logged in', () => {
    localStorageMock.getItem.mockReturnValue('testuser');

    render(
      <BrowserRouter>
        <Layout title="Test Page" currentPath="/test">
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    localStorageMock.getItem.mockReturnValue('testuser');

    render(
      <BrowserRouter>
        <Layout title="Test Page" currentPath="/test">
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    );

    // Verificar links en español
    expect(screen.getByText(/Panel Principal/i)).toBeInTheDocument();
    expect(screen.getByText(/Medicamentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Solicitudes/i)).toBeInTheDocument();
  });
});
