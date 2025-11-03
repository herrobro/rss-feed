import { ErrorBanner } from "../error-banner";
import { ThemeProvider } from "../theme-provider";

export default function ErrorBannerExample() {
  return (
    <ThemeProvider>
      <div className="p-4 max-w-3xl mx-auto">
        <ErrorBanner
          message="Failed to fetch RSS feed. Please check your connection and try again."
          onDismiss={() => console.log("Error dismissed")}
        />
      </div>
    </ThemeProvider>
  );
}
