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
    <div className="min-h-screen bg-white font-sans text-[#333]">
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
          className="py-8 md:py-12 bg-white"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-4">
                <span className="inline-block py-1 px-2 rounded bg-[#29A9FF]/10 text-[#29A9FF] text-xs font-semibold">
                  About SpeakerDrive
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-[#333]">
                Welcome To SpeakerDrive
              </h1>
              <h2 className="text-base md:text-lg text-[#555] mb-6 max-w-2xl mx-auto">
                Empower every expert to predictably control their{" "}
                <span className="font-bold">OWN</span> client acquisition.
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <Link
                  href="https://app.speakerdrive.com/signup"
                  className="inline-flex items-center justify-center rounded bg-[#29A9FF] hover:bg-[#29A9FF]/90 text-white px-5 py-2 text-sm md:text-base font-bold transition-all shadow hover:shadow-md transform hover:-translate-y-1 duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <p className="text-xs md:text-sm text-[#555]">
                No credit card needed. Cancel anytime.
              </p>
            </div>

            {/* Scroll Down Indicator */}
            <div className="flex justify-center mt-6">
              <div className="group animate-bounce p-2 w-10 h-10 rounded-full border border-[#ddd] flex items-center justify-center cursor-pointer hover:border-[#29A9FF] transition-all duration-300">
                <ChevronDown className="h-4 w-4 text-[#999] group-hover:text-[#29A9FF] transition-colors duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section
          ref={(el) => registerSection("founder", el)}
          className="py-8 bg-white"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-8">
              {/* Left side: image + quote */}
              <div className="w-full md:w-1/2">
                <div className="max-w-md mx-auto mb-4 md:mb-6 rounded-lg overflow-hidden transform transition-transform hover:scale-[1.02] duration-300">
                  <img
                    src="/austin_benton_headshot.png"
                    alt="Austin Benton, Founder of SpeakerDrive"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>

                {/* "I believe..." quote block */}
                <div className="relative bg-white p-4 rounded-lg shadow-sm border-l-2 border-[#29A9FF] transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                    <Award className="w-4 h-4 text-[#29A9FF]" />
                  </div>
                  <p className="text-sm md:text-base italic font-medium text-[#555] leading-normal">
                    “I believe every expert deserves predictable growth. That&apos;s why I
                    built SpeakerDrive – to help talented professionals take control of their
                    business development and create the impact they were meant to make.”
                  </p>
                </div>
              </div>

              {/* Right side: text + link */}
              <div className="w-full md:w-1/2">
                <span className="inline-block py-1 px-2 mb-3 rounded bg-[#f5f5f5] text-[#666] text-xs font-semibold">
                  Our Story
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3 text-[#333]">
                  Meet Austin, <br />
                  The Founder
                </h2>
                <div className="w-16 h-1 bg-[#e0e0e0] rounded-full mb-4"></div>

                <p className="text-sm md:text-base leading-normal mb-3 text-[#555]">
                  Hi, I&apos;m Austin, founder of SpeakerDrive. I&apos;m a husband,
                  father of two, and I&apos;ve built my career helping experts succeed in
                  the speaking industry.
                </p>
                <p className="text-sm md:text-base leading-normal mb-4 text-[#555]">
                  After years of seeing talented speakers struggle with business
                  development, I created SpeakerDrive to solve the biggest challenge in
                  the industry: finding consistent opportunities.
                </p>

                <div className="mt-2">
                  <a
                    href="https://austinbenton.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center text-[#0058B2] hover:text-[#29A9FF] font-semibold text-sm md:text-base transition-all duration-300"
                  >
                    Learn more about Austin
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section
          ref={(el) => registerSection("origin", el)}
          className="py-8 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="inline-block py-1 px-2 mb-3 rounded bg-[#f5f5f5] text-[#666] text-xs font-semibold">
                Our Beginning
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3 text-[#333]">
                Why SpeakerDrive Exists
              </h2>
              <div className="mx-auto rounded-full mb-4 w-16 h-1 bg-[#e0e0e0]"></div>
              <p className="text-sm md:text-base text-[#555] leading-normal">
                From firsthand experience in the professional speaking industry,
                we identified the key challenge experts face.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Card */}
              <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-[#e5e5e5] hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] relative group">
                <div className="absolute top-0 left-0 w-16 h-1 bg-[#29A9FF] rounded-br-lg"></div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#333] group-hover:text-[#29A9FF] transition-colors duration-300">
                  The Challenge
                </h3>
                <div className="space-y-3 text-sm md:text-base text-[#555] leading-normal">
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

              {/* Right Card */}
              <div className="p-4 md:p-5 rounded-lg shadow-sm text-white transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#29A9FF] z-0"></div>
                <div className="relative z-20">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <TargetIcon className="w-4 h-4 text-white" />
                    </div>
                    The Solution
                  </h3>
                  <p className="mb-4 text-sm md:text-base leading-normal">
                    I created SpeakerDrive as the tool I wished existed – empowering
                    experts to proactively drive their own business development with direct
                    access to decision-makers.
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      "Targeted lead discovery",
                      "Decision-maker contact data",
                      "Event qualification tools",
                      "Outreach templates",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-sm md:text-base">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/"
                    className="inline-flex items-center bg-white/10 hover:bg-white/20 py-2 px-3 rounded text-xs md:text-sm font-medium transition-all duration-300 group"
                  >
                    See how it works
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
          REMOVED the "Our Mission" section entirely as previously requested
        */}

        {/* Values Section */}
        <section
          ref={(el) => registerSection("values", el)}
          className="py-8 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-8">
              <span className="inline-block py-1 px-2 mb-3 rounded bg-[#f5f5f5] text-[#666] text-xs font-semibold">
                What We Stand For
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3 text-[#333]">
                Our Core Values
              </h2>
              <div className="mx-auto rounded-full mb-4 w-16 h-1 bg-[#e0e0e0]"></div>
              <p className="text-sm md:text-base text-[#555] max-w-3xl mx-auto leading-normal">
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
                  className="bg-white p-4 md:p-5 rounded-lg shadow-sm border border-[#e5e5e5] hover:shadow-md transition-all duration-300 group transform hover:scale-[1.02]"
                  style={{ borderTop: `3px solid ${value.color}` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "#f5f5f5" }}
                    >
                      <value.icon className="w-5 h-5" style={{ color: value.color }} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[#29A9FF]">
                        {value.title}
                      </h3>
                      <div
                        className="w-12 h-1 mb-2 transition-all duration-300 group-hover:w-20"
                        style={{ background: value.color }}
                      ></div>
                      <p className="text-sm md:text-base text-[#555] leading-normal">
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
          className="py-8 text-[#333] bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center leading-snug">
              Ready to take control of your <br />
              business development?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://app.speakerdrive.com/signup"
                className="inline-flex items-center justify-center rounded bg-[#29A9FF] text-white hover:bg-[#29A9FF]/90 px-5 py-2 text-sm md:text-base font-bold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1"
              >
                Start Free Trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <a
                href="https://www.speakerdrive.com/contact"
                className="inline-flex items-center text-sm md:text-base font-medium transition-all duration-300 text-[#333] hover:text-[#29A9FF] group"
              >
                Questions? Contact us
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            <p className="text-xs md:text-sm text-[#666] mt-3 text-center">
              No credit card needed. Cancel anytime.
            </p>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
