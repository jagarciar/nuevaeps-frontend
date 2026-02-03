/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditarMedicamento from './EditarMedicamento';
import * as apiModule from '@services/api';

vi.mock('@services/api');

describe('EditarMedicamento', () => {
  const mockMedicamento = { id: 1, nombre: 'Paracetamol' };
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el formulario de edición', () => {
    render(
      <EditarMedicamento
        medicamento={mockMedicamento}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByText('Editar Medicamento')).toBeTruthy();
    expect(screen.getByDisplayValue('Paracetamol')).toBeTruthy();
  });

  it('debe actualizar el medicamento al enviar el formulario', async () => {
    const mockPut = vi.fn().mockResolvedValue({ data: { id: 1, nombre: 'Paracetamol 500mg' } });
    (apiModule.apiCall.put as any) = mockPut;

    render(
      <EditarMedicamento
        medicamento={mockMedicamento}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const input = screen.getByDisplayValue('Paracetamol') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Paracetamol 500mg' } });

    const submitButton = screen.getByText('Guardar Cambios');
    fireEvent.click(submitButton);

    // Esperar a que la promesa se resuelva
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('debe cerrar el modal al hacer clic en cancelar', () => {
    render(
      <EditarMedicamento
        medicamento={mockMedicamento}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
