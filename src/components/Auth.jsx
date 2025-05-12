import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export default function Auth({ user, setUser }) {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e) {
      alert('Login failed');
    }
  };
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-gray-700">{user.displayName || user.email}</span>
          <button className="btn btn-sm btn-outline" onClick={logout}>Logout</button>
        </>
      ) : (
        <button className="btn btn-sm btn-primary" onClick={login}>Login with Google</button>
      )}
    </div>
  );
}
