import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@mnemophi/shared'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/components"
          element={
            <ProtectedRoute>
              <ComponentsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Default redirect */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? '/dashboard' : '/auth/login'} replace />
          }
        />
      </Routes>
    </div>
  )
}

export default App