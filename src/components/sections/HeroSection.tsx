import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-ai-purple/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ai-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm bg-gradient-ai text-white border-0 animate-glow">
            <Sparkles className="w-4 h-4 mr-2" />
            AI 기반 스마트 매칭 플랫폼
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            AI가 연결하는<br />
            <span className="bg-gradient-ai bg-clip-text text-transparent">
              스마트 마케팅
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            광고주와 마케터를 AI로 지능적으로 매칭하여<br />
            <strong className="text-foreground">데이터 기반의 예측 가능한 성과 마케팅</strong>을 실현합니다
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">2,000+</span> 활성 마케터
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="font-semibold text-foreground">300%</span> 평균 ROI
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-warning" />
              <span className="font-semibold text-foreground">90%</span> AI 정확도
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/signup">
              <Button size="xl" variant="ai" className="group px-8">
                지금 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="xl" variant="outline" className="px-8">
                작동 원리 보기
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            <div className="text-sm text-muted-foreground">신뢰받는 파트너사</div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                Toss
              </div>
              <div className="w-20 h-8 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                Google
              </div>
              <div className="w-20 h-8 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                Supabase
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;