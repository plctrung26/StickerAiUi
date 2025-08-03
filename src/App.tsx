import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import GalleryPage from './pages/Gallery';
import ProfilePage from './pages/Profile';
import CreatePage from './pages/Create';
import PublicRoute from './components/PublicRoute';
import DashboardPage from './pages/Dashboard';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/home" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/gallery" element={
              <Layout>
                <GalleryPage />
              </Layout>
            } />
            <Route path="/profile" element={
              <Layout>
                <ProfilePage />
              </Layout>
            } />
            <Route path="/create" element={
              <Layout>
                <CreatePage />
              </Layout>
            } />
            <Route path="/dashboard" element={
              <Layout>
                <DashboardPage />
              </Layout>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
