"use client";

interface TestimonialProps {
  name: string;
  title: string;
  quote: React.ReactNode;
  avatar: string;
}

export function Testimonial({
  name,
  title,
  quote,
  avatar,
}: TestimonialProps) {
  return (
    <div className="mx-auto max-w-screen-md px-4 py-24 sm:py-40">
      <div className="relative mt-12 flex flex-col items-center justify-center gap-6 border-b border-t border-neutral-200 py-10">
        <p className="mx-auto w-full max-w-[600px] text-center text-neutral-600">
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
            <p className="text-sm text-black">{name}</p>
            <p className="text-sm text-neutral-600">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}