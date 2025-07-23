import Navbar from "@/components/layout/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground">프로필</h1>
          <p className="text-muted-foreground">프로필 페이지 구현 예정</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;