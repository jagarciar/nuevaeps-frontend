/**
 * Utilidades para manejo de autenticación y roles
 */

/**
 * Obtiene los roles del usuario desde localStorage
 */
export const getUserRoles = (): string[] => {
  try {
    const rolesJson = localStorage.getItem('roles');
    if (rolesJson) {
      const roles = JSON.parse(rolesJson);
      if (Array.isArray(roles)) {
        return roles;
      }
    }
  } catch (err) {
    console.error('Error al obtener roles:', err);
  }
  return [];
};

/**
 * Verifica si el usuario tiene un rol específico
 */
export const hasRole = (roleToCheck: string): boolean => {
  const roles = getUserRoles();
  console.log('Checking role:', roleToCheck, 'against user roles:', roles);
  return roles.some((role) => role.includes(roleToCheck));
};

/**
 * Verifica si el usuario es administrador
 */
export const isAdmin = (): boolean => {
  return hasRole('ADMIN');
};

/**
 * Verifica si el usuario es moderador
 */
export const isModerator = (): boolean => {
  return hasRole('MODERATOR');
};

/**
 * Obtiene el nombre de usuario desde localStorage
 */
export const getUsername = (): string | null => {
  return localStorage.getItem('username');
};

/**
 * Obtiene el ID del usuario desde localStorage
 */
export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

/**
 * Obtiene el token JWT desde localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Limpia la sesión del usuario
 */
export const clearUserSession = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  localStorage.removeItem('roles');
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
