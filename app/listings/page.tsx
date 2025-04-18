"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ui/listing-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Archive, RefreshCcw } from "lucide-react";
import { MyDropdown } from "@/components/ui/my-dropdown";
import { useEffect, useState } from "react";
import Footer from "@/components/ui/footer";
import { Spinner } from "@/components/ui/spinner";
import { ListingDropdown } from "@/components/ui/listing-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Listing = {
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  creator: string;
  postedAt: string;
  location: string;
  category: string;
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetchListings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error("Error loading listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // filter listings based on selected categories
  const filterListings = (categories: string[]) => {
    if (categories.length === 0) {
      setFilteredListings(listings); // no filter applied, show all listings
    } else {
      setFilteredListings(
        listings.filter((listing) => categories.includes(listing.category))
      );
    }
  };

  useEffect(() => {
    filterListings(selectedCategories); // filter listings whenever categories change
  }, [selectedCategories, listings]);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/home/graduation-hat.png" alt="User Avatar" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Listings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setLoading(true); // show spinner again
              fetchListings();
            }}
            className="hover:bg-blue-100"
          >
            <RefreshCcw className="w-5 h-5" />
          </Button>
          <MyDropdown onCategoryChange={setSelectedCategories} />
          <ListingDropdown onListingCreated={fetchListings} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((item, index) => (
            <ListingCard
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              description={item.description}
              creator={item.creator}
              postedAt={item.postedAt}
              location={item.location}
            />
          ))}
        </div>
      )}
      <Footer />
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/my-listings">
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out h-16 w-16 rounded-full flex items-center justify-center"
                >
                  <Archive className="w-6 h-6" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-gray-900 text-white p-2 rounded-md shadow-xl"
            >
              <span className="font-semibold">My Listings</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
