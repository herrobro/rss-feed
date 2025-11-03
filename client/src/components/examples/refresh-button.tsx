import { RefreshButton } from "../refresh-button";
import { ThemeProvider } from "../theme-provider";
import { useState } from "react";

export default function RefreshButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    console.log("Refresh triggered");
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <ThemeProvider>
      <div className="p-4 flex gap-4">
        <RefreshButton onClick={handleRefresh} isLoading={false} />
        <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
      </div>
    </ThemeProvider>
  );
}
