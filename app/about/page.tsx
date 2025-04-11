// app/about/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex flex-col gap-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <CardTitle className="text-3xl">About CampusCart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
          <p>
            CampusCart is a marketplace platform tailored for college students.
            Whether you're buying or selling textbooks, dorm furniture, or tech
            gear, CampusCart makes it easy to connect with fellow students on
            your campus.
          </p>
          <p>
            Built as my final project for my Full Stack Development class,
            CampusCart leverages modern tools and practices including
            <span className="font-semibold text-foreground"> Next.js</span>,
            <span className="font-semibold text-foreground"> Tailwind CSS</span>
            , and
            <span className="font-semibold text-foreground">
              {" "}
              shadcn/ui
            </span>{" "}
            for UI components.
          </p>
          <p>
            I used the{" "}
            <span className="font-semibold text-foreground">
              React Testing Library
            </span>{" "}
            paired with{" "}
            <span className="font-semibold text-foreground">Jest</span> to test
            logic and ensure a reliable user experience. For infrastructure and
            file storage, I leveraged AWS's{" "}
            <span className="font-semibold text-foreground">DynamoDB</span>,
            <span className="font-semibold text-foreground"> S3</span>, and
            <span className="font-semibold text-foreground"> Lambda</span>,
            powering the backend with scalability and performance in mind.
          </p>
          <p className="italic text-sm text-right">— Alex T</p>
        </CardContent>
      </Card>
    </main>
  );
}
