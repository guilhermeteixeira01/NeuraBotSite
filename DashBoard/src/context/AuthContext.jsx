// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [subscription, setSubscription] = useState(null);  // assinatura vinculada ao email
  const [subscriptionLoading, setSubscriptionLoading] = useState(true); // true até resolver

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setIsAdmin(false);
        setSubscription(null);
        setSubscriptionLoading(false);
        return;
      }

      // ── 1. Verifica se é admin (Firestore) ──────────────────
      let admin = false;
      try {
        const snap = await getDocs(collection(db, 'admins'));
        const adminEmails = snap.docs.map((d) => {
          const data = d.data();
          const normalized = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k.trim(), typeof v === 'string' ? v.trim() : v])
          );
          return normalized.email?.toLowerCase() || '';
        }).filter(Boolean);

        admin = adminEmails.includes(u.email?.toLowerCase().trim());
        setIsAdmin(admin);
      } catch (err) {
        console.error('[AuthContext] erro ao buscar admins:', err);
        setIsAdmin(false);
      }

      // ── 2. Se não for admin, busca assinatura pelo email no MySQL ──
      if (!admin) {
        try {
          const sub = await api(`/api/subscriptions/by-email/${encodeURIComponent(u.email)}`);
          setSubscription(sub);
        } catch (err) {
          // 404 = email não vinculado a nenhuma assinatura
          setSubscription(null);
          console.warn('[AuthContext] nenhuma assinatura vinculada ao e-mail:', u.email);
        } finally {
          setSubscriptionLoading(false);
        }
      } else {
        setSubscription(null); // admin acessa tudo, não precisa filtrar
        setSubscriptionLoading(false);
      }

      setUser(u);
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, subscription, subscriptionLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}