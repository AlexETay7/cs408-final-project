import { CalendarIcon, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

type ListingCardProps = {
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  postedAt?: string; // optional
  creator: string;
  location: string;
  disableHoverCard?: boolean; // prop to control hover card behavior
};

export default function ListingCard({
  title,
  price,
  imageUrl,
  description,
  postedAt,
  creator,
  location,
  disableHoverCard = false, // default to false if not passed
}: ListingCardProps) {
  const card = (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white text-black">
      <div className="w-full h-48 overflow-hidden rounded-lg max-w-[90%] mx-auto">
        <img
          src={imageUrl && imageUrl !== "" ? imageUrl : "/campus-cart.png"} // if no imageUrl, use default
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-blue-400 font-medium mb-1">@{creator}</p>
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">{price}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (disableHoverCard) {
    // Return the card without hover card features
    return card;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{card}</HoverCardTrigger>
      <HoverCardContent className="w-[360px] bg-gray-50 text-black">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="/graduation-hat.png" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{creator}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-black/80">
                {postedAt
                  ? format(new Date(postedAt), "PPP p")
                  : "Unknown date"}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
