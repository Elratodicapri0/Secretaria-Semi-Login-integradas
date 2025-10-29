import React, { useState } from 'react';

export default function PasswordResetConfirmForm({ token }) { // Recebe o token como prop
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) { setError('As senhas não coincidem.'); return; }
    if (password.length < 8) { setError('A senha deve ter pelo menos 8 caracteres.'); return; }
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:8000/api/password-reset/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, password: password }),
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || 'Ocorreu um erro.'); }

      setSuccessMessage('Senha redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => { window.location.href = '/login'; }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form respondForm__form row y-gap-20 pt-30" onSubmit={handleSubmit}>
      <div className="col-12"><label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Nova Senha</label><input required type="password" name="password" placeholder="Pelo menos 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
      <div className="col-12"><label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Confirme a Nova Senha</label><input required type="password" name="passwordConfirm" placeholder="Repita a nova senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/></div>
      {successMessage && <div className="col-12"><p className="text-green-1">{successMessage}</p></div>}
      {error && <div className="col-12"><p className="text-red-1">{error}</p></div>}
      <div className="col-12"><button type="submit" className="button -md -green-1 text-dark-1 fw-500 w-1/1" disabled={isLoading || successMessage}>{isLoading ? 'Salvando...' : 'Salvar Nova Senha'}</button></div>
    </form>
  );
}