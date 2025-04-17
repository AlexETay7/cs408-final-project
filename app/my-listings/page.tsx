"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Footer from "@/components/ui/footer";
import ListingCard from "@/components/ui/listing-card";
import { Spinner } from "@/components/ui/spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type Listing = {
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  creator: string;
  location: string;
  postedAt: string;
};

export default function MyListingsPage() {
  const [key, setKey] = useState(""); // state to hold the user's key
  const [isKeyEntered, setIsKeyEntered] = useState(false); // to determine if key has been entered
  const [listings, setListings] = useState<Listing[]>([]); // state for user's listings
  const [loading, setLoading] = useState(false); // loading state

  // fetch listings based on the key
  const fetchListings = async (key: string) => {
    setLoading(true); // set loading to true
    try {
      const response = await fetch(
        `https://mihkhx9i46.execute-api.us-west-2.amazonaws.com/Prod/items/by-key?key=${key}`
      );
      if (!response.ok) throw new Error("Failed to fetch listings");
      const data = await response.json();
      setListings(data); // set the fetched listings
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false); // set loading to false after request completes
    }
  };

  // effect to handle fetching of listings when key is entered
  useEffect(() => {
    if (isKeyEntered && key) {
      fetchListings(key);
    }
  }, [isKeyEntered, key]);

  const handleSubmitKey = () => {
    if (key) {
      setIsKeyEntered(true); // when key is entered, fetch listings
    }
  };

  function handleEdit(item: Listing): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(item: Listing): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/home/graduation-hat.png" alt="CC" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="p-4">
        {!isKeyEntered ? (
          <Dialog open={!isKeyEntered}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Enter Your Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full focus-visible:ring-0"
                />
                <Button onClick={handleSubmitKey} className="w-full">
                  Submit Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          // listings section (match styling from main listings page)
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/home/listings">
                    Listings
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Listings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Spinner />
              </div>
            ) : listings.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden"
                  >
                    <ListingCard
                      title={item.title}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      description={item.description}
                      creator={item.creator}
                      postedAt={item.postedAt}
                      location={item.location}
                      disableHoverCard
                    />

                    {/* gray overlay on hover */}
                    <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-60 transition-opacity duration-200 pointer-events-none rounded-xl z-10" />

                    {/* icons on hover */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <button
                        className="p-2 rounded-full bg-yellow-400 text-white shadow hover:bg-yellow-500"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 rounded-full bg-red-500 text-white shadow hover:bg-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this listing?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. The listing will be
                              permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No listings found for the provided key.</p>
            )}
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
