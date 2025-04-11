"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PrivacyModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground font-medium">
          Privacy
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Privacy Modal</DialogTitle>
        </DialogHeader>
        <p>
          <span className="font-semibold">CampusCart</span> values your privacy.
          We are committed to protecting your personal information and ensuring
          that your data is kept secure.
        </p>
        <p>
          We only collect necessary information to provide our services, such as
          your <span className="font-semibold">name</span> (the one you provide,
          it may not be your real name), contact information, and other relevant
          details needed to facilitate the buying and selling process.
        </p>
        <p>
          Your data will <span className="font-semibold">not</span> be shared
          with third parties unless required by law or to provide the services
          you request. We use secure methods to store and transmit your data,
          and we take steps to ensure its safety.
        </p>
        <p className="italic text-sm text-right">
          — <span>CampusCart Team (1 man team)</span>
        </p>
      </DialogContent>
    </Dialog>
  );
}
