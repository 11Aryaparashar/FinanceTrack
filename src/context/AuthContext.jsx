import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("fintrackUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }

    // Initialize demo account if it doesn't exist
    const demoExists = localStorage.getItem("fintrack_demo@example.com");
    if (!demoExists) {
      const demoAccount = {
        id: "demo_user_001",
        email: "demo@example.com",
        name: "Demo User",
        password: "demo123",
        role: "viewer",
      };
      localStorage.setItem("fintrack_demo@example.com", JSON.stringify(demoAccount));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const storedCredentials = localStorage.getItem(`fintrack_${email}`);
    if (!storedCredentials) {
      return {
        success: false,
        message: "User not found. Please sign up first.",
      };
    }

    const credentials = JSON.parse(storedCredentials);
    if (credentials.password !== password) {
      return { success: false, message: "Invalid password. Please try again." };
    }

    const userData = {
      id: credentials.id,
      email: email,
      name: credentials.name,
      role: credentials.role || "viewer",
    };

    localStorage.setItem("fintrackUser", JSON.stringify(userData));
    setUser(userData);
    return { success: true, message: "Login successful!" };
  };

  const signup = (email, name, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const existingUser = localStorage.getItem(`fintrack_${email}`);
    if (existingUser) {
      return { success: false, message: "This email is already registered." };
    }

    const userData = {
      id: Date.now().toString(),
      email: email,
      name: name,
      password: password,
      role: "viewer",
    };

    localStorage.setItem(`fintrack_${email}`, JSON.stringify(userData));

    const loggedInUser = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };

    localStorage.setItem("fintrackUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true, message: "Signup successful!" };
  };

  const logout = () => {
    localStorage.removeItem("fintrackUser");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
