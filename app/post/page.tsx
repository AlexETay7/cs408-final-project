"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Upload } from "lucide-react";
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
import Link from "next/link";

export default function CreateListingPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct FormData for image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("creator", creator);
    formData.append("location", location);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // todo - submit form to api
    console.log("Listing submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      {/* logo */}
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Avatar>
            <AvatarImage src="graduation-hat.png" alt="User Avatar" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Listing
          </CardTitle>
        </CardHeader>
        <CardContent>
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

              <Button
                variant="outline"
                type="button"
                className="w-full"
                asChild
              >
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full">Submit Listing</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Once you post this listing, it will be visible to all users.
                    Make sure everything looks correct!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
