import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Target, 
  Zap, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const HowItWorksSection = () => {
  const advertiserSteps = [
    {
      step: "01",
      icon: UserPlus,
      title: "가입 및 프로필 설정",
      description: "간단한 소셜 로그인으로 가입하고 비즈니스 정보를 입력하세요",
      duration: "5분"
    },
    {
      step: "02",
      icon: Target,
      title: "캠페인 생성",
      description: "목표, 예산, 타겟을 설정하고 AI가 최적의 마케터를 추천받으세요",
      duration: "10분"
    },
    {
      step: "03",
      icon: Zap,
      title: "실시간 모니터링",
      description: "캠페인 진행 상황을 실시간으로 확인하고 성과를 추적하세요",
      duration: "지속"
    },
    {
      step: "04",
      icon: TrendingUp,
      title: "성과 분석",
      description: "상세한 ROI 분석과 인사이트로 다음 캠페인을 개선하세요",
      duration: "캠페인 종료 후"
    }
  ];

  const marketerSteps = [
    {
      step: "01",
      icon: UserPlus,
      title: "프로필 등록",
      description: "소셜미디어 연동하고 전문 분야와 경험을 등록하세요",
      duration: "10분"
    },
    {
      step: "02",
      icon: Target,
      title: "캠페인 참여",
      description: "AI 추천 캠페인 중에서 관심 있는 미션을 선택하고 참여하세요",
      duration: "5분"
    },
    {
      step: "03",
      icon: Zap,
      title: "미션 수행",
      description: "가이드라인에 따라 미션을 수행하고 증빙 자료를 제출하세요",
      duration: "10-30분"
    },
    {
      step: "04",
      icon: TrendingUp,
      title: "수익 정산",
      description: "AI 검증 후 자동 승인되고 크레딧이 적립됩니다",
      duration: "실시간"
    }
  ];

  const benefits = [
    "AI 기반 스마트 매칭으로 95% 높은 성공률",
    "실시간 성과 추적과 투명한 결과 제공",
    "안전한 에스크로 결제 시스템",
    "다단계 추천으로 추가 수익 기회"
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            이용 방법
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-ai bg-clip-text text-transparent">간단한 4단계</span>로<br />
            시작하세요
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            광고주든 마케터든, 몇 분만에 시작할 수 있습니다
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Advertiser Journey */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">광</span>
              </div>
              광고주 여정
            </h3>
            <div className="space-y-6">
              {advertiserSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-ai transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-ai rounded-lg flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="secondary" className="text-xs font-mono">
                              STEP {step.step}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{step.duration}</span>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {step.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < advertiserSteps.length - 1 && (
                    <div className="absolute -bottom-3 left-6 w-0.5 h-6 bg-gradient-ai opacity-30" />
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Marketer Journey */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-ai-purple to-ai-cyan rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">마</span>
              </div>
              마케터 여정
            </h3>
            <div className="space-y-6">
              {marketerSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-ai transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-ai-purple to-ai-cyan rounded-lg flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="secondary" className="text-xs font-mono">
                              STEP {step.step}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{step.duration}</span>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {step.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < marketerSteps.length - 1 && (
                    <div className="absolute -bottom-3 left-6 w-0.5 h-6 bg-gradient-to-b from-ai-purple to-ai-cyan opacity-30" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-muted/50 to-ai-purple/5 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            왜 AI Marketing Connect를 선택해야 할까요?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            준비되셨나요? 지금 바로 시작해보세요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="ai" className="group px-8">
              광고주로 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="px-8">
              마케터로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;