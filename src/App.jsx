import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";

import { CATEGORIES } from "./data/portfolio.js";

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Layout
      aboutOpen={aboutOpen}
      setAboutOpen={setAboutOpen}
      contactOpen={contactOpen}
      setContactOpen={setContactOpen}
      toast={toast}
      setToast={setToast}
      year={year}
    >
      <Routes>
        <Route
          path="/"
          element={<Home setContactOpen={setContactOpen} />}
        />

        <Route
          path="/portfolio/:category"
          element={<Category />}
        />

        {/* Optional: redirect old anchor style */}
        <Route
          path="/portfolio"
          element={<Navigate to={`/portfolio/${CATEGORIES[0].slug}`} replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
