import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Eye,
  Edit,
  Pause,
  Play,
  MoreHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";

const AdvertiserDashboard = () => {
  const stats = [
    {
      title: "활성 캠페인",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "총 참여자",
      value: "1,247",
      change: "+156",
      changeType: "positive" as const,
      icon: Users,
      color: "text-success"
    },
    {
      title: "이번 달 지출",
      value: "2,840,000원",
      change: "+320,000원",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-warning"
    },
    {
      title: "평균 ROI",
      value: "312%",
      change: "+23%",
      changeType: "positive" as const,
      icon: BarChart3,
      color: "text-ai-purple"
    }
  ];

  const campaigns = [
    {
      id: 1,
      title: "신제품 런칭 캠페인",
      status: "active",
      type: "screenshot",
      participants: 156,
      budget: 500000,
      spent: 342000,
      completion: 68,
      roi: 285,
      endDate: "2024-02-15"
    },
    {
      id: 2,
      title: "브랜드 인지도 향상",
      status: "active",
      type: "social_share",
      participants: 89,
      budget: 300000,
      spent: 245000,
      completion: 82,
      roi: 340,
      endDate: "2024-02-10"
    },
    {
      id: 3,
      title: "할인 이벤트 홍보",
      status: "paused",
      type: "email_verify",
      participants: 234,
      budget: 800000,
      spent: 456000,
      completion: 57,
      roi: 198,
      endDate: "2024-02-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground">진행중</Badge>;
      case 'paused':
        return <Badge variant="secondary">일시정지</Badge>;
      case 'completed':
        return <Badge variant="outline">완료</Badge>;
      default:
        return <Badge variant="secondary">준비중</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'screenshot':
        return '스크린샷 인증';
      case 'social_share':
        return '소셜 공유';
      case 'email_verify':
        return '이메일 인증';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">광고주 대시보드</h1>
              <p className="text-muted-foreground">캠페인을 관리하고 성과를 확인하세요</p>
            </div>
            <Link to="/campaigns/create">
              <Button size="lg" variant="ai" className="group">
                <Plus className="w-4 h-4 mr-2" />
                새 캠페인 만들기
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="group hover:shadow-ai transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-success flex items-center mt-1">
                        <span>{stat.change}</span>
                        <span className="ml-1">지난 달 대비</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-background to-muted ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>활성 캠페인</CardTitle>
                <CardDescription>
                  현재 진행중인 캠페인들의 성과를 확인하세요
                </CardDescription>
              </div>
              <Link to="/campaigns">
                <Button variant="outline">
                  전체 보기
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">캠페인</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">상태</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">참여자</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">진행률</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ROI</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">종료일</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-foreground">{campaign.title}</div>
                            <div className="text-sm text-muted-foreground">{getTypeLabel(campaign.type)}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(campaign.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{campaign.participants}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${campaign.completion}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{campaign.completion}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-success border-success/20">
                            {campaign.roi}%
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {campaign.endDate}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdvertiserDashboard;