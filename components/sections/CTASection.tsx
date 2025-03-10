"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
}

export function CTASection({ title, description }: CTASectionProps) {
  return (
    <div className="px-4 py-24 sm:py-40">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-md bg-brand-green/20 px-1.5 py-0.5 text-sm leading-normal text-brand-green font-medium">
            Get free trial
          </span>
          <div className="flex flex-col gap-2 text-black">
            <h2 className="text-xl text-black">{title}</h2>
            <p className="text-neutral-600">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-200 bg-brand-blue text-white px-3 py-2 text-sm font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Start building
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-3 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-300 transition-colors hover:bg-gradient-to-b hover:from-neutral-100 hover:to-neutral-50"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <p className="text-center text-sm text-neutral-600">
            No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}