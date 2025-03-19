"use client";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import {
  ArrowRight,
  Heart,
  Users,
  Target as TargetIcon,
  ChevronDown,
  Check,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      Object.keys(sectionRefs.current).forEach((section) => {
        const element = sectionRefs.current[section];
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const registerSection = (id, element) => {
    sectionRefs.current[id] = element;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333333]">
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive Logo"
            className="h-8"
            width="180"
            height="32"
          />
        }
        links={[
          { label: "Features", href: "/" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "https://www.speakerdrive.com/contact" },
        ]}
      />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section
          ref={(el) => registerSection("hero", el)}
          className="bg-white pt-28 md:pt-32 pb-16"
        >
          <div className="container mx-auto max-w-4xl px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-block py-1 px-3 rounded-full bg-[#29A9FF]/10 text-[#29A9FF] text-sm font-semibold">
                  About SpeakerDrive
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-[#333333]">
                Welcome To SpeakerDrive
              </h1>
              <h2 className="text-lg md:text-xl leading-relaxed text-[#555] mb-8 max-w-2xl mx-auto">
                Our mission: to empower every expert to predictably control their{" "}
                <span className="font-bold">OWN</span> client acquisition.
              </h2>
            </div>

            {/* Scroll Down Indicator (optional) */}
            <div className="flex justify-center mt-8">
              <div className="group animate-bounce p-3 w-12 h-12 rounded-full border border-[#ddd] flex items-center justify-center cursor-pointer hover:border-[#29A9FF] transition-all duration-300">
                <ChevronDown className="h-6 w-6 text-[#999] group-hover:text-[#29A9FF] transition-colors duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section
          ref={(el) => registerSection("founder", el)}
          className="py-16 bg-white"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-8 md:gap-12">
              {/* Left side: image + quote */}
              <div className="md:w-1/2 flex flex-col items-center md:items-start">
                {/* Wrapper to fade bottom of the image */}
                <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl transform transition-transform hover:scale-[1.02] duration-500">
                  <img
                    src="/austin_benton_headshot.png"
                    alt="Austin Benton, Founder of SpeakerDrive"
                    className="w-full"
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                  {/* Gradient fade at the bottom of the image */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Move the quote up behind the image so it "rests" on it */}
                <div className="relative bg-white p-6 rounded-xl shadow-md border-l-2 border-[#29A9FF] transform hover:scale-[1.02] transition-all duration-300 -mt-8 w-full max-w-md">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5 text-[#29A9FF]" />
                  </div>
                  <p className="text-base italic font-medium text-[#555] leading-relaxed">
                    "I believe every expert deserves predictable growth. That&apos;s why I built
                    SpeakerDrive – to help talented professionals take control of their business
                    development and create the impact they were meant to make."
                  </p>
                </div>
              </div>

              {/* Right side: text + link */}
              <div className="md:w-1/2">
                <div className="relative mb-6">
                  <span className="inline-block py-1 px-3 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                    Our Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#333333]">
                    Meet Austin, <br />
                    The Founder
                  </h2>
                  <div className="w-20 h-1 bg-[#e0e0e0] rounded-full mb-6"></div>
                </div>
                <p className="text-base leading-relaxed mb-4 text-[#555]">
                  Hi, I&apos;m Austin, founder of SpeakerDrive. I&apos;m a husband, father
                  of two, and I&apos;ve built my career helping experts succeed in the
                  speaking industry.
                </p>
                <p className="text-base leading-relaxed mb-6 text-[#555]">
                  After years of seeing talented speakers struggle with business development,
                  I created SpeakerDrive to solve the biggest challenge in the industry:
                  finding consistent opportunities.
                </p>

                <div className="mt-4">
                  <a
                    href="https://austinbenton.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center text-[#0058B2] hover:text-[#29A9FF] font-semibold transition-all duration-300"
                  >
                    Learn more about Austin
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section
          ref={(el) => registerSection("origin", el)}
          className="py-16 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block py-1 px-3 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                Our Beginning
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#333333]">
                Why SpeakerDrive Exists
              </h2>
              <div className="mx-auto rounded-full mb-4 w-20 h-1 bg-[#e0e0e0]"></div>
              <p className="text-base text-[#555]">
                From firsthand experience in the professional speaking industry,
                we identified the key challenge experts face.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {/* Left Card (Challenge) */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e5e5] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] relative group">
                <div className="absolute top-0 left-0 w-20 h-1 bg-[#29A9FF] rounded-br-lg"></div>
                <h3 className="text-2xl font-bold mb-4 text-[#333] group-hover:text-[#29A9FF] transition-colors duration-300">
                  The Challenge
                </h3>
                <div className="space-y-4 text-[#555] text-base leading-relaxed">
                  <p>
                    Many talented professionals struggle with business development not
                    because of a lack of skill, but due to inconsistent lead generation.
                  </p>
                  <p>
                    The traditional model relies heavily on referrals and existing
                    networks, which creates unpredictable income and growth cycles.
                  </p>
                  <p>
                    Without a reliable way to find new opportunities, even the most
                    talented speakers are left waiting for the phone to ring.
                  </p>
                </div>
              </div>

              {/* Right Card (Solution) */}
              <div className="p-4 rounded-xl shadow-md text-white transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#0058B2] z-0"></div>
                <div className="relative z-20">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <TargetIcon className="w-5 h-5 text-white" />
                    </div>
                    The Solution
                  </h3>
                  <p className="mb-6 text-base leading-relaxed">
                    I created SpeakerDrive as the tool I wished existed – empowering
                    experts to proactively drive their own business development with
                    direct access to decision-makers.
                  </p>
                  <div className="space-y-3 mb-6 text-base">
                    {[
                      "Targeted lead discovery",
                      "Decision-maker contact data",
                      "Event qualification tools",
                      "Outreach templates",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={(el) => registerSection("values", el)}
          className="py-16 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#333333]">
                Our Core Values
              </h2>
              <div className="mx-auto rounded-full mb-6 w-20 h-1 bg-[#e0e0e0]"></div>
              <p className="text-base text-[#555] max-w-3xl mx-auto">
                These principles guide everything we do at SpeakerDrive, from product
                development to customer support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  title: "Obsessed With Success",
                  description:
                    "Your growth and independence are our driving force. We measure our success by your ability to consistently generate new opportunities.",
                  icon: TargetIcon,
                  color: "#29A9FF",
                },
                {
                  title: "Personal Touch, Real Results",
                  description:
                    "We're a tight-knit team that treats you like family, not just another ticket. Real support from people who understand your business.",
                  icon: Heart,
                  color: "#00C853",
                },
                {
                  title: "Consistency Over Perfection",
                  description:
                    "Small, consistent actions win the day over sporadic perfection. This guides our product development and the advice we give to users.",
                  icon: ArrowRight,
                  color: "#29A9FF",
                },
                {
                  title: "Transparency and Honesty",
                  description:
                    "We're upfront about what works and what doesn't, setting realistic expectations every step of the way.",
                  icon: Users,
                  color: "#00C853",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-lg border border-[#e5e5e5] hover:shadow-xl transition-all duration-500 group transform hover:scale-[1.02]"
                  style={{ borderTop: `3px solid ${value.color}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "#f5f5f5" }}
                    >
                      <value.icon className="w-6 h-6" style={{ color: value.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[#29A9FF]">
                        {value.title}
                      </h3>
                      <div
                        className="w-16 h-1 mb-3 transition-all duration-300 group-hover:w-24"
                        style={{ background: value.color }}
                      ></div>
                      <p className="leading-relaxed text-base text-[#555]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={(el) => registerSection("cta", el)}
          className="py-16 text-[#333333] bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-4xl px-6 relative z-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to take control of your <br />
              business development?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://www.speakerdrive.com/contact"
                className="inline-flex items-center font-medium transition-all duration-300 text-[#333333] hover:text-[#29A9FF] group"
              >
                Questions? Contact us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* CSS for animations (optional) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-textReveal {
          animation: textReveal 1s ease-out forwards;
        }
      `}</style>

      <Footer5 />
    </div>
  );
}
