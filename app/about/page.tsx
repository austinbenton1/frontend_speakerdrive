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
  Globe,
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
          { label: "Contact", href: "#contact" },
        ]}
      />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section
          ref={(el) => registerSection("hero", el)}
          className="py-28 md:py-36 bg-white"
        >
          <div className="container mx-auto max-w-5xl px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-8">
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#29A9FF]/10 text-[#29A9FF] text-sm font-semibold">
                  About SpeakerDrive
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-[#333333]">
                Take Control of Your{" "}
                <span className="text-[#29A9FF]">Speaking Career</span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed text-[#555] mb-12 max-w-2xl mx-auto">
                SpeakerDrive is a specialized prospecting platform that gives speakers, coaches, and experts direct access to verified decision-maker contact information. Our database combines event-based engagements like conferences, corporate training opportunities, workshops, consulting engagements and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-[#29A9FF] hover:bg-[#29A9FF]/90 text-white px-8 py-4 text-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-transparent border border-[#29A9FF] text-[#29A9FF] hover:bg-[#29A9FF]/5 px-8 py-4 text-lg font-bold transition-all"
                >
                  See Features
                </Link>
              </div>
              <p className="text-sm text-[#555]">
                No credit card needed. Cancel anytime.
              </p>
            </div>

            {/* Scroll Down Indicator */}
            <div className="flex justify-center mt-20">
              <div className="group animate-bounce p-3 w-12 h-12 rounded-full border border-[#ddd] flex items-center justify-center cursor-pointer hover:border-[#29A9FF] transition-all duration-300">
                <ChevronDown className="h-6 w-6 text-[#999] group-hover:text-[#29A9FF] transition-colors duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section
          ref={(el) => registerSection("founder", el)}
          className="py-28 bg-white"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                  <img
                    src="/austin_benton_headshot.png"
                    alt="Austin Benton, Founder of SpeakerDrive"
                    className="w-full"
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative mb-8">
                  <span className="inline-block py-1.5 px-4 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                    Our Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-[#333333]">
                    Meet Austin, <br />The Founder
                  </h2>
                  <div className="w-24 h-1 bg-[#e0e0e0] rounded-full mb-8"></div>
                </div>
                <p className="text-lg leading-relaxed mb-6 text-[#555]">
                  Hi, I'm Austin, founder of SpeakerDrive. I'm a husband, father of
                  two, and I've built my career helping experts succeed in the
                  speaking industry.
                </p>
                <p className="text-lg leading-relaxed mb-8 text-[#555]">
                  After years of seeing talented speakers struggle with business
                  development, I created SpeakerDrive to solve the biggest
                  challenge in the industry: finding consistent opportunities.
                </p>
                <div className="relative bg-white p-6 rounded-xl shadow-md border-l-2 border-[#29A9FF] transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5 text-[#29A9FF]" />
                  </div>
                  <p className="text-lg italic font-medium text-[#555] leading-relaxed">
                    "I believe every expert deserves predictable growth. That's why
                    I built SpeakerDrive - to help talented professionals take
                    control of their business development and create the impact they
                    were meant to make."
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href="https://austinbenton.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center text-[#29A9FF] hover:text-[#00C853] font-medium transition-all duration-300"
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
          className="py-28 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1.5 px-4 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                Our Beginning
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-[#333333]">
                Why SpeakerDrive Exists
              </h2>
              <div className="mx-auto rounded-full mb-6 w-24 h-1 bg-[#e0e0e0]"></div>
              <p className="text-lg text-[#555]">
                From firsthand experience in the professional speaking industry,
                we identified the key challenge experts face.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Card */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-[#e5e5e5] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] relative group">
                <div className="absolute top-0 left-0 w-20 h-1 bg-[#29A9FF] rounded-br-lg"></div>
                <h3 className="text-2xl font-bold mb-5 text-[#333] group-hover:text-[#29A9FF] transition-colors duration-300">
                  The Challenge
                </h3>
                <div className="space-y-5 text-[#555]">
                  <p className="leading-relaxed">
                    Many talented professionals struggle with business
                    development not because of a lack of skill, but due to
                    inconsistent lead generation.
                  </p>
                  <p className="leading-relaxed">
                    The traditional model relies heavily on referrals and
                    existing networks, which creates unpredictable income and
                    growth cycles.
                  </p>
                  <p className="leading-relaxed">
                    Without a reliable way to find new opportunities, even the
                    most talented speakers are left waiting for the phone to ring.
                  </p>
                </div>
              </div>

              {/* Right Card */}
              <div className="p-8 rounded-xl shadow-md text-white transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#29A9FF] z-0"></div>
                <div className="relative z-20">
                  <h3 className="text-2xl font-bold mb-5 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <TargetIcon className="w-5 h-5 text-white" />
                    </div>
                    The Solution
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed">
                    I created SpeakerDrive as the tool I wished existed – empowering
                    experts to proactively drive their own business development
                    with direct access to decision-makers.
                  </p>
                  <div className="space-y-4 mb-8">
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
                  <Link
                    href="/"
                    className="inline-flex items-center bg-white/10 hover:bg-white/20 py-3 px-5 rounded-lg text-sm font-medium transition-all duration-300 group"
                  >
                    See how it works
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section
          ref={(el) => registerSection("mission", el)}
          className="py-28 bg-white"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 bg-gradient-to-br from-[#29A9FF]/10 to-[#00C853]/10 hover:from-[#29A9FF]/20 hover:to-[#00C853]/20 transition-all duration-300 transform hover:scale-110">
                <Award className="w-8 h-8 text-[#29A9FF]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-[#333333]">
                Our Mission
              </h2>

              <div className="rounded-xl p-12 mb-16 bg-[#f9f9f9] shadow-md transform transition-all hover:scale-[1.02] duration-500 overflow-hidden relative">
                <div className="relative z-30">
                  <p className="text-2xl md:text-3xl font-bold leading-tight text-[#333333]">
                    Empower every expert to predictably control their{" "}
                    <span className="inline-block px-4 py-1 mx-2 rounded-lg font-extrabold bg-[#29A9FF] text-white">
                      OWN
                    </span>{" "}
                    client acquisition.
                  </p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto space-y-6 text-[#555]">
                <p className="text-lg leading-relaxed">
                  We believe every expert should be able to generate their own
                  opportunities, not just rely on referrals and existing networks.
                </p>
                <p className="text-lg leading-relaxed">
                  Breaking free from the referral cycle isn't just possible—it's
                  essential. Every speaker, coach, and trainer deserves the power
                  to proactively build their business and take control of their
                  growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={(el) => registerSection("values", el)}
          className="py-28 bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 mb-4 rounded-full bg-[#f5f5f5] text-[#666] text-sm font-semibold">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-[#333333]">
                Our Core Values
              </h2>
              <div className="mx-auto rounded-full mb-8 w-24 h-1 bg-[#e0e0e0]"></div>
              <p className="text-lg text-[#555] max-w-3xl mx-auto">
                These principles guide everything we do at SpeakerDrive, from
                product development to customer support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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
                  className="bg-white p-8 rounded-xl shadow-lg border border-[#e5e5e5] hover:shadow-xl transition-all duration-500 group transform hover:scale-[1.02]"
                  style={{ borderTop: `3px solid ${value.color}` }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="p-4 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "#f5f5f5" }}
                    >
                      <value.icon
                        className="w-6 h-6"
                        style={{ color: value.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#29A9FF]">
                        {value.title}
                      </h3>
                      <div
                        className="w-16 h-1 mb-4 transition-all duration-300 group-hover:w-24"
                        style={{ background: value.color }}
                      ></div>
                      <p className="leading-relaxed text-[#555]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is SpeakerDrive Section */}
        <section
          ref={(el) => registerSection("product", el)}
          className="py-28 bg-white"
        >
          <div className="container mx-auto max-w-4xl px-6 relative z-20">
            <div className="flex items-center gap-5 mb-10">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#29A9FF]/10 to-[#00C853]/10 hover:from-[#29A9FF]/20 hover:to-[#00C853]/20 transition-all duration-300 transform hover:scale-110">
                <img
                  src="/SpeakerDrive Logo - Icon.png"
                  alt="SpeakerDrive Icon"
                  className="w-10 h-10"
                  width="40"
                  height="40"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
                What is SpeakerDrive?
              </h2>
            </div>

            <div className="mb-12 bg-white p-8 rounded-xl border border-[#e5e5e5] shadow-xl relative overflow-hidden group transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#29A9FF]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

              <p className="text-lg mb-8 leading-relaxed text-[#555] relative z-10">
                SpeakerDrive is a prospecting database built exclusively for
                speakers, coaches, and experts. Access contact data for events,
                speaker opportunities, and decision-makers who book professionals
                like you.
              </p>
              <div className="h-px bg-[#e5e5e5] my-8"></div>
              <p className="text-xl font-medium text-[#555] relative z-10">
                SpeakerDrive lets you build a predictable booking pipeline—on your
                terms.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  "Find premium events",
                  "Connect with organizers",
                  "Book more gigs",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#29A9FF]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#29A9FF]/20 transition-all duration-300">
                      <Check className="w-5 h-5 text-[#29A9FF]" />
                    </div>
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center py-4 px-8 border-2 border-[#29A9FF] rounded-xl font-bold text-[#29A9FF] hover:bg-[#29A9FF]/5 transition-all duration-300 group"
              >
                <span>See All Features</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center py-4 px-8 border-2 border-[#00C853] text-[#00C853] rounded-xl font-bold hover:bg-[#00C853]/5 transition-all duration-300 group"
              >
                <span>How It Works</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={(el) => registerSection("cta", el)}
          className="py-28 text-[#333333] bg-[#fafafa]"
        >
          <div className="container mx-auto max-w-4xl px-6 relative z-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
              Ready to take control of your <br />business development?
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto text-center leading-relaxed">
              Join hundreds of speakers who are finding and booking opportunities on
              their own terms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-[#29A9FF] text-white hover:bg-[#29A9FF]/90 px-8 py-4 text-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center font-medium transition-all duration-300 text-[#333333] hover:text-[#29A9FF] group"
              >
                Questions? Contact us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            <p className="text-sm text-[#666] mt-6 text-center">
              No credit card needed. Cancel anytime.
            </p>
          </div>
        </section>
      </main>

      {/* CSS for animations */}
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

        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44');
        `}</style>

      <Footer5 />
    </div>
  );
}