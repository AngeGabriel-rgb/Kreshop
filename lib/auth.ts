import { fetchApi } from './api';

export interface AuthResponse {
  token: string;
  user?: any;
}

export interface LoginPayload {
  email: string;
  mot_de_passe: string;
}

export interface RegisterClientPayload {
  email: string;
  mot_de_passe: string;
  prenom: string;
  nom: string;
}

export interface RegisterAdminPayload {
  email: string;
  mot_de_passe: string;
  prenom: string;
  nom: string;
}

export const login = (data: LoginPayload) => fetchApi<AuthResponse>('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const registerClient = (data: RegisterClientPayload) => fetchApi<AuthResponse>('/auth/register/client', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

export const registerAdmin = (data: RegisterAdminPayload, token: string) => fetchApi<AuthResponse>('/auth/register/admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(data)
}); 