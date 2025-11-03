import { EmptyState } from "../empty-state";
import { ThemeProvider } from "../theme-provider";

export default function EmptyStateExample() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <EmptyState />
      </div>
    </ThemeProvider>
  );
}
