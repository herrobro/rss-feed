import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function RefreshButton({ onClick, isLoading = false }: RefreshButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="gap-2"
      data-testid="button-refresh-feed"
    >
      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      <span className="font-medium text-sm">
        {isLoading ? "Refreshing..." : "Refresh Feed"}
      </span>
    </Button>
  );
}
