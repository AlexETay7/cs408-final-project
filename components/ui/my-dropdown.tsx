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
import { ChevronDown } from "lucide-react";

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

type MyDropdownProps = {
  onCategoryChange: (selectedCategories: string[]) => void; // pass the updated categories to parent
};

export function MyDropdown({ onCategoryChange }: MyDropdownProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const toggleCategory = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories); // notify parent component of the updated categories
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="focus-visible:ring-0" variant="outline">
          <ChevronDown className="mr-2" />
          Filter Listings
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
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
