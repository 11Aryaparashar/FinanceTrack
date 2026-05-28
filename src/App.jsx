import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import InsightPage from "./pages/InsightPage";
import Settings from "./pages/Settings";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Analytics from "./pages/Analtics";
import TransactionPage from "./pages/TransitionPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="transactions" element={<TransactionPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="insights" element={<InsightPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
