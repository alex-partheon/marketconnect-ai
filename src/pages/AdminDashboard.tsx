
import { useState } from "react";
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Mock data
  const dashboardStats = {
    totalUsers: 2847,
    totalCampaigns: 156,
    totalRevenue: 45280000,
    pendingApprovals: 23,
    activeUsers: 1524,
    completionRate: 89.2
  };

  const recentUsers = [
    {
      id: 1,
      name: "김마케터",
      email: "kim.marketer@example.com",
      role: "marketer",
      status: "active",
      joinDate: "2024-01-20",
      tier: "Gold"
    },
    {
      id: 2,
      name: "박광고주",
      email: "park.advertiser@example.com",
      role: "advertiser",
      status: "active",
      joinDate: "2024-01-19",
      tier: "Premium"
    },
    {
      id: 3,
      name: "이인플루언서",
      email: "lee.influencer@example.com",
      role: "marketer",
      status: "pending",
      joinDate: "2024-01-18",
      tier: "Bronze"
    }
  ];

  const pendingCampaigns = [
    {
      id: 1,
      title: "신제품 인스타그램 리뷰",
      advertiser: "뷰티브랜드",
      category: "뷰티",
      reward: 50000,
      status: "pending",
      submittedAt: "2024-01-20"
    },
    {
      id: 2,
      title: "카페 방문 인증 캠페인",
      advertiser: "카페체인",
      category: "음식",
      reward: 25000,
      status: "pending",
      submittedAt: "2024-01-19"
    },
    {
      id: 3,
      title: "온라인 쇼핑몰 체험",
      advertiser: "이커머스",
      category: "쇼핑",
      reward: 15000,
      status: "under_review",
      submittedAt: "2024-01-18"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "의심스러운 활동 감지",
      description: "사용자 ID #1234에서 비정상적인 제출 패턴이 감지되었습니다.",
      timestamp: "2024-01-20 14:30"
    },
    {
      id: 2,
      type: "error",
      title: "결제 시스템 오류",
      description: "토스페이먼츠 연동에서 일시적인 오류가 발생했습니다.",
      timestamp: "2024-01-20 12:15"
    },
    {
      id: 3,
      type: "info",
      title: "시스템 업데이트 완료",
      description: "AI 검증 시스템이 v2.1로 업데이트되었습니다.",
      timestamp: "2024-01-20 09:00"
    }
  ];

  const handleApprove = (id: number, type: string) => {
    toast({
      title: "승인 완료",
      description: `${type}이(가) 승인되었습니다.`,
    });
  };

  const handleReject = (id: number, type: string) => {
    toast({
      title: "거절 완료",
      description: `${type}이(가) 거절되었습니다.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "under_review": return "bg-blue-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "활성";
      case "pending": return "대기";
      case "under_review": return "검토중";
      case "rejected": return "거절됨";
      default: return "알 수 없음";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "marketer": return "마케터";
      case "advertiser": return "광고주";
      case "admin": return "관리자";
      default: return "알 수 없음";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error": return <XCircle className="w-4 h-4 text-red-500" />;
      case "info": return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">관리자 대시보드</h1>
              <p className="text-muted-foreground mt-1">플랫폼 전체 현황과 관리 기능</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                필터
              </Button>
              <Button variant="ai" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                보고서
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% 이번 달</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 캠페인</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalCampaigns}</div>
                <p className="text-xs text-muted-foreground">+8% 이번 달</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 수익</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(dashboardStats.totalRevenue / 10000).toFixed(0)}만원</div>
                <p className="text-xs text-muted-foreground">+15% 이번 달</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">승인 대기</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.pendingApprovals}</div>
                <p className="text-xs text-muted-foreground">처리 필요</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">일일 활성 사용자</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">완료율</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.completionRate}%</div>
                <p className="text-xs text-muted-foreground">캠페인 완료율</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">사용자 관리</TabsTrigger>
              <TabsTrigger value="campaigns">캠페인 관리</TabsTrigger>
              <TabsTrigger value="approvals">승인 관리</TabsTrigger>
              <TabsTrigger value="analytics">분석</TabsTrigger>
              <TabsTrigger value="alerts">알림</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>사용자 관리</CardTitle>
                  <CardDescription>
                    등록된 사용자들을 관리하고 모니터링하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="사용자 이름이나 이메일로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="상태 필터" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상태</SelectItem>
                        <SelectItem value="active">활성</SelectItem>
                        <SelectItem value="pending">대기</SelectItem>
                        <SelectItem value="suspended">정지</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>사용자</TableHead>
                        <TableHead>역할</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>티어</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{getRoleText(user.role)}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(user.status)} text-white`}>
                              {getStatusText(user.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.tier}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>캠페인 관리</CardTitle>
                  <CardDescription>
                    모든 캠페인을 관리하고 모니터링하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">캠페인 관리</h3>
                    <p className="text-muted-foreground">
                      캠페인 관리 기능이 구현될 예정입니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approvals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>승인 관리</CardTitle>
                  <CardDescription>
                    승인이 필요한 캠페인과 콘텐츠를 관리하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{campaign.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {campaign.advertiser} • {campaign.category} • {campaign.reward.toLocaleString()}원
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            제출일: {new Date(campaign.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                            {getStatusText(campaign.status)}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApprove(campaign.id, "캠페인")}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReject(campaign.id, "캠페인")}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>분석</CardTitle>
                  <CardDescription>
                    플랫폼 성과와 트렌드를 분석하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">분석 대시보드</h3>
                    <p className="text-muted-foreground">
                      상세한 분석 기능이 구현될 예정입니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>시스템 알림</CardTitle>
                  <CardDescription>
                    중요한 시스템 알림과 경고를 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {alert.timestamp}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          처리
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
