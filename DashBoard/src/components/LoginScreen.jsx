// src/components/LoginScreen.jsx
import { useState } from 'react';
import { signInWithPopup, OAuthProvider, updateProfile } from 'firebase/auth';
import { auth, googleProvider, microsoftProvider } from '../services/firebase';
import { api } from '../services/api';
import './LoginScreen.css';
import botlogo from "../../../imgs/logoo.png";

// O Firebase Auth não traz a foto de perfil de contas Microsoft automaticamente
// (só vem pra contas Google). Busca na Microsoft Graph API usando o access
// token que o login devolve, salva no nosso próprio backend (o photoURL do
// Firebase Auth tem limite de ~2048 caracteres — não cabe a imagem em base64
// direto) e aplica a URL curta resultante no user.photoURL.
async function applyMicrosoftPhoto(result) {
  try {
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    if (!accessToken) return;

    const graphRes = await fetch('https://graph.microsoft.com/v1.0/me/photos/96x96/$value', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // 404 = conta sem foto configurada (comum em conta pessoal Microsoft) — segue sem erro
    if (!graphRes.ok) return;

    const blob = await graphRes.blob();
    const imageBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      // reader.result vem como "data:image/jpeg;base64,AAAA..." — manda só a parte depois da vírgula
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const { url } = await api('/api/avatar', 'POST', {
      uid: result.user.uid,
      imageBase64,
      contentType: blob.type || 'image/jpeg',
    });

    const API_URL = import.meta.env.VITE_API_URL ?? 'https://sql.neurabot.com.br';
    await updateProfile(result.user, { photoURL: `${API_URL}${url}` });
    // Força o onAuthStateChanged a disparar de novo com o photoURL já atualizado
    await result.user.reload();
  } catch (_) {
    // Falha ao buscar/salvar a foto não deve travar o login
  }
}

export default function LoginScreen() {
  const [error, setError] = useState('');
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingMicrosoft, setLoadingMicrosoft] = useState(false);

  async function handleGoogle() {
    setError('');
    setLoadingGoogle(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      setError('Erro ao entrar: ' + (e.message || 'tente novamente'));
    } finally {
      setLoadingGoogle(false);
    }
  }

  async function handleMicrosoft() {
    setError('');
    setLoadingMicrosoft(true);
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      await applyMicrosoftPhoto(result);
    } catch (e) {
      setError('Erro ao entrar: ' + (e.message || 'tente novamente'));
    } finally {
      setLoadingMicrosoft(false);
    }
  }

  const isLoading = loadingGoogle || loadingMicrosoft;

  return (
    <div className="login-screen">
      <div className="login-bg" />
      <div className="login-card">
        <img src={botlogo} alt="Bot Logo" />
        <div className="login-title">NeuraBOT Panel</div>
        <div className="login-sub">Gerencie seus bots Discord.</div>

        {/* Google */}
        <button className="login-btn google-btn" onClick={handleGoogle} disabled={isLoading}>
          {loadingGoogle
            ? <span className="login-spinner" />
            : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )
          }
          {loadingGoogle ? 'Entrando...' : 'Entrar com Google'}
        </button>

        {/* Divisor */}
        <div className="login-divider"><span>ou</span></div>

        {/* Microsoft */}
        <button className="login-btn microsoft-btn" onClick={handleMicrosoft} disabled={isLoading}>
          {loadingMicrosoft
            ? <span className="login-spinner" />
            : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#7FBA00" d="M13 1h10v10H13z" />
                <path fill="#00A4EF" d="M1 13h10v10H1z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
            )
          }
          {loadingMicrosoft ? 'Entrando...' : 'Entrar com Microsoft'}
        </button>

        {error && <div className="login-error">{error}</div>}
        <div className="login-note">
          Desenvolvido Por{' '}
          <a href="https://github.com/guilhermeteixeira01" target="_blank" rel="noopener noreferrer" style={{ color: 'snow', textDecoration: 'none' }}>
            Guilherme Teixeira
          </a>
        </div>
      </div>
    </div>
  );
}