import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";
import {
  BookOpen,
  Laptop,
  Sofa,
  Coffee,
  Headphones,
  Calculator,
  NotepadText,
} from "lucide-react";
import ScrambleHover from "@/fancy/components/text/scramble-hover";
import Typewriter from "@/fancy/components/text/typewriter";
import Link from "next/link";
import ModernButton from "@/components/ui/modernbutton";

export default function Home() {
  const items = [
    { icon: BookOpen, label: "Books", color: "#7c3aed" },
    { icon: Laptop, label: "Laptop", color: "#2563eb" },
    { icon: Sofa, label: "Furniture", color: "#059669" },
    { icon: Coffee, label: "Coffee", color: "#f97316" },
    { icon: Headphones, label: "Headphones", color: "#dc2626" },
    { icon: Calculator, label: "Calculator", color: "#6b7280" },
    { icon: NotepadText, label: "Notes", color: "#eab308" },
  ];

  return (
    <main className="overflow-hidden flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center relative">
      {/* avatar in top right */}
      <div className="absolute top-4 right-4">
        <Avatar>
          <AvatarImage src="/home/graduation-hat.png" alt="User Avatar" />
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
      </div>

      {/* opening message home page */}
      <div className="max-w-xl z-10">
        <h1>
          <ScrambleHover
            text={"CampusCart"}
            scrambleSpeed={50}
            maxIterations={8}
            revealDirection="center"
            useOriginalCharsOnly={true}
            className="cursor-pointer text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4"
          />
        </h1>

        {/* typewriter effect with fixed height container */}
        <div className="h-16 mb-6">
          <div className="text-gray-600 text-lg">
            <span>
              {
                "Buy and sell anything you need for college life — from textbooks to "
              }
            </span>
            <Typewriter
              text={[
                "furniture",
                "laptops",
                "headphones",
                "notes",
                "calculators",
                "dorm essentials",
                "gaming gear",
                "bikes",
                "coffee makers",
              ]}
              speed={80}
              className="text-blue-500"
              waitTime={2000}
              deleteSpeed={110}
              cursorChar={"_"}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/listings">
            {/* <Button className="w-full sm:w-auto transition-shadow hover:shadow-[0_0_10px_rgba(37,99,235,0.6)]">
              Explore Listings
            </Button> */}
            <ModernButton />
          </Link>
        </div>
      </div>

      {/* gravity icons */}
      <Gravity gravity={{ x: 0, y: 1 }} className="absolute inset-0 z-0">
        {items.map((item, index) => {
          const Icon = item.icon;
          const randomX = Math.random() * 60 + 20;
          const randomY = Math.random() * 20 + 5;
          const isCircle = Math.random() > 0.5;

          return (
            <MatterBody
              key={index}
              x={`${randomX}%`}
              y={`${randomY}%`}
              bodyType={isCircle ? "circle" : "rectangle"}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            >
              <div
                className={`p-4 text-white ${
                  isCircle ? "rounded-full" : "rounded-md"
                } shadow-lg`}
                style={{ backgroundColor: item.color }}
              >
                <Icon size={50} />
              </div>
            </MatterBody>
          );
        })}
      </Gravity>
    </main>
  );
}
