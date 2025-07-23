
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  User, 
  Edit, 
  Save, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  TrendingUp,
  Users,
  Target,
  Instagram,
  Youtube,
  Twitter,
  Link as LinkIcon
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다").max(50, "이름은 50글자 이하여야 합니다"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  phone: z.string().optional(),
  bio: z.string().max(500, "자기소개는 500글자 이하여야 합니다").optional(),
  location: z.string().max(100, "지역은 100글자 이하여야 합니다").optional(),
  categories: z.array(z.string()).optional(),
  instagramUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  // Mock user data
  const userData = {
    id: 1,
    name: "김마케터",
    email: "kim.marketer@example.com",
    phone: "010-1234-5678",
    bio: "뷰티와 라이프스타일 분야에서 활동하는 마케터입니다. 진정성 있는 리뷰와 콘텐츠로 많은 분들과 소통하고 있습니다.",
    location: "서울시 강남구",
    avatar: "/placeholder.svg",
    role: "marketer",
    tier: "Gold",
    joinDate: "2023-06-15",
    categories: ["뷰티", "라이프스타일", "패션"],
    socialLinks: {
      instagram: "https://instagram.com/kim.marketer",
      youtube: "https://youtube.com/c/kimmarketer",
      twitter: "https://twitter.com/kimmarketer",
      website: "https://kimmarketer.blog"
    },
    stats: {
      totalCampaigns: 24,
      completedCampaigns: 22,
      totalEarnings: 1250000,
      averageRating: 4.8,
      followers: 15200
    },
    recentActivity: [
      { id: 1, type: "campaign_completed", title: "신제품 인스타그램 리뷰", date: "2024-01-20", reward: 50000 },
      { id: 2, type: "campaign_completed", title: "카페 방문 인증", date: "2024-01-18", reward: 25000 },
      { id: 3, type: "campaign_participated", title: "온라인 쇼핑몰 체험", date: "2024-01-15", reward: 15000 }
    ]
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      bio: userData.bio,
      location: userData.location,
      categories: userData.categories,
      instagramUrl: userData.socialLinks.instagram,
      youtubeUrl: userData.socialLinks.youtube,
      twitterUrl: userData.socialLinks.twitter,
      websiteUrl: userData.socialLinks.website,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "프로필이 업데이트되었습니다!",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "프로필 업데이트에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const categories = [
    "뷰티", "패션", "음식", "여행", "건강", "라이프스타일", "기술", "교육", "문화", "스포츠"
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze": return "bg-amber-600";
      case "Silver": return "bg-gray-400";
      case "Gold": return "bg-yellow-500";
      case "Platinum": return "bg-purple-600";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-lg">
                        {userData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="mt-4">{userData.name}</CardTitle>
                  <CardDescription>
                    <Badge className={`${getTierColor(userData.tier)} text-white`}>
                      {userData.tier} 마케터
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(userData.joinDate).toLocaleDateString()} 가입
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">전문 분야</h4>
                    <div className="flex flex-wrap gap-1">
                      {userData.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">소셜 링크</h4>
                    <div className="flex gap-2">
                      {userData.socialLinks.instagram && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Instagram className="w-4 h-4" />
                        </Button>
                      )}
                      {userData.socialLinks.youtube && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Youtube className="w-4 h-4" />
                        </Button>
                      )}
                      {userData.socialLinks.twitter && (
                        <Button size="sm" variant="outline" className="p-2">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                      {userData.socialLinks.website && (
                        <Button size="sm" variant="outline" className="p-2">
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>성과 요약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">총 수익</span>
                    <span className="font-medium">
                      {userData.stats.totalEarnings.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">완료 캠페인</span>
                    <span className="font-medium">
                      {userData.stats.completedCampaigns}개
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">평균 평점</span>
                    <span className="font-medium">
                      {userData.stats.averageRating}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">팔로워</span>
                    <span className="font-medium">
                      {userData.stats.followers.toLocaleString()}명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">프로필</h1>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="gap-2"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  {isEditing ? "저장하기" : "편집하기"}
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">프로필 정보</TabsTrigger>
                  <TabsTrigger value="performance">성과 분석</TabsTrigger>
                  <TabsTrigger value="activity">활동 내역</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>프로필 정보</CardTitle>
                      <CardDescription>
                        개인 정보와 소셜 미디어 계정을 관리하세요
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>이름</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>이메일</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>전화번호</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>지역</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>자기소개</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    disabled={!isEditing}
                                    className="min-h-[100px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="space-y-4">
                            <h3 className="font-medium">소셜 미디어</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="instagramUrl"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>인스타그램</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} placeholder="https://instagram.com/username" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="youtubeUrl"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>유튜브</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} placeholder="https://youtube.com/c/username" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {isEditing && (
                            <div className="flex gap-2">
                              <Button type="submit" className="gap-2">
                                <Save className="w-4 h-4" />
                                저장하기
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                              >
                                취소
                              </Button>
                            </div>
                          )}
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          성과 지표
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">총 참여 캠페인</span>
                          <span className="font-medium">{userData.stats.totalCampaigns}개</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">완료율</span>
                          <span className="font-medium">
                            {Math.round((userData.stats.completedCampaigns / userData.stats.totalCampaigns) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">평균 평점</span>
                          <span className="font-medium">{userData.stats.averageRating}/5.0</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          수익 현황
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">총 수익</span>
                          <span className="font-medium">{userData.stats.totalEarnings.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">평균 캠페인 수익</span>
                          <span className="font-medium">
                            {Math.round(userData.stats.totalEarnings / userData.stats.completedCampaigns).toLocaleString()}원
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">이번 달 수익</span>
                          <span className="font-medium">125,000원</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>최근 활동</CardTitle>
                      <CardDescription>
                        최근 참여한 캠페인과 활동 내역을 확인하세요
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <div className="flex-1">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              +{activity.reward.toLocaleString()}원
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
