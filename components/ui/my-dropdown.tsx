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

export function MyDropdown() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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
