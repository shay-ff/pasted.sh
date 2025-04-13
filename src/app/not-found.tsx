"use client";

import { useRouter } from "next/navigation";
const Button = ({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${
      variant === "outline"
        ? "border border-gray-400 text-gray-400"
        : "bg-blue-500 text-white"
    }`}
  >
    {children}
  </button>
);

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0e0e10] px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Snippet Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The snippet you are looking for may have expired or does not exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/")}>Go to Homepage</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Create a New Snippet
          </Button>
        </div>
      </div>
    </main>
  );
}
