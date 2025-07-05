import { IDKitWidget, VerificationLevel, type ISuccessResult } from '@worldcoin/idkit';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { verifyWorldIDProof } from '../lib/mockAuth';
import { useNavigate } from 'react-router-dom';

interface WorldIDAuthProps {
  onSuccess?: (uid: string) => void;
  onError?: (error: string) => void;
}

export function WorldIDAuth({ onSuccess, onError }: WorldIDAuthProps) {
  const { signIn, signOut, isAuthenticated, uid } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (proof: ISuccessResult) => {
    setIsVerifying(true);
    
    try {
      // モック認証サービスを呼び出し
      const result = await verifyWorldIDProof(proof);
      
      if (result.success) {
        // Save the UID temporarily without userType to allow selection
        signIn(result.uid, 'pending');
        onSuccess?.(result.uid);
        
        // Redirect to user type selection
        navigate('/select-user-type');
      } else {
        onError?.(result.error || 'Verification failed');
      }
    } catch (error) {
      console.error('World ID verification error:', error);
      onError?.('An unexpected error occurred during verification');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleError = (error: unknown) => {
    console.error('World ID error:', error);
    onError?.('World ID verification failed');
  };

  if (isAuthenticated && uid) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            認証済み
          </h3>
          <p className="text-green-600 text-sm break-all">
            UID: {uid}
          </p>
        </div>
        <button
          onClick={signOut}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          サインアウト
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      {isVerifying && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600">認証を確認中...</p>
        </div>
      )}
      
      <IDKitWidget
        app_id="app_staging_123456789" // サンドボックス用のアプリID
        action="verify-user"
        verification_level={VerificationLevel.Device} // デバイスレベルの認証
        handleVerify={handleVerify}
        onSuccess={(result) => console.log('IDKit Success:', result)}
        onError={handleError}
      >
        {({ open }) => (
          <button
            onClick={open}
            disabled={isVerifying}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            {isVerifying ? '認証中...' : 'World ID でサインイン'}
          </button>
        )}
      </IDKitWidget>
      
      <p className="text-sm text-gray-500">
        World ID を使用してプライバシーを保護したまま認証します
      </p>
    </div>
  );
}