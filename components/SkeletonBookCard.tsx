import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonBookCard = () => {
  return (
    <Card className="h-72 flex flex-col justify-center">
      <CardContent>
        <div className="flex flex-row gap-6">
          <div className="flex-shrink-0">
            <Skeleton className="w-32 h-48" />
          </div>
          <div className="flex-1 flex flex-col">
            <Skeleton className="w-full h-5 mb-1" />
            <Skeleton className="w-3/4 h-4 mb-4" />
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonBookCard;
