import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TestSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton className="w-20 h-6" />
    </div>
  );
};

export default TestSkeleton;