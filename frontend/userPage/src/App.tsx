import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@mnemophi/shared'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { UserPortalPage } from './pages/UserPortalPage'
import { ConsentManagementPage } from './pages/ConsentManagementPage'
import { ProfilePage } from './pages/ProfilePage'
import { PrivacySettingsPage } from './pages/PrivacySettingsPage'
import { DataManagementPage } from './pages/DataManagementPage'
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
          path="/portal"
          element={
            <ProtectedRoute>
              <UserPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/consent"
          element={
            <ProtectedRoute>
              <ConsentManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/privacy"
          element={
            <ProtectedRoute>
              <PrivacySettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/data"
          element={
            <ProtectedRoute>
              <DataManagementPage />
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
            <Navigate to={isAuthenticated ? '/portal' : '/auth/login'} replace />
          }
        />
      </Routes>
    </div>
  )
}

export default App