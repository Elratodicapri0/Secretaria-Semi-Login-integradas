import React, { useState } from 'react';

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:8000/api/password-reset/request/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) { throw new Error(data.error || 'Ocorreu um erro.'); }

      setSuccessMessage(data.success);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form respondForm__form row y-gap-20 pt-30" onSubmit={handleSubmit}>
      <div className="col-12">
        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Digite seu E-mail de Cadastro</label>
        <input required type="email" name="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {successMessage && <div className="col-12"><p className="text-green-1">{successMessage}</p></div>}
      {error && <div className="col-12"><p className="text-red-1">{error}</p></div>}
      <div className="col-12">
        <button type="submit" className="button -md -green-1 text-dark-1 fw-500 w-1/1" disabled={isLoading || successMessage}>
          {isLoading ? 'Enviando...' : 'Enviar Link de Redefinição'}
        </button>
      </div>
    </form>
  );
}