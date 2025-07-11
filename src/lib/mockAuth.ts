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

// Firestore mock interfaces
export interface ScholarRecord {
  uid: string;
  certHash: string;
  worldIdNullifier?: string;
  uploadedAt: string;
}

export interface FirestoreResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// デモ用のモックプルーフデータ
const mockProof: WorldIDProof = {
  merkle_root: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  nullifier_hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  proof: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
  verification_level: "device" as const,
};

// Mock Firestore scholars collection
const mockScholarsCollection: ScholarRecord[] = [];

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

// Firestore mock functions for scholars collection
export async function saveScholarCertificate(
  uid: string, 
  certHash: string, 
  worldIdNullifier?: string
): Promise<FirestoreResult<ScholarRecord>> {
  // シミュレートされた遅延
  await new Promise(resolve => setTimeout(resolve, 500));

  // 既存のレコードをチェック
  const existingRecord = mockScholarsCollection.find(record => record.uid === uid);
  
  if (existingRecord) {
    return {
      success: false,
      error: 'Certificate already exists for this user',
    };
  }

  const newRecord: ScholarRecord = {
    uid,
    certHash,
    worldIdNullifier,
    uploadedAt: new Date().toISOString(),
  };

  mockScholarsCollection.push(newRecord);

  console.log('Scholar certificate saved:', newRecord);
  console.log('Current scholars collection:', mockScholarsCollection);

  return {
    success: true,
    data: newRecord,
  };
}

export async function getScholarCertificate(uid: string): Promise<FirestoreResult<ScholarRecord>> {
  // シミュレートされた遅延
  await new Promise(resolve => setTimeout(resolve, 300));

  const record = mockScholarsCollection.find(r => r.uid === uid);

  if (!record) {
    return {
      success: false,
      error: 'Certificate not found for this user',
    };
  }

  return {
    success: true,
    data: record,
  };
}

export function getAllScholarCertificates(): ScholarRecord[] {
  return [...mockScholarsCollection];
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