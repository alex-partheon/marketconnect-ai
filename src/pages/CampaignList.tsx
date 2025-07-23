
import { useState } from "react";
import { Search, Filter, Plus, Eye, Users, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CampaignList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data - in real app this would come from API
  const campaigns = [
    {
      id: 1,
      title: "신제품 인스타그램 리뷰 캠페인",
      description: "새로 출시된 스킨케어 제품을 체험하고 인스타그램에 리뷰를 작성해주세요.",
      category: "뷰티",
      reward: 50000,
      participants: 24,
      maxParticipants: 50,
      endDate: "2024-02-15",
      status: "active",
      actionType: "screenshot",
      tags: ["뷰티", "인스타그램", "리뷰"]
    },
    {
      id: 2,
      title: "카페 방문 인증 미션",
      description: "지정된 카페를 방문하고 메뉴판과 함께 셀카를 찍어 인증해주세요.",
      category: "음식",
      reward: 25000,
      participants: 18,
      maxParticipants: 30,
      endDate: "2024-02-10",
      status: "active",
      actionType: "screenshot",
      tags: ["음식", "카페", "방문인증"]
    },
    {
      id: 3,
      title: "온라인 쇼핑몰 회원가입",
      description: "신규 온라인 쇼핑몰에 회원가입하고 첫 구매 시 할인혜택을 받아보세요.",
      category: "쇼핑",
      reward: 15000,
      participants: 45,
      maxParticipants: 100,
      endDate: "2024-03-01",
      status: "active",
      actionType: "email_verify",
      tags: ["쇼핑", "회원가입", "할인"]
    },
    {
      id: 4,
      title: "피트니스 앱 7일 체험",
      description: "새로운 피트니스 앱을 7일간 체험하고 운동 기록을 인증해주세요.",
      category: "건강",
      reward: 40000,
      participants: 12,
      maxParticipants: 25,
      endDate: "2024-01-30",
      status: "completed",
      actionType: "screenshot",
      tags: ["건강", "운동", "앱체험"]
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "completed": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "진행중";
      case "completed": return "완료됨";
      case "pending": return "대기중";
      default: return "알 수 없음";
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
              <h1 className="text-3xl font-bold text-foreground">캠페인 목록</h1>
              <p className="text-muted-foreground mt-1">참여할 수 있는 캠페인을 찾아보세요</p>
            </div>
            <Link to="/campaigns/create">
              <Button variant="ai" className="gap-2">
                <Plus className="w-4 h-4" />
                캠페인 생성
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="캠페인 제목이나 설명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="active">진행중</SelectItem>
                <SelectItem value="completed">완료됨</SelectItem>
                <SelectItem value="pending">대기중</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="카테고리 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                <SelectItem value="뷰티">뷰티</SelectItem>
                <SelectItem value="음식">음식</SelectItem>
                <SelectItem value="쇼핑">쇼핑</SelectItem>
                <SelectItem value="건강">건강</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-ai transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                      <CardDescription className="mt-1">{campaign.category}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                      {getStatusText(campaign.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  {/* Campaign Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {campaign.reward.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">
                        {campaign.participants}/{campaign.maxParticipants}명
                      </span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm">
                        마감: {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {campaign.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link to={`/campaigns/${campaign.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      disabled={campaign.status === "completed"}
                    >
                      <Eye className="w-4 h-4" />
                      {campaign.status === "completed" ? "완료된 캠페인" : "자세히 보기"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">
                다른 검색어나 필터를 사용해 보세요
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CampaignList;
