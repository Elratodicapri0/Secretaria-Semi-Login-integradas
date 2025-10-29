// src/components/others/LoginForm.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode"; // <-- MUDANÇA 1: Importamos a biblioteca

export default function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/secretaria/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data[Object.keys(data)[0]][0] || 'CPF ou senha inválidos.');
      }

      // --- MUDANÇA 2: Decodificar e salvar o cargo ---
      
      // 1. Decodifica o token de acesso para ler o conteúdo
      const decodedToken = jwtDecode(data.access);
      
      // 2. Salva os tokens no localStorage
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // 3. Salva o CARGO do usuário no localStorage
      // (Estou assumindo que seu token tem um campo 'cargo'. Veremos no Passo 3)
      localStorage.setItem('userCargo', decodedToken.cargo); 
      
      // --- Fim da Modificação ---

      window.location.href = '/dashboard';

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Entrar</h3>
              <p className="mt-10">
                Acesse o painel da sua secretaria.
              </p>
              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    CPF
                  </label>
                  <input
                    required
                    type="text" 
                    name="cpf"
                    placeholder="Digite seu CPF (apenas números)"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Senha
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="col-12 d-flex justify-end">
                  <Link to="/esqueci-senha" className="text-14 text-purple-1">
                    Esqueci a senha
                  </Link>
                </div>

                {error && (
                  <div className="col-12">
                    <p className="text-red-1">{error}</p>
                  </div>
                )}

                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}