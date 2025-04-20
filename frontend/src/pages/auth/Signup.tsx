import { HandCoins } from "lucide-react";
import mt from "../../assets/mountain.mp4";
import { motion } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-xs"
          >
            <SignUpForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
