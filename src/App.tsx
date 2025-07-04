import { AuthProvider } from './contexts/AuthContext';
import { WorldIDAuth } from './components/WorldIDAuth';

function App() {
  const handleAuthSuccess = (uid: string) => {
    console.log('認証成功:', uid);
  };

  const handleAuthError = (error: string) => {
    console.error('認証エラー:', error);
    alert(`認証に失敗しました: ${error}`);
  };

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
