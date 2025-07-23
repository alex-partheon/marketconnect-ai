import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const RoleSelection = () => {
  const advertiserFeatures = [
    "AI 기반 마케터 추천",
    "실시간 캠페인 모니터링",
    "투명한 성과 측정",
    "안전한 에스크로 결제",
    "ROI 분석 도구"
  ];

  const marketerFeatures = [
    "다양한 캠페인 참여",
    "AI 자동 검증 시스템",
    "즉시 크레딧 적립",
    "다단계 추천 수익",
    "성장 지원 도구"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-ai-purple/5">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ai-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-gradient-ai text-white border-0">
            <Zap className="w-4 h-4 mr-2" />
            역할 선택
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            어떤 역할로 <span className="bg-gradient-ai bg-clip-text text-transparent">시작</span>하시겠어요?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            광고주와 마케터 모두 환영합니다. 언제든지 역할 전환이 가능합니다.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Advertiser Card */}
          <Card className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/30 hover:shadow-ai relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-ai rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="text-primary border-primary/20">
                  비즈니스
                </Badge>
              </div>
              
              <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                광고주
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                검증된 마케터들과 함께 효과적인 마케팅 캠페인을 실행하고 
                투명한 성과를 확인하세요
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">300%</div>
                  <div className="text-xs text-muted-foreground">평균 ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">2,000+</div>
                  <div className="text-xs text-muted-foreground">활성 마케터</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">90%</div>
                  <div className="text-xs text-muted-foreground">성공률</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">주요 기능</h4>
                {advertiserFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-primary/5 to-ai-purple/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">시작 비용</div>
                    <div className="text-lg font-bold text-foreground">무료</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">수수료</div>
                    <div className="text-lg font-bold text-foreground">5%</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link to="/advertiser/dashboard">
                <Button size="lg" variant="ai" className="w-full group">
                  광고주로 시작하기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Marketer Card */}
          <Card className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-ai-purple/30 hover:shadow-ai relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ai-purple/10 to-transparent rounded-bl-full" />
            
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-ai-purple to-ai-cyan rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <Badge variant="outline" className="text-ai-purple border-ai-purple/20">
                  크리에이터
                </Badge>
              </div>
              
              <CardTitle className="text-2xl mb-2 group-hover:text-ai-purple transition-colors">
                마케터
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                당신의 영향력을 활용해 다양한 캠페인에 참여하고 
                안정적인 수익을 창출하세요
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-ai-purple">25만원</div>
                  <div className="text-xs text-muted-foreground">평균 월수익</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">200+</div>
                  <div className="text-xs text-muted-foreground">월 캠페인</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">즉시</div>
                  <div className="text-xs text-muted-foreground">정산</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">주요 기능</h4>
                {marketerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-ai-purple/5 to-ai-cyan/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">가입비</div>
                    <div className="text-lg font-bold text-foreground">무료</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">정산 수수료</div>
                    <div className="text-lg font-bold text-foreground">3%</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link to="/marketer/dashboard">
                <Button size="lg" variant="outline" className="w-full group border-ai-purple/20 hover:border-ai-purple/40 hover:bg-ai-purple/5">
                  마케터로 시작하기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            역할 선택에 고민이 되시나요?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/how-it-works">
              <Button variant="ghost" className="group">
                이용 방법 보기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="group">
                전문가와 상담하기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;