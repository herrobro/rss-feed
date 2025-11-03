import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div
      className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6"
      data-testid="container-error-banner"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground" data-testid="text-error-message">
            {message}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="h-6 w-6 flex-shrink-0 hover-elevate active-elevate-2"
          data-testid="button-dismiss-error"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}
