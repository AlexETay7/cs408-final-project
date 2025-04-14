"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FeaturesModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground font-medium">
          Features
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Features Modal</DialogTitle>
        </DialogHeader>
        <p>
          <span className="font-semibold">CampusCart</span> offers a range of
          features designed to make buying and selling on your campus easier and
          more efficient.
        </p>
        <p>Our key features include:</p>
        <ul className="list-disc pl-5">
          <li>
            <span className="font-semibold">Product Listings</span>: Create and
            browse listings for textbooks, furniture, tech gear, and more.
          </li>
          <li>
            <span className="font-semibold">Like Posts</span>: Express interest
            in products by liking posts, helping others gauge the popularity of
            an item.
          </li>
        </ul>
        <p>
          We are continuously adding more features to enhance the user
          experience, so stay tuned for future updates!
        </p>
        <p className="italic text-sm text-right">— Alex T</p>
      </DialogContent>
    </Dialog>
  );
}
