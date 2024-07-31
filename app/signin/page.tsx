import AuthComponent from "@/components/AuthComponent";

export default function SignIn() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#afa3ff] h-screen w-screen flex justify-center mt-32">
      <AuthComponent authType="SignIn" />
    </div>
  );
}
