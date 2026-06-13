"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { loginAPI } from "@/apis/auth";
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { loginSchema } from "@/schema/auth.schema";



type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await loginAPI(data);
      if (res.success && res.data) {
        login(res.data);
      } else {
        setServerError(res.message || "Invalid credentials");
      }
    } catch (err: any) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Left side - Login Form */}
      <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10 bg-zinc-950/80 backdrop-blur-md">
        {/* Subtle decorative glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-lg font-semibold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent uppercase font-sans">
            ApexResume
          </span>
        </div>

        <div className="my-auto py-12 max-w-md w-full mx-auto">
          <h2 className="text-3xl font-light tracking-tight text-white mb-2">
            Welcome back
          </h2>
          <p className="text-zinc-400 font-light mb-8">
            Access your premium resume crafting suite
          </p>

          {serverError && (
            <div className="mb-6 p-4 uppercase rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 text-sm font-light">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-400 font-light block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/50 border ${
                    errors.email ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-amber-500/50"
                  } rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 font-light mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest text-zinc-400 font-light block">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/50 border ${
                    errors.password ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-amber-500/50"
                  } rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-light mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-600 hover:to-amber-400 text-zinc-950 font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500 font-light">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-amber-400 hover:text-amber-300 font-normal transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-xs text-zinc-600 font-light tracking-wide">
          © {new Date().getFullYear()} ApexResume. Designed for excellence.
        </div>
      </div>

      {/* Right side - Luxury showcase with premium image */}
      <div className="hidden lg:col-span-7 lg:block relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          alt="Premium abstract artwork"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-10000 ease-out"
        />

        <div className="absolute bottom-16 left-16 right-16 z-20 max-w-lg">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-md">
            AI-POWERED OPTIMIZATION
          </span>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white mt-6 mb-4 leading-tight">
            Craft a resume that <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">commands</span> attention.
          </h1>
          <p className="text-zinc-300 font-light leading-relaxed">
            Join thousands of professionals securing interviews at top-tier organizations using our luxury resume layouts and real-time AI optimization tools.
          </p>
        </div>
      </div>
    </div>
  );
}