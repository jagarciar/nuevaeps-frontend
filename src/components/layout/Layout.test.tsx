import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render children correctly', () => {
    render(
      <BrowserRouter>
        <Layout title="Test Page" currentPath="/test">
          <div>Test Content</div>
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should display default username when not logged in', () => {
    // localStorage is mocked in setup.ts, so we get the default "Usuario"
    render(
      <BrowserRouter>
        <Layout title="Test Page" currentPath="/test">
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    );

    // Component displays "Usuario" when localStorage has no username
    expect(screen.getByText(/Usuario/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
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
