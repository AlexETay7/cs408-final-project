"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export default function MyListingsPage() {
  const [key, setKey] = useState(""); // state to hold the user's key
  const [isKeyEntered, setIsKeyEntered] = useState(false); // to determine if key has been entered
  const [listings, setListings] = useState<any[]>([]); // state for user's listings

  // function to fetch listings based on the key, need to replace with api call
  const fetchListings = async (key: string) => {
    // API endpoint that returns listings for a given key
    const response = await fetch(`/api/listings?key=${key}`);
    const data = await response.json();
    setListings(data);
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

  return (
    <div className="p-4">
      {!isKeyEntered ? (
        // show the key prompt if the key is not entered yet
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
        // once key is entered, show the listings
        <div>
          <h2>Your Listings</h2>
          {listings.length > 0 ? (
            <ul>
              {listings.map((listing, index) => (
                <li key={index}>{listing.title}</li>
              ))}
            </ul>
          ) : (
            <p>No listings found for the provided key.</p>
          )}
        </div>
      )}
    </div>
  );
}
