import { Card } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4" data-testid="container-loading-skeleton">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6">
          <div className="animate-pulse">
            <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </Card>
      ))}
    </div>
  );
}
