import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Clock,
  Users,
  Target,
  CheckCircle,
  PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const MarketerDashboard = () => {
  const stats = [
    {
      title: "이번 달 수익",
      value: "247,000원",
      change: "+23,000원",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "참여한 캠페인",
      value: "12",
      change: "+3",
      changeType: "positive" as const,
      icon: Target,
      color: "text-primary"
    },
    {
      title: "완료율",
      value: "94%",
      change: "+2%",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "text-ai-purple"
    },
    {
      title: "마케터 등급",
      value: "Silver",
      change: "승급 임박",
      changeType: "positive" as const,
      icon: Award,
      color: "text-warning"
    }
  ];

  const availableCampaigns = [
    {
      id: 1,
      title: "새로운 앱 설치 & 리뷰",
      advertiser: "(주) 테크스타트업",
      type: "screenshot",
      reward: 3000,
      timeRequired: "15분",
      difficulty: "쉬움",
      participants: 45,
      maxParticipants: 100,
      endDate: "2024-02-15",
      tags: ["앱", "리뷰", "설치"]
    },
    {
      id: 2,
      title: "소셜미디어 게시물 공유",
      advertiser: "뷰티브랜드코리아",
      type: "social_share",
      reward: 2500,
      timeRequired: "10분",
      difficulty: "쉬움",
      participants: 67,
      maxParticipants: 150,
      endDate: "2024-02-12",
      tags: ["소셜", "공유", "뷰티"]
    },
    {
      id: 3,
      title: "온라인 설문조사 참여",
      advertiser: "마케팅리서치",
      type: "survey",
      reward: 5000,
      timeRequired: "20분",
      difficulty: "보통",
      participants: 23,
      maxParticipants: 50,
      endDate: "2024-02-18",
      tags: ["설문", "리서치"]
    }
  ];

  const myActiveCampaigns = [
    {
      id: 1,
      title: "레스토랑 방문 후기 작성",
      status: "in_progress",
      reward: 4000,
      deadline: "2024-02-10",
      progress: 60
    },
    {
      id: 2,
      title: "제품 언박싱 영상 제작",
      status: "submitted",
      reward: 8000,
      deadline: "2024-02-08",
      progress: 100
    }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case '쉬움':
        return <Badge variant="outline" className="text-success border-success/20">쉬움</Badge>;
      case '보통':
        return <Badge variant="outline" className="text-warning border-warning/20">보통</Badge>;
      case '어려움':
        return <Badge variant="outline" className="text-destructive border-destructive/20">어려움</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="default" className="bg-primary text-primary-foreground">진행중</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="text-warning border-warning/20">검토중</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-success border-success/20">완료</Badge>;
      default:
        return <Badge variant="secondary">대기중</Badge>;
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
              <h1 className="text-3xl font-bold text-foreground">마케터 대시보드</h1>
              <p className="text-muted-foreground">새로운 캠페인을 찾고 수익을 창출하세요</p>
            </div>
            <Link to="/campaigns">
              <Button size="lg" variant="ai" className="group">
                <Search className="w-4 h-4 mr-2" />
                캠페인 둘러보기
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Available Campaigns */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    추천 캠페인
                  </CardTitle>
                  <CardDescription>
                    당신에게 맞는 캠페인을 AI가 추천했습니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="hover:shadow-md transition-all duration-300 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{campaign.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{campaign.advertiser}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {campaign.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-success">
                              {campaign.reward.toLocaleString()}원
                            </div>
                            <div className="text-xs text-muted-foreground">보상금</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{campaign.timeRequired}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getDifficultyBadge(campaign.difficulty)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{campaign.participants}/{campaign.maxParticipants}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            마감: {campaign.endDate}
                          </div>
                          <Button size="sm" variant="ai">
                            <PlayCircle className="w-4 h-4 mr-1" />
                            참여하기
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* My Active Campaigns */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    진행중인 캠페인
                  </CardTitle>
                  <CardDescription>
                    현재 참여중인 캠페인들
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myActiveCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-foreground text-sm">{campaign.title}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-success font-medium">
                                {campaign.reward.toLocaleString()}원
                              </span>
                              {getStatusBadge(campaign.status)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>진행률</span>
                              <span>{campaign.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${campaign.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            마감: {campaign.deadline}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Link to="/campaigns">
                    <Button variant="outline" className="w-full">
                      더 많은 캠페인 보기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketerDashboard;