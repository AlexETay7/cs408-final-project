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
import { Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyDropdown } from "@/components/ui/my-dropdown";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/ui/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockListings = [
  {
    title: "Mini Fridge",
    price: "$40",
    imageUrl: "campus-cart.png",
    description: "Perfect for dorm use. Runs quiet. Energy efficient.",
    creator: "AET720",
    postedAt: "August 3rd, 5:14 PM",
    location: "Boise",
  },
  {
    title: "Used Textbooks",
    price: "$25",
    imageUrl: "campus-cart.png",
    description: "Covers intro CS courses. Light notes in margins.",
    creator: "Jane1Smith",
    postedAt: "May 3rd, 5:14 PM",
    location: "Boise",
  },
  {
    title: "Dorm Lamp",
    price: "$10",
    imageUrl: "campus-cart.png",
    description: "Simple and clean. Adjustable neck, warm light.",
    creator: "Niles81",
    postedAt: "December 3rd, 5:14 PM",
    location: "Boise",
  },
  {
    title: "Mini Fridge",
    price: "$40",
    imageUrl: "campus-cart.png",
    description: "Perfect for dorm use. Runs quiet. Energy efficient.",
    creator: "AET720",
    postedAt: "August 3rd, 5:14 PM",
    location: "Boise",
  },
  {
    title: "Used Textbooks",
    price: "$25",
    imageUrl: "campus-cart.png",
    description: "Covers intro CS courses. Light notes in margins.",
    creator: "Jane1Smith",
    postedAt: "May 3rd, 5:14 PM",
    location: "Boise",
  },
  {
    title: "Dorm Lamp",
    price: "$10",
    imageUrl: "campus-cart.png",
    description: "Simple and clean. Adjustable neck, warm light.",
    creator: "Niles81",
    postedAt: "December 3rd, 5:14 PM",
    location: "Boise",
  },
];

export default function ListingsPage() {
  //   const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      {/* logo */}
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Avatar>
            <AvatarImage src="graduation-hat.png" alt="User Avatar" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        {/* LEFT: Breadcrumb + Search */}
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

          {/* <Input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-64"
          />
          <Button type="submit">
            <Search />
          </Button> */}
        </div>

        {/* RIGHT: Dropdown + Create button */}
        <div className="flex items-center gap-4 flex-wrap">
          <MyDropdown />
          <Link href="/post">
            <Button className="transition-shadow hover:shadow-[0_0_10px_rgba(37,99,235,0.6)]">
              <Plus />
              Create New Listing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockListings.map((item, index) => (
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
      <Footer></Footer>
    </div>
  );
}
