// src/services/api.ts
import axios from 'axios';
import { parseCookies } from 'nookies';

// Pega o token dos cookies para requisições no lado do servidor
const { 'easygas.token': token } = parseCookies();

export const api = axios.create({
  // Use uma variável de ambiente para a URL da sua API
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
});

// Adiciona o token ao cabeçalho de autorização se ele existir
// Isso garante que as chamadas feitas logo após o carregamento da página
// (no lado do cliente) já estejam autenticadas.
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}