import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Bookmark, Share } from "lucide-react";

interface ThreadPreviewProps {
  thread: {
    id: number;
    title: string;
    content: string;
  };
}

const ThreadPreview = ({ thread }: ThreadPreviewProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);

  const handleLikeButton = () => {
    setIsLiked(isLiked ? false : true);
    setNumberOfLikes(isLiked ? numberOfLikes - 1 : numberOfLikes + 1);
  };

  const handleBookmarkButton = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card key={thread.id} className="mb-4">
      <CardHeader>
        <CardTitle>{thread.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          {thread.content.length < 100
            ? thread.content
            : `${thread.content.substring(0, 70).trimEnd()}...`}
        </p>
        <div className="mt-1"></div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2 justify-between w-full">
          <div className="flex flex-row gap-2">
            <Button variant="outline">
              <MessageCircle />
              <span className="ml-1">{numberOfComments}</span>
            </Button>
            <Button
              variant="outline"
              className={`${isLiked ? "text-primary hover:text-yellow" : ""}`}
              onClick={handleLikeButton}
            >
              <ThumbsUp />
              <span className="ml-1">{numberOfLikes}</span>
            </Button>

            <Button
              variant="outline"
              className={isBookmarked ? "text-primary hover:text-yellow" : ""}
              onClick={handleBookmarkButton}
            >
              <Bookmark />
            </Button>
          </div>

          <div className="flex flex-row gap-2">
            <Button variant="outline">
              <Share />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadPreview;
