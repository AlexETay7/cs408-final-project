import { CalendarIcon, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ListingCardProps = {
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  postedAt?: string; // optional
  creator: string;
  location: string;
};

export default function ListingCard({
  title,
  price,
  imageUrl,
  description,
  postedAt,
  creator,
  location,
}: ListingCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
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
      </HoverCardTrigger>

      <HoverCardContent className="w-90 bg-gray-500 text-white">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/home/graduation-hat.png" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{creator}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-white/80">{postedAt}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
