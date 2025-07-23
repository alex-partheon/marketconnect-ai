import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "2,000+",
      label: "활성 마케터",
      description: "검증된 마케터들이 활동 중",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "300%",
      label: "평균 ROI",
      description: "광고주 평균 투자 수익률",
      color: "text-success"
    },
    {
      icon: DollarSign,
      value: "1,500만원",
      label: "월 거래액",
      description: "플랫폼 월 평균 거래 규모",
      color: "text-warning"
    },
    {
      icon: Zap,
      value: "90%",
      label: "AI 정확도",
      description: "미션 검증 AI 정확도",
      color: "text-ai-purple"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-ai-purple/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            숫자로 보는 <span className="bg-gradient-ai bg-clip-text text-transparent">성과</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            신뢰할 수 있는 데이터 기반 성과를 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 border-border/50 hover:border-primary/20 hover:shadow-ai">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br from-background to-muted mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;