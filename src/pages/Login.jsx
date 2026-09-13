import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleLogin = () => {
    setError("");
    setForgotMessage("");

    if (!email.trim()) {
      setError("Please enter your college email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid college email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    onLogin();
  };

  const handleForgotPassword = () => {
    setError("");

    if (!email.trim()) {
      setForgotMessage("Enter your college email first.");
      return;
    }

    if (!email.includes("@")) {
      setForgotMessage("Please enter a valid college email.");
      return;
    }

    setForgotMessage(
      "Password reset instructions will be sent to your college email."
    );
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          Campus<span>AI</span>
        </div>

        <h1>Welcome back</h1>

        <p>
          Sign in to continue to your personalized campus.
        </p>

        <label>College Email</label>

        <input
          type="email"
          placeholder="you@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Show or hide password"
          >
            {showPassword ? (
              <svg
                viewBox="0 0 24 24"
                className="eye-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="eye-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.1 3.9" />
                <path d="M6.2 6.2C3.5 8.2 2 12 2 12s3.5 7 10 7a9.9 9.9 0 0 0 3.4-.6" />
              </svg>
            )}
          </button>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="forgot-button"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {forgotMessage && (
          <div className="login-success">
            {forgotMessage}
          </div>
        )}

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Sign In →
        </button>

        <p className="secure">
          🔒 Secure campus access
        </p>

      </div>
    </div>
  );
}

export default Login;