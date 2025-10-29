import React from 'react';
import { Link } from 'react-router-dom';
// O import agora é para o novo formulário simples
import PasswordResetRequestForm from '../../components/others/PasswordResetRequestForm';

export default function ForgotPasswordPage() {
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Redefinir Senha</h3>
              <p className="mt-10">
                Digite seu e-mail abaixo para receber um link de redefinição.
              </p>

              {/* Ele renderiza o novo componente de formulário */}
              <PasswordResetRequestForm />

              <div className="text-center mt-20">
                <Link to="/login" className="text-purple-1">
                  Voltar para o Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}