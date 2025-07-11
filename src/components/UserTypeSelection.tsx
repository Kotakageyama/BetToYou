import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function UserTypeSelection() {
  const { signIn, uid } = useAuth();
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType: string) => {
    if (uid) {
      // Update the context with the selected user type
      signIn(uid, userType);
      
      // Redirect to the appropriate dashboard
      navigate(`/${userType}/dashboard`);
    }
  };

  const userTypes = [
    {
      type: 'scholar',
      title: '奨学生',
      description: '学習サポートを受ける学生の方',
      icon: '🎓',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      type: 'individual',
      title: '個人支援者',
      description: '個人として学生を支援したい方',
      icon: '💫',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      type: 'corporate',
      title: '企業支援者',
      description: '企業として学生を支援したい方',
      icon: '🏢',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ユーザータイプを選択
          </h1>
          <p className="text-gray-600">
            あなたの立場に最適なダッシュボードをご提供します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((userType) => (
            <Card 
              key={userType.type}
              className={`${userType.color} cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2`}
              onClick={() => handleUserTypeSelect(userType.type)}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{userType.icon}</div>
                <CardTitle className="text-xl">{userType.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {userType.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <button 
                  className="w-full px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserTypeSelect(userType.type);
                  }}
                >
                  選択する
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>選択後、いつでも設定から変更できます</p>
        </div>
      </div>
    </div>
  );
}