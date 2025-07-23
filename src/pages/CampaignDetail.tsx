
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Upload,
  Eye,
  MessageSquare,
  Share2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isParticipating, setIsParticipating] = useState(false);
  const [proofText, setProofText] = useState("");

  // Mock data - in real app this would come from API
  const campaign = {
    id: 1,
    title: "신제품 인스타그램 리뷰 캠페인",
    description: "새로 출시된 스킨케어 제품을 체험하고 인스타그램에 리뷰를 작성해주세요. 제품의 장점과 사용 후기를 솔직하게 작성해 주시면 됩니다.",
    category: "뷰티",
    reward: 50000,
    participants: 24,
    maxParticipants: 50,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    actionType: "screenshot",
    tags: ["뷰티", "인스타그램", "리뷰"],
    targetAudience: "20-30대 여성, 뷰티에 관심 있는 분",
    additionalInfo: "제품은 캠페인 참여 승인 후 배송됩니다. 리뷰 작성 시 #신제품체험 #뷰티리뷰 해시태그를 포함해주세요.",
    advertiser: {
      name: "뷰티브랜드",
      avatar: "B",
      rating: 4.8
    },
    requirements: [
      "인스타그램 팔로워 1000명 이상",
      "뷰티 관련 포스팅 경험 있음",
      "성실한 리뷰 작성 가능"
    ],
    submissions: [
      {
        id: 1,
        user: { name: "김마케터", avatar: "김" },
        status: "approved",
        submittedAt: "2024-01-20",
        proofText: "인스타그램에 리뷰 포스팅 완료했습니다!"
      },
      {
        id: 2,
        user: { name: "박인플루언서", avatar: "박" },
        status: "pending",
        submittedAt: "2024-01-21",
        proofText: "제품 사용 후 리뷰 작성중입니다."
      }
    ]
  };

  const handleParticipate = () => {
    setIsParticipating(true);
    toast({
      title: "참여 신청 완료!",
      description: "캠페인 참여가 신청되었습니다. 승인 후 안내드리겠습니다.",
    });
  };

  const handleSubmitProof = () => {
    if (!proofText.trim()) {
      toast({
        title: "증빙 자료를 입력해주세요",
        description: "미션 수행 증빙 내용을 작성해주세요.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "증빙 제출 완료!",
      description: "제출된 증빙 자료를 검토 중입니다.",
    });
    setProofText("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved": return "승인됨";
      case "pending": return "검토중";
      case "rejected": return "거절됨";
      default: return "알 수 없음";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return CheckCircle;
      case "pending": return Clock;
      case "rejected": return XCircle;
      default: return Clock;
    }
  };

  const progressPercentage = (campaign.participants / campaign.maxParticipants) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/campaigns")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              캠페인 목록
            </Button>
            <Badge className={`${
              campaign.status === "active" ? "bg-green-500" : "bg-gray-500"
            } text-white`}>
              {campaign.status === "active" ? "진행중" : "종료"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                      <CardDescription className="text-base">
                        {campaign.description}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      공유
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {campaign.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">보상금</p>
                        <p className="font-medium">{campaign.reward.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">참여자</p>
                        <p className="font-medium">{campaign.participants}/{campaign.maxParticipants}명</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">마감일</p>
                        <p className="font-medium">{daysLeft > 0 ? `${daysLeft}일 후` : "마감됨"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">카테고리</p>
                        <p className="font-medium">{campaign.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>참여 진행률</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Details */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">상세 정보</TabsTrigger>
                  <TabsTrigger value="requirements">참여 조건</TabsTrigger>
                  <TabsTrigger value="submissions">제출 현황</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>캠페인 상세 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">타겟 오디언스</h4>
                        <p className="text-muted-foreground">{campaign.targetAudience}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">추가 정보</h4>
                        <p className="text-muted-foreground">{campaign.additionalInfo}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">캠페인 기간</h4>
                        <p className="text-muted-foreground">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requirements" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>참여 조건</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {campaign.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="submissions" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>제출 현황</CardTitle>
                      <CardDescription>
                        총 {campaign.submissions.length}개의 제출이 있습니다
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {campaign.submissions.map((submission) => {
                          const StatusIcon = getStatusIcon(submission.status);
                          return (
                            <div key={submission.id} className="flex items-start gap-3 p-3 border rounded-lg">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{submission.user.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium">{submission.user.name}</p>
                                  <Badge className={`${getStatusColor(submission.status)} text-white`}>
                                    {getStatusText(submission.status)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm">{submission.proofText}</p>
                              </div>
                              <StatusIcon className="w-4 h-4 text-muted-foreground" />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Advertiser Info */}
              <Card>
                <CardHeader>
                  <CardTitle>광고주 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{campaign.advertiser.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{campaign.advertiser.name}</p>
                      <p className="text-sm text-muted-foreground">
                        평점: {campaign.advertiser.rating}/5.0
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participation */}
              <Card>
                <CardHeader>
                  <CardTitle>참여하기</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isParticipating ? (
                    <Button 
                      onClick={handleParticipate}
                      className="w-full"
                      disabled={campaign.status !== "active"}
                    >
                      캠페인 참여하기
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">참여 신청 완료</span>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">미션 수행 증빙</label>
                        <Textarea
                          placeholder="미션을 수행한 증빙 자료나 설명을 입력해주세요"
                          value={proofText}
                          onChange={(e) => setProofText(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleSubmitProof}
                        className="w-full gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        증빙 제출하기
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>캠페인 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 예산</span>
                    <span className="font-medium">
                      {(campaign.reward * campaign.maxParticipants).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">잔여 예산</span>
                    <span className="font-medium">
                      {(campaign.reward * (campaign.maxParticipants - campaign.participants)).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">참여 가능</span>
                    <span className="font-medium">
                      {campaign.maxParticipants - campaign.participants}명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetail;
