// Mock authentication service for development
export interface WorldIDProof {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: 'orb' | 'device';
}

export interface AuthResult {
  success: boolean;
  uid: string;
  userType: string;
  proof?: WorldIDProof;
  error?: string;
}

// デモ用のモックプルーフデータ
const mockProof: WorldIDProof = {
  merkle_root: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  nullifier_hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  proof: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
  verification_level: "device" as const,
};

// モック認証関数
export async function verifyWorldIDProof(proof: unknown): Promise<AuthResult> {
  // サンドボックス環境での遅延をシミュレート
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // プルーフをログに出力（デバッグ用）
  console.log('Received World ID proof:', proof);

  // 成功ケース（90%の確率）
  if (Math.random() > 0.1) {
    const uid = `worldid_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    return {
      success: true,
      uid,
      userType: 'verified_user',
      proof: mockProof,
    };
  }

  // エラーケース（10%の確率）
  return {
    success: false,
    uid: '',
    userType: '',
    error: 'Verification failed. Please try again.',
  };
}

// デモ用のユーザー情報取得
export function getUserInfo(uid: string) {
  return {
    uid,
    displayName: 'World ID User',
    verificationLevel: 'device',
    createdAt: new Date().toISOString(),
  };
}