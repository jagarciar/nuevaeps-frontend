import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getUserRoles,
  hasRole,
  isAdmin,
  isModerator,
  getUsername,
  getUserId,
  getToken,
  clearUserSession,
  isAuthenticated,
} from './authUtils';

describe('authUtils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getUserRoles', () => {
    it('debería retornar un arreglo vacío si no hay roles', () => {
      const roles = getUserRoles();
      expect(roles).toEqual([]);
    });

    it('debería retornar los roles guardados en localStorage', () => {
      const testRoles = ['ADMIN', 'USER'];
      localStorage.setItem('roles', JSON.stringify(testRoles));
      const roles = getUserRoles();
      expect(roles).toEqual(testRoles);
    });

    it('debería manejar un JSON inválido', () => {
      localStorage.setItem('roles', 'invalid json');
      const roles = getUserRoles();
      expect(roles).toEqual([]);
    });
  });

  describe('hasRole', () => {
    it('debería retornar true si el usuario tiene el rol', () => {
      const testRoles = ['ADMIN', 'USER'];
      localStorage.setItem('roles', JSON.stringify(testRoles));
      expect(hasRole('ADMIN')).toBe(true);
    });

    it('debería retornar false si el usuario no tiene el rol', () => {
      const testRoles = ['USER'];
      localStorage.setItem('roles', JSON.stringify(testRoles));
      expect(hasRole('ADMIN')).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('debería retornar true si el usuario es admin', () => {
      localStorage.setItem('roles', JSON.stringify(['ADMIN', 'USER']));
      expect(isAdmin()).toBe(true);
    });

    it('debería retornar false si el usuario no es admin', () => {
      localStorage.setItem('roles', JSON.stringify(['USER']));
      expect(isAdmin()).toBe(false);
    });
  });

  describe('isModerator', () => {
    it('debería retornar true si el usuario es moderador', () => {
      localStorage.setItem('roles', JSON.stringify(['MODERATOR', 'USER']));
      expect(isModerator()).toBe(true);
    });

    it('debería retornar false si el usuario no es moderador', () => {
      localStorage.setItem('roles', JSON.stringify(['USER']));
      expect(isModerator()).toBe(false);
    });
  });

  describe('getUsername', () => {
    it('debería retornar el username guardado', () => {
      localStorage.setItem('username', 'testuser');
      expect(getUsername()).toBe('testuser');
    });

    it('debería retornar null si no hay username', () => {
      expect(getUsername()).toBeNull();
    });
  });

  describe('getUserId', () => {
    it('debería retornar el userId guardado', () => {
      localStorage.setItem('userId', '123');
      expect(getUserId()).toBe('123');
    });

    it('debería retornar null si no hay userId', () => {
      expect(getUserId()).toBeNull();
    });
  });

  describe('getToken', () => {
    it('debería retornar el token guardado', () => {
      localStorage.setItem('token', 'test-token');
      expect(getToken()).toBe('test-token');
    });

    it('debería retornar null si no hay token', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('clearUserSession', () => {
    it('debería limpiar todos los datos de la sesión', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('username', 'testuser');
      localStorage.setItem('userId', '123');
      localStorage.setItem('roles', JSON.stringify(['ADMIN']));

      clearUserSession();

      expect(getToken()).toBeNull();
      expect(getUsername()).toBeNull();
      expect(getUserId()).toBeNull();
      expect(getUserRoles()).toEqual([]);
    });
  });

  describe('isAuthenticated', () => {
    it('debería retornar true si hay token', () => {
      localStorage.setItem('token', 'test-token');
      expect(isAuthenticated()).toBe(true);
    });

    it('debería retornar false si no hay token', () => {
      expect(isAuthenticated()).toBe(false);
    });
  });
});
