import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage_modern';
import LoginPage from './pages/LoginPage_modern';
import GalleryPage from './pages/GalleryPage_modern';
import ProfilePage from './pages/ProfilePage_modern';
import CreatePage from './pages/CreatePage_modern';
import PublicRoute from './components/PublicRoute';
import DashboardPage from './pages/DashboardPage_modern';

// Create Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9ff7',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#f093fb',
      light: '#f5b3fc',
      dark: '#d665e0',
    },
    background: {
      default: '#ffffff',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    success: {
      main: '#10b981',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 800,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
