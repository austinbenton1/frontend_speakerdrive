"use client";
import {
  ArrowRight,
  CheckCircle,
  ChevronUp,
  Zap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatePresence, motion, useInView, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import {
  AppleMusic,
  A24,
  Pixar,
  Prada,
  Salomon,
  Sony,
  Strava,
  OpenAI,
} from "@/components/icons";

function Navigation({
  companyName,
  logo,
  links,
}: {
  companyName: string;
  logo: React.ReactNode;
  links: { label: string; href: string }[];
}) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "100px start"],
  });

  scrollYProgress.on("change", (latest) => {
    setHasScrolled(latest > 0);
  });

  return (
    <div className="fixed top-8 z-50 w-full">
      <div className="mx-auto w-full max-w-screen-lg px-4">
        <div
          className={cn(
            `flex w-full items-center justify-between rounded-xl border transition-all duration-200 ease-out`,
            hasScrolled
              ? "border-neutral-900 bg-neutral-950/80 px-2 backdrop-blur-sm"
              : "border-transparent bg-transparent px-2 backdrop-blur-0"
          )}
        >
          <div className="flex w-full items-center justify-between p-2">
            <a href="#" className="p-1">
              <span className="sr-only">{companyName}</span>
              {logo}
            </a>
            <div className="flex gap-x-6 pr-6 sm:gap-x-12">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm/6 font-normal text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarShine({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "absolute top-0 left-0 z-10 h-[1px] w-full bg-gradient-to-r from-transparent from-10% via-neutral-700 via-30% to-transparent to-90%",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />
  );
}

const VARIANTS = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Hero() {
  const MotionLink = motion(Link);

  return (
    <div className="px-4 pb-20 pt-32 sm:pb-40 sm:pt-48">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <motion.a
              href="https://x.com/ibelick"
              target="_blank"
              className="group inline-flex items-center gap-1 rounded-md bg-neutral-900 px-1.5 py-0.5 text-sm leading-normal text-neutral-300"
              variants={{ ...VARIANTS }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Zap className="h-4 w-4 fill-neutral-300 stroke-neutral-300" />
              <span className="font-medium">Announcing:</span>
              Motion Agent live{" "}
              <ChevronRight className="h-4 w-4 transition-all duration-200 ease-out group-hover:translate-x-0.5" />
            </motion.a>
            <TextEffect
              className="text-balance text-2xl tracking-tight text-white sm:text-5xl"
              as="h1"
              variants={{ item: VARIANTS }}
              speedReveal={1.5}
              speedSegment={0.5}
              delay={0.2}
              per="char"
            >
              Build your dream website
            </TextEffect>
            <TextEffect
              className="text-base font-normal text-neutral-400 sm:text-lg"
              as="p"
              variants={{ item: VARIANTS }}
              speedReveal={2}
              speedSegment={1}
              delay={0.35}
              segmentWrapperClassName="overflow-hidden"
              per="word"
            >
              The only AI agent that understands web design
            </TextEffect>
          </div>
          <div className="flex items-center gap-4">
            <MotionLink
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
              variants={{ ...VARIANTS }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Start building
            </MotionLink>
            <MotionLink
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-3 py-2 text-sm font-medium text-white hover:border-neutral-700 transition-colors hover:bg-gradient-to-b hover:from-neutral-900 hover:to-neutral-900"
              variants={{ ...VARIANTS }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </MotionLink>
          </div>
        </div>
        <div className="mt-16 sm:mt-28">
          <div className="relative mx-auto max-w-screen-lg overflow-hidden">
            <div className="relative aspect-video w-full rounded-xl lg:rounded-2xl border border-neutral-800 p-2">
              <BarShine />
              <motion.div
                className="h-full w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950"
                variants={{ ...VARIANTS }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <img
                  src="/shadcn_dashboard.jpg"
                  alt="hero"
                  className="w-full object-cover"
                />
              </motion.div>
            </div>
            <div
              className="absolute inset-x-0 -bottom-0 -mx-10 h-2/4 bg-gradient-to-t from-black to-transparent"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LOGOS = [
  { Component: AppleMusic, name: "AppleMusic" },
  { Component: A24, name: "A24" },
  { Component: Pixar, name: "Pixar" },
  { Component: Prada, name: "Prada" },
  { Component: Salomon, name: "Salomon" },
  { Component: OpenAI, name: "OpenAI" },
  { Component: Sony, name: "Sony" },
  { Component: Strava, name: "Strava" },
];

function LogoCloud() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [currentLogos, setCurrentLogos] = useState(LOGOS.slice(0, 8));

  const rotateLogs = () => {
    setCurrentLogos((prevLogos) => {
      const newLogos = [...prevLogos];
      const lastLogo = newLogos.pop()!;
      return [lastLogo, ...newLogos];
    });
  };

  useEffect(() => {
    if (!isInView) return;

    rotateLogs();

    const interval = setInterval(rotateLogs, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-6 px-6 lg:px-8">
        <p className="text-center text-white">Trusted by top design teams</p>
        <div className="flex w-full flex-col items-center gap-4 space-x-2 md:flex-row">
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <AnimatePresence initial={false} mode="popLayout">
              {currentLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="relative flex h-10 w-full items-center justify-center overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="absolute inset-0 flex items-center justify-center"
                    key={`${logo.name}-${index}`}
                  >
                    <logo.Component className="h-full w-full max-w-[80px] text-white " />
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureTwoItem({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="overflow-hidden px-4 py-24 sm:py-40">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col-reverse items-center gap-4 lg:grid lg:grid-cols-[40%_60%] lg:gap-20">
          <div className="flex basis-1/3 flex-col gap-4">
            <h2 className="text-xl text-white">{title}</h2>
            <p className="text-neutral-400">{description}</p>
            <div className="mt-5 flex items-center">
              <div className="flex flex-col gap-3">
                {features.map((feature) => (
                  <p
                    className="flex items-center gap-1.5 text-neutral-100"
                    key={feature.title}
                  >
                    <CheckCircle className="h-4 w-4" /> {feature.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex basis-2/3 flex-col gap-4">
            <BarShine className="from-5% via-30% to-60%" />
            <div
              className={cn(
                "overflow-hidden",
                "h-auto lg:h-[425px] w-full rounded-xl lg:rounded-2xl border border-neutral-800",
                "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-black/0 before:to-black lg:before:bg-gradient-to-r"
              )}
            >
              <img
                src="/shadcn_dashboard.jpg"
                alt="feature-two"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureTwoItemReverse({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="overflow-hidden px-4 py-24 sm:py-40">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
          <div className="relative flex basis-4/6 flex-col gap-4">
            <div className="relative flex h-full flex-1">
              <BarShine className="from-30% via-60% to-90%" />
              <div
                className={cn(
                  "overflow-hidden",
                  "h-auto lg:h-[425px] w-full rounded-xl lg:rounded-2xl border border-neutral-800",
                  "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-black/0 before:to-black lg:before:bg-gradient-to-l"
                )}
              >
                <img
                  src="/shadcn_dashboard.jpg"
                  alt="feature-two"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex basis-2/6 flex-col justify-center gap-4">
            <h2 className="text-xl text-white">{title}</h2>
            <p className="text-neutral-400">{description}</p>
            <div className="mt-5 flex items-center">
              <div className="flex flex-col gap-3">
                {features.map((feature) => (
                  <p
                    className="flex items-center gap-1.5 text-neutral-100"
                    key={feature.title}
                  >
                    <CheckCircle className="h-4 w-4" /> {feature.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BoltIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width={175}
    height={175}
    fill="none"
    initial={{
      filter: "drop-shadow(0 0px 12px rgba(255, 255, 255, 0.2))",
      color: "#0B0B0B",
    }}
    animate={{
      filter: "drop-shadow(0 0px 24px rgba(255, 255, 255, 0.3))",
      color: "#131313",
    }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  >
    <path
      fill="currentColor"
      stroke="#334155"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.229}
      d="m153.426 106.017-59.85 47.684-33.334 16.666 23.7-18.883 36.15-28.8c2.05-1.583 2.45-4.35 1.184-8.283-1.284-3.934-3.5-6.817-6.65-8.634L86.442 89.484l33.334-16.667 28.183 16.284c3.15 1.816 5.367 4.7 6.65 8.633 1.267 3.933.867 6.7-1.183 8.283"
    />
    <path
      fill="currentColor"
      stroke="#334155"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.229}
      d="M93.575 153.701c-.517.4-1.067.683-1.667.833zM120.091 122.684l-36.15 28.8-23.7 18.883c-1.333 1.05-2.966 1.283-4.9.716-1.95-.566-3.816-1.85-5.65-3.883-1.817-2.016-3.233-4.333-4.267-6.949-1.033-2.617-1.433-5.034-1.183-7.25l5.817-42.767-22.55-13.017c-2.917-1.683-5.067-4.433-6.45-8.216q-2.1-5.7.45-8.4L75.89 22.25c.3-.317.617-.567.967-.784l.117-.066.5-.234c.9-.4 1.95-.466 3.15-.25 1.933.35 3.933 1.534 6 3.567.9.883 1.683 1.817 2.366 2.817a18.2 18.2 0 0 1 2.183 4.183c.967 2.65 1.334 5.083 1.084 7.317L86.44 89.484l28.184 16.283c3.15 1.817 5.366 4.7 6.65 8.634 1.266 3.933.866 6.7-1.184 8.283"
    />
    <path
      fill="currentColor"
      stroke="#334155"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.229}
      d="m125.591 22.134-5.816 50.683-33.334 16.667 5.817-50.683c.25-2.234-.117-4.667-1.083-7.317-.55-1.5-1.284-2.9-2.184-4.183-.683-1-1.466-1.934-2.366-2.817-2.067-2.033-4.067-3.217-6-3.567-1.2-.216-2.25-.15-3.15.25l32.9-16.466c1.016-.567 2.2-.717 3.583-.45 1.933.35 3.933 1.533 6 3.566q3.075 3.025 4.55 7c.967 2.65 1.333 5.084 1.083 7.317"
    />
    <path fill="currentColor" d="m110.558 4.6-.183.1Z" />
    <path
      stroke="#334155"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.229}
      d="m110.558 4.6-.183.1"
    />
  </motion.svg>
);

function FeatureOneItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-4 py-24 sm:py-40">
      <div className="container mx-auto max-w-md">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-xl text-white">{title}</h2>
          <p className="text-neutral-400">{description}</p>
          <div className="mt-5 flex items-center justify-center">
            <BoltIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBigItem({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="px-4 py-24 sm:py-40">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-xl text-white">{title}</h2>
          <p className="text-neutral-400">{description}</p>
          <div className="relative mt-8">
            <BarShine className="via-70%" />
            <div
              className="aspect-video overflow-hidden rounded-xl lg:rounded-2xl border border-neutral-800 [mask-image:linear-gradient(to_top,#000,#000,transparent_0,#000_var(--shadow-size))]"
              style={
                {
                  "--shadow-size": "100%",
                } as React.CSSProperties
              }
            >
              <img
                src="/shadcn_dashboard.jpg"
                alt="feature-big"
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-4 lg:mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2 text-left">
                <h3 className="text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonial({
  name,
  title,
  quote,
  avatar,
}: {
  name: string;
  title: string;
  quote: React.ReactNode;
  avatar: string;
}) {
  return (
    <div className="mx-auto max-w-screen-md px-4 py-24 sm:py-40">
      <div className="relative mt-12 flex flex-col items-center justify-center gap-6 border-b border-t border-neutral-900 py-10">
        <p className="mx-auto w-full max-w-[600px] text-center text-neutral-400">
          <span className="font-serif">"</span>
          {quote}
          <span className="font-serif">"</span>
        </p>
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt={`Avatar for ${name} - ${title}`}
            className="h-12 w-12 rounded-full grayscale"
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm text-white">{name}</p>
            <p className="text-sm text-neutral-400">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: {
    title: string;
    value: string;
    content: string;
  }[];
}) {
  return (
    <div className="relative mx-auto max-w-xl px-4 py-24 sm:py-40">
      <div className="mb-10 text-left">
        <h2 className="mb-4 text-2xl font-medium text-white">{title}</h2>
        <p className="text-base text-neutral-400">{description}</p>
      </div>
      <Accordion
        className="flex w-full flex-col divide-y divide-neutral-900 border-t border-neutral-900"
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {content.map((item) => (
          <AccordionItem value={item.value} className="py-4" key={item.value}>
            <AccordionTrigger className="w-full text-left text-white">
              <div className="flex items-center justify-between">
                <div>{item.title}</div>
                <ChevronUp className="h-4 w-4 -rotate-180 text-neutral-50 transition-transform duration-200 group-data-[expanded]:rotate-0" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="pt-2 text-neutral-400">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function CTASection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-4 py-24 sm:py-40">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-md bg-neutral-900 px-1.5 py-0.5 text-sm leading-normal text-neutral-300">
            Get free trial
          </span>
          <div className="flex flex-col gap-2 text-white">
            <h2 className="text-xl text-white">{title}</h2>
            <p className="text-neutral-400">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              Start building
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-3 py-2 text-sm font-medium text-white hover:border-neutral-700 transition-colors hover:bg-gradient-to-b hover:from-neutral-900 hover:to-neutral-900"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <p className="text-center text-sm text-neutral-400">
            No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Features",
      description: "Discover what our AI design agent can do",
      items: [
        {
          title: "AI Design Assistant",
          href: "/features/ai-assistant",
        },
        {
          title: "Component Library",
          href: "/features/components",
        },
        {
          title: "Design Templates",
          href: "/features/templates",
        },
        {
          title: "Export Options",
          href: "/features/export",
        },
      ],
    },
    {
      title: "Solutions",
      description: "Perfect for teams of all sizes",
      items: [
        {
          title: "For Developers",
          href: "/solutions/developers",
        },
        {
          title: "For Designers",
          href: "/solutions/designers",
        },
        {
          title: "For Agencies",
          href: "/solutions/agencies",
        },
        {
          title: "For Startups",
          href: "/solutions/startups",
        },
      ],
    },
    {
      title: "Resources",
      description: "Learn how to make the most of our platform",
      items: [
        {
          title: "Documentation",
          href: "/docs",
        },
        {
          title: "Tutorials",
          href: "/tutorials",
        },
        {
          title: "Blog",
          href: "/blog",
        },
        {
          title: "Showcase",
          href: "/showcase",
        },
      ],
    },
    {
      title: "Support",
      description: "Get help when you need it",
      items: [
        {
          title: "Help Center",
          href: "/help",
        },
        {
          title: "API Reference",
          href: "/api",
        },
        {
          title: "Community",
          href: "/community",
        },
        {
          title: "Status",
          href: "/status",
        },
      ],
    },
    {
      title: "Company",
      description: "Learn more about our mission",
      items: [
        {
          title: "About",
          href: "/about",
        },
        {
          title: "Careers",
          href: "/careers",
        },
        {
          title: "Press Kit",
          href: "/press",
        },
        {
          title: "Contact",
          href: "/contact",
        },
      ],
    },
  ];

  return (
    <>
      <div className="h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      <footer className="border-t border-neutral-900 py-16">
        <div className="mx-auto w-full max-w-screen-lg px-4">
          <div className="grid grid-cols-2 items-start gap-10 md:grid-cols-3 lg:grid-cols-6">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-1 text-base"
              >
                <div className="flex flex-col gap-6">
                  {item.href ? (
                    <Link href={item.href} className="text-sm text-white">
                      {item.title}
                    </Link>
                  ) : (
                    <p className="text-sm text-white">{item.title}</p>
                  )}
                  {item.items && (
                    <div className="flex flex-col gap-3">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation
        companyName="Motion Agent"
        logo={
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 70 70"
            aria-label="MP Logo"
            width={70}
            height={70}
            className="h-8 w-auto text-white"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={3}
              d="M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263"
            />
          </svg>
        }
        links={[
          { label: "Login", href: "/login" },
          { label: "Sign Up", href: "/signup" },
        ]}
      />
      <Hero />
      <LogoCloud />
      <FeatureTwoItem
        title="AI-generated designs"
        description="Harness the power of AI to create layouts, choose typography, and animate components—all tailored to your project's needs."
        features={[
          {
            title: "Custom layout suggestions",
            description:
              "Receive instant layout options based on your content and goals, helping you start faster.",
          },
          {
            title: "Adaptive animations",
            description:
              "Automatically apply smooth, meaningful animations that fit your brand and enhance user experience.",
          },
          {
            title: "Responsive design by default",
            description:
              "Ensure your designs look and perform flawlessly across all devices without extra effort.",
          },
        ]}
      />
      <FeatureBigItem
        title="Design, animate, and build faster"
        description="Delivering personalized design suggestions, scalable animations, and optimized layouts."
        features={[
          {
            title: "AI-driven design suggestions",
            description:
              "Skip tedious trial-and-error. Get design recommendations backed by real-time data.",
          },
          {
            title: "Built with Motion-Primitives",
            description:
              "Seamlessly integrate our beautifully animated components for polished interactions.",
          },
          {
            title: "No-code design tweaks",
            description:
              "Quickly refine or customize designs without needing to write complex code.",
          },
        ]}
      />
      <FeatureTwoItemReverse
        title="Easy collaboration"
        description="Designed for teams and solo creators alike, Motion Agent makes sharing and iterating on design ideas effortless."
        features={[
          {
            title: "Team integration",
            description:
              "Collaborate with designers and developers in real-time without leaving the platform.",
          },
          {
            title: "Version control",
            description:
              "Track changes and revert to previous iterations easily while maintaining a consistent design language.",
          },
          {
            title: "Export production-ready code",
            description:
              "Export optimized HTML, CSS, and animations directly to your project stack.",
          },
        ]}
      />
      <Testimonial
        name="Julien Nim"
        title="Founder, Motion-Primitives"
        avatar="/julien_nim.png"
        quote={
          <span>
            Motion-Primitives is a game changer. <br />
            It let me build my{" "}
            <strong className="font-medium text-white">
              landing page in minutes.
            </strong>
          </span>
        }
      />
      <FeatureOneItem
        title="Build at the speed of thought"
        description="Let Motion Agent handle the boring parts of building your website. You can focus on the fun parts."
      />
      <FAQ
        title="Frequently asked questions"
        description="Here are some of the most common questions we receive from our users."
        content={[
          {
            title: "Getting Started",
            value: "getting-started",
            content:
              "Discover how to set up Motion Agent in minutes. Our quick-start guide walks you through installation, initial setup, and integrating it with your existing projects.",
          },
          {
            title: "How does it work?",
            value: "how-does-it-work",
            content:
              "Motion Agent uses AI to analyze your content and design goals. It generates layout suggestions, animations, and component selections that you can refine or customize effortlessly.",
          },
          {
            title: "Do I need coding knowledge?",
            value: "coding-knowledge",
            content:
              "No coding knowledge is required to get started. Motion Agent offers a no-code interface for design customization, but you can dive into the code if you want full control.",
          },
          {
            title: "Can I export production-ready code?",
            value: "export-code",
            content:
              "Yes, Motion Agent generates clean, production-ready HTML, CSS, and JavaScript that you can directly export into your project.",
          },
          {
            title: "Does it support team collaboration?",
            value: "team-collaboration",
            content:
              "Absolutely! Motion Agent allows team members to collaborate on designs, share feedback, and track changes with built-in version control.",
          },
          {
            title: "What kind of animations can I create?",
            value: "animations",
            content:
              "You can create a variety of animations including page transitions, button hovers, content reveals, and more using Motion-Primitives' seamless animation components.",
          },
        ]}
      />
      <CTASection
        title="Start building your dream website"
        description="Let Motion Agent handle the boring parts of building your website. You can focus on the fun parts."
      />
      <Footer />
    </main>
  );
}
