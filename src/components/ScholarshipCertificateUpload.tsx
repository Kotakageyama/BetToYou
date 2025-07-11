import React, { useState, useRef } from 'react';
import { SHA256 } from 'crypto-js';
import { Upload, FileText, Image, Check, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveScholarCertificate, type ScholarRecord } from '../lib/mockAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

interface UploadState {
  status: 'idle' | 'uploading' | 'hashing' | 'saving' | 'success' | 'error';
  fileName?: string;
  fileHash?: string;
  error?: string;
  savedRecord?: ScholarRecord;
}

export function ScholarshipCertificateUpload() {
  const { uid, isAuthenticated } = useAuth();
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetUpload = () => {
    setUploadState({ status: 'idle' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイル形式チェック
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadState({
        status: 'error',
        error: 'サポートされていないファイル形式です。PDF、JPEG、PNG、GIF、またはWebPファイルをアップロードしてください。'
      });
      return;
    }

    // ファイルサイズチェック (10MB制限)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadState({
        status: 'error',
        error: 'ファイルサイズが大きすぎます。10MB以下のファイルをアップロードしてください。'
      });
      return;
    }

    try {
      setUploadState({ status: 'uploading', fileName: file.name });

      // ファイルをArrayBufferとして読み込み
      const fileBuffer = await file.arrayBuffer();
      
      setUploadState(prev => ({ ...prev, status: 'hashing' }));

      // SHA-256ハッシュを生成
      const wordArray = SHA256(new Uint8Array(fileBuffer).toString());
      const hash = wordArray.toString();

      console.log('Generated hash:', hash);
      console.log('Original file size:', file.size, 'bytes');
      console.log('File will be discarded, only hash will be saved');

      setUploadState(prev => ({ 
        ...prev, 
        status: 'saving',
        fileHash: hash 
      }));

      // Firestore mockにハッシュを保存
      if (!uid) {
        throw new Error('ユーザーが認証されていません');
      }

      const result = await saveScholarCertificate(uid, hash);

      if (result.success && result.data) {
        setUploadState({
          status: 'success',
          fileName: file.name,
          fileHash: hash,
          savedRecord: result.data
        });
      } else {
        throw new Error(result.error || 'データベースへの保存に失敗しました');
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadState({
        status: 'error',
        error: error instanceof Error ? error.message : 'ファイルの処理中にエラーが発生しました'
      });
    }
  };

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <Upload className="w-8 h-8" />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    return <Image className="w-8 h-8 text-blue-500" />;
  };

  const getStatusMessage = () => {
    switch (uploadState.status) {
      case 'uploading':
        return 'ファイルを読み込み中...';
      case 'hashing':
        return 'セキュアハッシュを生成中...';
      case 'saving':
        return 'データベースに保存中...';
      case 'success':
        return '証明書が正常にアップロードされました！';
      case 'error':
        return uploadState.error;
      default:
        return 'PDF または画像ファイルをアップロードしてください';
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">認証が必要です</h3>
          <p className="text-gray-600">
            証明書をアップロードするには、まずWorld IDで認証してください。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          奨学生証明書アップロード
        </CardTitle>
        <CardDescription>
          PDF または画像ファイルをアップロードして、セキュアハッシュを生成します。
          原本ファイルは処理後すぐに破棄されます。
        </CardDescription>
      </CardHeader>

      <CardContent>
        {uploadState.status === 'success' ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">アップロード完了</p>
              <p className="text-green-600 text-sm mt-1">
                ファイル: {uploadState.fileName}
              </p>
              <p className="text-green-600 text-xs mt-2 break-all">
                ハッシュ: {uploadState.fileHash?.substring(0, 20)}...
              </p>
              <p className="text-green-600 text-xs mt-1">
                保存日時: {uploadState.savedRecord?.uploadedAt ? 
                  new Date(uploadState.savedRecord.uploadedAt).toLocaleString('ja-JP') : 
                  '不明'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${uploadState.status === 'error' 
                  ? 'border-red-300 bg-red-50' 
                  : uploadState.status === 'idle'
                  ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  : 'border-blue-300 bg-blue-50'
                }
              `}
              onClick={() => uploadState.status === 'idle' && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                onChange={handleFileSelect}
                disabled={uploadState.status !== 'idle'}
              />

              <div className="space-y-2">
                {uploadState.status === 'idle' ? (
                  getFileIcon()
                ) : uploadState.status === 'error' ? (
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                ) : (
                  <div className="w-8 h-8 mx-auto">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}

                <p className={`text-sm ${
                  uploadState.status === 'error' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {getStatusMessage()}
                </p>

                {uploadState.fileName && uploadState.status !== 'error' && (
                  <p className="text-xs text-blue-600 break-all">
                    {uploadState.fileName}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">セキュリティについて</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• ファイルはSHA-256でハッシュ化されます</li>
                <li>• 原本ファイルは処理後すぐに破棄されます</li>
                <li>• ハッシュ値のみがデータベースに保存されます</li>
                <li>• World IDと関連付けて安全に管理されます</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>

      {uploadState.status === 'success' && (
        <CardFooter>
          <button
            onClick={resetUpload}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            新しいファイルをアップロード
          </button>
        </CardFooter>
      )}
    </Card>
  );
}