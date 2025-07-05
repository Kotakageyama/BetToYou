import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WorldIDAuth } from './components/WorldIDAuth';
import { UserTypeSelection } from './components/UserTypeSelection';
import { Dashboard } from './components/Dashboard';

function LoginPage() {
  const handleAuthSuccess = (uid: string) => {
    console.log('認証成功:', uid);
  };

  const handleAuthError = (error: string) => {
    console.error('認証エラー:', error);
    alert(`認証に失敗しました: ${error}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          BettoYou
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          World ID 統合デモ
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            World ID 認証
          </h2>
          
          <WorldIDAuth 
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
          />
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>サンドボックス環境での動作デモ</p>
          <p>UID はローカルストレージに保存されます</p>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function UserTypeProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (userType === 'pending') {
    return <Navigate to="/select-user-type" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, userType } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          userType === 'pending' ? (
            <Navigate to="/select-user-type" replace />
          ) : (
            <Navigate to={`/${userType}/dashboard`} replace />
          )
        ) : (
          <LoginPage />
        )
      } />
      
      <Route path="/select-user-type" element={
        <ProtectedRoute>
          <UserTypeSelection />
        </ProtectedRoute>
      } />
      
      <Route path="/scholar/dashboard" element={
        <UserTypeProtectedRoute>
          <Dashboard userType="scholar" />
        </UserTypeProtectedRoute>
      } />
      
      <Route path="/individual/dashboard" element={
        <UserTypeProtectedRoute>
          <Dashboard userType="individual" />
        </UserTypeProtectedRoute>
      } />
      
      <Route path="/corporate/dashboard" element={
        <UserTypeProtectedRoute>
          <Dashboard userType="corporate" />
        </UserTypeProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
