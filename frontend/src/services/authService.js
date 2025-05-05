// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authService = {
  // Configuration de l'axios pour inclure les cookies
  setupAxios() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  },

  // Récupérer le CSRF token
  async getCsrfToken() {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
  },

  // Inscription d'un utilisateur
  async register(userData) {
    this.setupAxios();
    await this.getCsrfToken();
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  },

  // Connexion d'un utilisateur
  async login(email, password, rememberMe = false) {
    this.setupAxios();
    await this.getCsrfToken();
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
      remember_me: rememberMe
    }, {
      withCredentials: true
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Déconnexion
  async logout() {
    this.setupAxios();
    const token = this.getCurrentUser()?.token;
    if (token) {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.removeItem('user');
    }
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.firstName = user.first_name;
    return user;
  },

  // Récupérer les informations de l'utilisateur
  async getUserProfile() {
    this.setupAxios();
    const token = this.getCurrentUser()?.token;
    return await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default authService;