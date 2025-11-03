import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" data-testid="container-empty-state">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-base text-foreground mb-1">No articles yet</p>
      <p className="text-sm text-muted-foreground">
        Click the refresh button to load your RSS feed
      </p>
    </div>
  );
}
