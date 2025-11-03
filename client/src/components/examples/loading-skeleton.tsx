import { LoadingSkeleton } from "../loading-skeleton";
import { ThemeProvider } from "../theme-provider";

export default function LoadingSkeletonExample() {
  return (
    <ThemeProvider>
      <div className="p-4 max-w-3xl mx-auto">
        <LoadingSkeleton />
      </div>
    </ThemeProvider>
  );
}
