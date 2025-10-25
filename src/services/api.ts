// src/services/api.ts
import axios from 'axios';
import { parseCookies } from 'nookies';

// Pega o token dos cookies para requisições no lado do servidor
const { 'easygas.token': token } = parseCookies();

export const api = axios.create({
  // Use uma variável de ambiente para a URL da sua API
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  withCredentials: true
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}