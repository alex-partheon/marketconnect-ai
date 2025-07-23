import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  BarChart3,
  Clock,
  DollarSign
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI 스마트 매칭",
      description: "캠페인 특성과 마케터 성과를 분석하여 최적의 매칭을 제공합니다",
      badge: "핵심 기능",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "실시간 성과 추적",
      description: "투명한 캠페인 모니터링과 정확한 ROI 측정으로 데이터 기반 의사결정을 지원합니다",
      badge: "데이터 분석",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "안전한 거래 시스템",
      description: "에스크로 방식의 안전한 결제와 정산으로 신뢰할 수 있는 거래를 보장합니다",
      badge: "보안",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "추천 네트워크",
      description: "다단계 추천 시스템으로 마케터 네트워크를 확장하고 추가 수익을 창출하세요",
      badge: "수익 확장",
      color: "text-ai-purple"
    },
    {
      icon: Target,
      title: "정확한 타겟팅",
      description: "AI 분석을 통해 캠페인에 가장 적합한 마케터를 자동으로 추천합니다",
      badge: "AI 추천",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "빠른 검증 시스템",
      description: "Google Gemini AI를 활용한 자동 검증으로 빠르고 정확한 미션 승인을 제공합니다",
      badge: "자동화",
      color: "text-success"
    },
    {
      icon: DollarSign,
      title: "투명한 수익 구조",
      description: "명확한 수수료 체계와 실시간 정산으로 예측 가능한 수익을 보장합니다",
      badge: "투명성",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "성장 지원 도구",
      description: "마케터 성과 분석과 개선 제안으로 지속적인 성장을 지원합니다",
      badge: "성장 도구",
      color: "text-ai-cyan"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            주요 기능
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            AI가 만드는 <span className="bg-gradient-ai bg-clip-text text-transparent">스마트한 마케팅</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            첨단 AI 기술과 투명한 시스템으로 광고주와 마케터 모두에게 최적의 가치를 제공합니다
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-background to-muted ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            더 많은 기능이 궁금하신가요?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/how-it-works" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              작동 원리 자세히 보기
            </a>
            <a 
              href="/demo" 
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              데모 체험하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;