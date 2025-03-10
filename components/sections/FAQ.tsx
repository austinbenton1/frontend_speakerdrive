"use client";
import { ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  title: string;
  value: string;
  content: string;
}

interface FAQProps {
  title: string;
  description: string;
  content: FAQItem[];
}

export function FAQ({ title, description, content }: FAQProps) {
  return (
    <div className="relative mx-auto max-w-xl px-4 py-24 sm:py-40">
      <div className="mb-10 text-left">
        <h2 className="mb-4 text-2xl font-medium text-black">{title}</h2>
        <p className="text-base text-neutral-600">{description}</p>
      </div>
      <Accordion
        className="flex w-full flex-col divide-y divide-neutral-200 border-t border-neutral-200"
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {content.map((item) => (
          <AccordionItem value={item.value} className="py-4" key={item.value}>
            <AccordionTrigger className="w-full text-left text-black">
              <div className="flex items-center justify-between">
                <div>{item.title}</div>
                <ChevronUp className="h-4 w-4 -rotate-180 text-neutral-900 transition-transform duration-200 group-data-[expanded]:rotate-0" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="pt-2 text-neutral-600">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}