import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PasswordResetConfirmForm from '../../components/others/PasswordResetConfirmForm';

export default function ResetPasswordPage() {
  const { token } = useParams();

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Crie sua Nova Senha</h3>
              <p className="mt-10">Defina uma nova senha para sua conta.</p>
              <PasswordResetConfirmForm token={token} />
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