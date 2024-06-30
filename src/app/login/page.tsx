
import Link from "next/link";
import { LoginForm } from "./LoginForm";
 
export default function LoginPage() {

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-4">
      <div className="w-full p-6 bg-white rounded-md shadow-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Colmenas</h1>
        <LoginForm />
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
