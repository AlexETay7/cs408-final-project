"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { CreateListingModal } from "./createlistingmodal";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const categoryList = [
  "Textbooks",
  "Dorm Gear",
  "Furniture",
  "Electronics",
  "Clothing",
  "Bikes & Boards",
  "Decor",
  "School Supplies",
  "Kitchenware",
  "Games & Media",
  "Personal Care",
  "Other",
];

export function ListingDropdown() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Manage the modal state
  const [prefillCategory, setPrefillCategory] = React.useState<string | null>(
    null
  ); // Track the selected category to pre-fill

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const openModalWithCategory = (category: string) => {
    setPrefillCategory(category); // Set the selected category to pre-fill
    setIsModalOpen(true); // Open the modal
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="focus-visible:ring-0 bg-blue-400 text-white hover:bg-blue-500">
            <Plus />
            Create New Listing
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categoryList.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
              onClick={() => openModalWithCategory(category)} // Open modal with selected category
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Pass the modal state and category to the modal component */}
      <CreateListingModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        // prefillCategory={prefillCategory}
      />
    </>
  );
}
