"use client";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureBigItemProps {
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc?: string;
}

export function FeatureBigItem({
  title,
  description,
  features,
  imageSrc = "/shadcn_dashboard.jpg",
}: FeatureBigItemProps) {
  return (
    <div className="px-4 py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          <p className="text-neutral-600 mx-auto max-w-2xl mb-6">{description}</p>
          
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <img
                src={imageSrc}
                alt="feature-big"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2 text-left">
                <h3 className="text-lg font-medium text-black">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600">
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