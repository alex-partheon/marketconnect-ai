
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Calendar, DollarSign, Target, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const campaignSchema = z.object({
  title: z.string().min(5, "제목은 5글자 이상이어야 합니다").max(100, "제목은 100글자 이하여야 합니다"),
  description: z.string().min(20, "설명은 20글자 이상이어야 합니다").max(500, "설명은 500글자 이하여야 합니다"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  actionType: z.string().min(1, "액션 유형을 선택해주세요"),
  reward: z.number().min(1000, "보상금은 1,000원 이상이어야 합니다").max(1000000, "보상금은 1,000,000원 이하여야 합니다"),
  maxParticipants: z.number().min(1, "최대 참여자는 1명 이상이어야 합니다").max(1000, "최대 참여자는 1,000명 이하여야 합니다"),
  endDate: z.string().min(1, "마감일을 선택해주세요"),
  targetAudience: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      actionType: "",
      reward: 10000,
      maxParticipants: 10,
      endDate: "",
      targetAudience: "",
      additionalInfo: "",
    },
  });

  const steps = [
    {
      id: 1,
      title: "기본 정보",
      description: "캠페인의 기본 정보를 입력해주세요",
      icon: Target,
    },
    {
      id: 2,
      title: "보상 설정",
      description: "참여자에게 제공할 보상을 설정해주세요",
      icon: DollarSign,
    },
    {
      id: 3,
      title: "일정 및 대상",
      description: "캠페인 일정과 대상을 설정해주세요",
      icon: Calendar,
    },
    {
      id: 4,
      title: "추가 설정",
      description: "기타 설정을 완료해주세요",
      icon: Settings,
    },
  ];

  const actionTypes = [
    { value: "screenshot", label: "스크린샷 인증", description: "특정 화면을 캡처하여 인증" },
    { value: "email_verify", label: "이메일 인증", description: "이메일 주소로 인증" },
    { value: "secret_answer", label: "비밀답변", description: "특정 질문에 대한 답변" },
    { value: "utm", label: "링크 추적", description: "특정 링크 클릭 추적" },
    { value: "affiliate_click", label: "제휴 클릭", description: "제휴 링크 클릭" },
  ];

  const categories = [
    "뷰티", "음식", "쇼핑", "건강", "교육", "여행", "기술", "생활", "문화", "기타"
  ];

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "캠페인이 생성되었습니다!",
        description: "캠페인 검토 후 활성화될 예정입니다.",
      });
      
      navigate("/campaigns");
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "캠페인 생성에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return form.getValues("title") && form.getValues("description") && form.getValues("category");
      case 2:
        return form.getValues("actionType") && form.getValues("reward");
      case 3:
        return form.getValues("endDate") && form.getValues("maxParticipants");
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <div>
              <h1 className="text-3xl font-bold text-foreground">캠페인 생성</h1>
              <p className="text-muted-foreground mt-1">새로운 마케팅 캠페인을 만들어보세요</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border bg-background text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      기본 정보
                    </CardTitle>
                    <CardDescription>
                      캠페인의 제목, 설명, 카테고리를 설정해주세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>캠페인 제목 *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="매력적인 캠페인 제목을 입력해주세요"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>캠페인 설명 *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="참여자들이 이해하기 쉽도록 자세히 설명해주세요"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>카테고리 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="카테고리를 선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Reward Settings */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      보상 설정
                    </CardTitle>
                    <CardDescription>
                      액션 유형과 참여자에게 제공할 보상을 설정해주세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="actionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>액션 유형 *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="액션 유형을 선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {actionTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div>
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-sm text-muted-foreground">{type.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>참여자 보상금 *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="10000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Schedule & Target */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      일정 및 대상
                    </CardTitle>
                    <CardDescription>
                      캠페인 마감일과 참여자 수를 설정해주세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>마감일 *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>최대 참여자 수 *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="10"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>타겟 오디언스 (선택)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="예: 20-30대 여성, 뷰티에 관심 있는 분"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Additional Settings */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      추가 설정
                    </CardTitle>
                    <CardDescription>
                      기타 설정을 완료하고 캠페인을 생성해주세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>추가 정보 (선택)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="참여자들에게 전달하고 싶은 추가 정보가 있다면 입력해주세요"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campaign Summary */}
                    <div className="bg-card p-4 rounded-lg border">
                      <h3 className="font-medium mb-3">캠페인 요약</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">제목:</span>
                          <span className="font-medium">{form.getValues("title") || "미입력"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">카테고리:</span>
                          <Badge variant="secondary">{form.getValues("category") || "미선택"}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">보상금:</span>
                          <span className="font-medium">{form.getValues("reward")?.toLocaleString() || 0}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">최대 참여자:</span>
                          <span className="font-medium">{form.getValues("maxParticipants") || 0}명</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">총 예산:</span>
                          <span className="font-medium text-primary">
                            {((form.getValues("reward") || 0) * (form.getValues("maxParticipants") || 0)).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed(currentStep)}
                    className="gap-2"
                  >
                    다음
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? "생성 중..." : "캠페인 생성"}
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;
