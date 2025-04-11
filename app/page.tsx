import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center relative">
      {/* avatar in top right */}
      <div className="absolute top-4 right-4">
        <Avatar>
          <AvatarImage src="/graduation-hat.png" alt="User Avatar" />
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
      </div>
      {/* opening message home page */}
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          CampusCart
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Buy and sell with fellow students. Textbooks, furniture, electronics,
          and more—all in one place, just for campus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="w-full sm:w-auto">Browse Listings</Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Post an Item
          </Button>
        </div>
      </div>
    </main>
  );
}
