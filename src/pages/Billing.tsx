
import { useState } from "react";
import { 
  CreditCard, 
  Plus, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  History,
  Receipt
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Billing = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isChargeDialogOpen, setIsChargeDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data
  const userBalance = {
    currentBalance: 150000,
    pendingBalance: 25000,
    totalEarned: 1250000,
    totalSpent: 800000
  };

  const quickChargeAmounts = [10000, 50000, 100000, 500000];

  const transactions = [
    {
      id: 1,
      type: "charge",
      amount: 100000,
      description: "크레딧 충전",
      date: "2024-01-20",
      status: "completed",
      method: "카드결제"
    },
    {
      id: 2,
      type: "campaign",
      amount: -50000,
      description: "신제품 인스타그램 리뷰 캠페인",
      date: "2024-01-19",
      status: "completed",
      method: "캠페인"
    },
    {
      id: 3,
      type: "reward",
      amount: 25000,
      description: "카페 방문 인증 미션 완료",
      date: "2024-01-18",
      status: "completed",
      method: "미션 완료"
    },
    {
      id: 4,
      type: "withdrawal",
      amount: -75000,
      description: "계좌 출금",
      date: "2024-01-17",
      status: "processing",
      method: "은행 송금"
    },
    {
      id: 5,
      type: "charge",
      amount: 50000,
      description: "크레딧 충전",
      date: "2024-01-15",
      status: "completed",
      method: "카드결제"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "card",
      name: "신한카드",
      number: "**** **** **** 1234",
      isDefault: true
    },
    {
      id: 2,
      type: "account",
      name: "국민은행",
      number: "12345-67-890123",
      isDefault: false
    }
  ];

  const handleCharge = (amount: number) => {
    toast({
      title: "충전 완료!",
      description: `${amount.toLocaleString()}원이 충전되었습니다.`,
    });
    setIsChargeDialogOpen(false);
  };

  const handleWithdraw = (amount: number) => {
    toast({
      title: "출금 신청 완료!",
      description: `${amount.toLocaleString()}원 출금 신청이 접수되었습니다.`,
    });
    setIsWithdrawDialogOpen(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "charge":
        return <ArrowDownRight className="w-4 h-4 text-green-600" />;
      case "reward":
        return <ArrowDownRight className="w-4 h-4 text-green-600" />;
      case "campaign":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      default:
        return <ArrowDownRight className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완료";
      case "processing":
        return "처리중";
      case "failed":
        return "실패";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">결제 관리</h1>
              <p className="text-muted-foreground mt-1">크레딧 충전, 출금, 거래 내역을 관리하세요</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isChargeDialogOpen} onOpenChange={setIsChargeDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ai" className="gap-2">
                    <Plus className="w-4 h-4" />
                    크레딧 충전
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>크레딧 충전</DialogTitle>
                    <DialogDescription>
                      충전할 금액을 선택하거나 직접 입력하세요
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {quickChargeAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          onClick={() => setSelectedAmount(amount)}
                        >
                          {amount.toLocaleString()}원
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">직접 입력</label>
                      <Input
                        type="number"
                        placeholder="금액을 입력하세요"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => handleCharge(selectedAmount || Number(customAmount))}
                      className="w-full"
                      disabled={!selectedAmount && !customAmount}
                    >
                      충전하기
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    출금 신청
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>출금 신청</DialogTitle>
                    <DialogDescription>
                      출금할 금액을 입력하세요 (최소 10,000원)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-3 bg-card rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>출금 가능 금액</span>
                        <span className="font-medium">{userBalance.currentBalance.toLocaleString()}원</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">출금 금액</label>
                      <Input
                        type="number"
                        placeholder="출금할 금액을 입력하세요"
                        min="10000"
                        max={userBalance.currentBalance}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">출금 계좌</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="계좌를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account1">국민은행 12345-67-890123</SelectItem>
                          <SelectItem value="account2">신한은행 98765-43-210987</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => handleWithdraw(50000)}
                      className="w-full"
                    >
                      출금 신청
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">현재 잔액</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userBalance.currentBalance.toLocaleString()}원</div>
                <p className="text-xs text-muted-foreground">출금 가능 금액</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">대기 중인 금액</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userBalance.pendingBalance.toLocaleString()}원</div>
                <p className="text-xs text-muted-foreground">정산 대기</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 수익</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userBalance.totalEarned.toLocaleString()}원</div>
                <p className="text-xs text-muted-foreground">누적 수익</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 지출</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userBalance.totalSpent.toLocaleString()}원</div>
                <p className="text-xs text-muted-foreground">누적 지출</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">거래 내역</TabsTrigger>
              <TabsTrigger value="payments">결제 수단</TabsTrigger>
              <TabsTrigger value="reports">정산 보고서</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    거래 내역
                  </CardTitle>
                  <CardDescription>
                    모든 크레딧 충전, 사용, 출금 내역을 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                            {getStatusText(transaction.status)}
                          </Badge>
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    결제 수단
                  </CardTitle>
                  <CardDescription>
                    등록된 결제 수단을 관리하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.number}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Badge variant="secondary">기본</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            편집
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="w-4 h-4" />
                      새 결제 수단 추가
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    정산 보고서
                  </CardTitle>
                  <CardDescription>
                    월별 수익 및 지출 현황을 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Monthly Reports */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">1월</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">수익</span>
                              <span className="font-medium text-green-600">+125,000원</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">지출</span>
                              <span className="font-medium text-red-600">-50,000원</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="text-sm font-medium">순수익</span>
                              <span className="font-medium">+75,000원</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">12월</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">수익</span>
                              <span className="font-medium text-green-600">+200,000원</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">지출</span>
                              <span className="font-medium text-red-600">-80,000원</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="text-sm font-medium">순수익</span>
                              <span className="font-medium">+120,000원</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">11월</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">수익</span>
                              <span className="font-medium text-green-600">+150,000원</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">지출</span>
                              <span className="font-medium text-red-600">-60,000원</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="text-sm font-medium">순수익</span>
                              <span className="font-medium">+90,000원</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        전체 보고서 다운로드
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Billing;
