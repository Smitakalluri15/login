import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doPasswordReset
} from '../firebase/auth';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const result = await doCreateUserWithEmailAndPassword(email, password);
        alert("✅ Sign up successful!");
        console.log("Signed up user:", result.user);
      } else {
        const result = await doSignInWithEmailAndPassword(email, password);
        alert("✅ Login successful!");
        console.log("Logged in user:", result.user);
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await doSignInWithGoogle();
      alert(`✅ Welcome ${result.user.displayName || 'User'}!`);
      console.log("Google user:", result.user);
    } catch (error) {
      console.error("Google auth error:", error.message);
      alert(error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      await doPasswordReset(email);
      alert("✅ Password reset email sent. Check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isSignup ? 'Create an Account' : 'Welcome Back'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isSignup && (
          <div className="text-right text-sm">
            <button
              type="button"
              className="text-blue-400 hover:underline"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400 mt-4">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <button onClick={toggleMode} className="text-blue-400 hover:underline">
              Login
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{' '}
            <button onClick={toggleMode} className="text-blue-400 hover:underline">
              Sign Up
            </button>
          </>
        )}
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-600" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      <button
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2 rounded hover:bg-gray-200 transition font-medium"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>
    </div>
  );
};

export default Auth;
