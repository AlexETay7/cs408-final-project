"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  prefillCategory: string | null;
};

const formSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(2),
  location: z.string().min(1),
  creator: z.string().min(1),
  description: z.string().min(1),
  key: z.string().min(1),
  category: z.string().min(1),
  contact: z.string().min(1),
  // postedAt: z.string().min(1)
});

type FormData = z.infer<typeof formSchema>;

export function CreateListingModal({ open, setOpen, prefillCategory }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      location: "",
      creator: "",
      description: "",
      key: "",
      category: prefillCategory || "",
      contact: "",
    },
  });

  const { reset } = form;

  // reset form whenever modal opens, with the new category
  useEffect(() => {
    if (open) {
      reset({
        title: "",
        price: "",
        location: "",
        creator: "",
        description: "",
        key: "",
        category: prefillCategory || "",
        contact: "",
      });
      setImageFile(null);
    }
  }, [open, prefillCategory, reset]);

  const onSubmit = async (data: FormData) => {
    const listingId = uuidv4();
    const postedAt = new Date().toISOString();
    let imageUrl = "";
  
    if (imageFile) {
      const filename = imageFile.name;
      const contentType = imageFile.type;
  
      // construct the S3 key
      const timestamp = Date.now();
      const key = `uploads/${timestamp}-${filename}`;
  
      // define the public URL for the image 
      imageUrl = `https://campuscart-listings-images.s3.us-west-2.amazonaws.com/${key}`;
  
      // upload the image directly to S3
      const s3UploadRes = await fetch(imageUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: imageFile,
      });
  
      if (!s3UploadRes.ok) {
        console.error("Image upload to S3 failed");
        return;
      }
    }
  
    // submit the rest of the listing data to /items
    const payload = {
      ...data,
      listingId,
      postedAt,
      imageUrl,
    };
  
    const res = await fetch("https://mihkhx9i46.execute-api.us-west-2.amazonaws.com/Prod/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      console.log("Listing created!");
      // reset form
    } else {
      console.error("Failed to submit listing");
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {" "}
            Create New Listing in{" "}
            {prefillCategory && (
              <span className="text-blue-500 font-medium">
                {prefillCategory}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className="focus-visible:ring-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                const [price, setPrice] = useState(field.value);

                useEffect(() => {
                  // ensure price always has the '$' symbol if it's missing
                  if (price && !price.startsWith("$")) {
                    setPrice("$" + price);
                  }
                }, [price]);

                const handlePriceChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  // remove any non-numeric characters (except decimal and $ symbol)
                  let input = e.target.value.replace(/[^0-9.]/g, "");

                  // set the value to the state with '$' prepended if it's not empty
                  if (input) {
                    input = "$" + input;
                  }

                  setPrice(input);
                  field.onChange(input); // update form state
                };

                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-0"
                        placeholder="$100"
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input className="focus-visible:ring-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel>Your Name</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-white text-black border border-gray-300 shadow-md"
                          side="right"
                        >
                          This is the name that will be publicly shown on your
                          listing.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input className="focus-visible:ring-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0"
                      placeholder="Email, phone number, instagram, etc"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="focus-visible:ring-0"
                      maxLength={100}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel>Key</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-white text-black border border-gray-300 shadow-md"
                          side="right"
                        >
                          This key acts like a password for your listing. Be
                          sure to <strong>save it</strong>, as you'll need it to
                          edit or delete your post later.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input className="focus-visible:ring-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" type="button">
                  Submit Listing
                </Button>
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
                  <AlertDialogAction
                    onClick={() => form.handleSubmit(onSubmit)()}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
