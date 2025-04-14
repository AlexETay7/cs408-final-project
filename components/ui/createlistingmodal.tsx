"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Upload, HelpCircle } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  prefillCategory?: string;
};

export function CreateListingModal({ open, setOpen, prefillCategory }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [location, setLocation] = useState("");
  const [key, setKey] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("creator", creator);
    formData.append("location", location);
    if (imageFile) formData.append("image", imageFile);
    formData.append("key", key);

    console.log("Listing submitted!", {
      title,
      price,
      description,
      creator,
      location,
      prefillCategory,
      imageFile,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-visible:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$100"
              className="focus-visible:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="focus-visible:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="creator">Your Name</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    This is the name that will be publicly shown on your
                    listing.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              required
              className="focus-visible:ring-0"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="focus-visible:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="image">Image Upload</Label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <Button variant="outline" type="button" className="w-full" asChild>
              <label
                htmlFor="image"
                className="w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                {imageFile ? "Change Image" : "Choose Image"}
              </label>
            </Button>
            {imageFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={location}
              onChange={(e) => setKey(e.target.value)}
              className="focus-visible:ring-0"
              required
            />
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">Submit Listing</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Once you post this listing, it will be visible to all users.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleSubmit()}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </DialogContent>
    </Dialog>
  );
}
