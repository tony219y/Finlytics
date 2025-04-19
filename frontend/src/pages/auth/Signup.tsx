import { HandCoins } from "lucide-react";
import mt from "../../assets/mountain.mp4";

import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUp() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/70 z-[1]" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={mt} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0c]/70 to-[#0a0a0c] z-[2]" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HandCoins className="size-4" />
            </div>
            Finlytics
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
