import AuthComponent from "@/components/AuthComponent";

export default function SignIn() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#afa3ff] h-screen w-screen flex justify-center items-center">
      <AuthComponent authType="SignIn" />
    </div>
  );
}
