"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AboutModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground font-medium">
          About
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">About Modal</DialogTitle>
        </DialogHeader>
        <p>
          CampusCart is a marketplace platform tailored for college students.
          Whether you're buying or selling textbooks, dorm furniture, or tech
          gear, CampusCart makes it easy to connect with fellow students on your
          campus.
        </p>
        <p>
          Built as my final project for my Full Stack Development class,
          CampusCart leverages modern tools and practices including
          <span className="font-semibold text-foreground"> Next.js</span>,
          <span className="font-semibold text-foreground"> Tailwind CSS</span>,
          and
          <span className="font-semibold text-foreground"> shadcn/ui</span> for
          UI components.
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
      </DialogContent>
    </Dialog>
  );
}
