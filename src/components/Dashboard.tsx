import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScholarshipCertificateUpload } from './ScholarshipCertificateUpload';

interface DashboardProps {
  userType: 'scholar' | 'individual' | 'corporate';
}

export function Dashboard({ userType }: DashboardProps) {
  const { signOut, uid } = useAuth();

  const dashboardContent = {
    scholar: {
      title: '奨学生ダッシュボード',
      icon: '🎓',
      description: '学習サポートと奨学金情報を確認できます',
      features: [
        { name: '学習進捗', description: '現在の学習状況を確認' },
        { name: '奨学金情報', description: '受給可能な奨学金を探す' },
        { name: 'メンター', description: '専門家からのサポートを受ける' },
        { name: '課題提出', description: '課題を提出し、フィードバックを受ける' }
      ]
    },
    individual: {
      title: '個人支援者ダッシュボード',
      icon: '💫',
      description: '支援している学生の情報を確認できます',
      features: [
        { name: '支援学生', description: '支援している学生の一覧' },
        { name: '支援履歴', description: '過去の支援記録を確認' },
        { name: 'メッセージ', description: '学生とのコミュニケーション' },
        { name: '寄付管理', description: '寄付の管理と履歴' }
      ]
    },
    corporate: {
      title: '企業支援者ダッシュボード',
      icon: '🏢',
      description: '企業の支援プログラムを管理できます',
      features: [
        { name: '支援プログラム', description: '実施中の支援プログラム' },
        { name: '学生マッチング', description: '企業にマッチした学生の紹介' },
        { name: 'CSR活動', description: '社会貢献活動の管理' },
        { name: 'レポート', description: '支援活動の成果レポート' }
      ]
    }
  };

  const content = dashboardContent[userType];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{content.icon}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-sm text-gray-600">{content.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                UID: {uid?.slice(0, 8)}...
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                サインアウト
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ようこそ！
          </h2>
          <p className="text-gray-600">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features.map((feature) => (
            <Card key={feature.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  開く
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {userType === 'scholar' && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              証明書管理
            </h3>
            <ScholarshipCertificateUpload />
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            開発中の機能
          </h3>
          <p className="text-blue-700 text-sm">
            このダッシュボードは現在開発中です。今後、より多くの機能を追加予定です。
          </p>
        </div>
      </div>
    </div>
  );
}