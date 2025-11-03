import { useState } from "react";
import { Header } from "@/components/header";
import { RefreshButton } from "@/components/refresh-button";
import { ArticleList } from "@/components/article-list";
import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorBanner } from "@/components/error-banner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Article } from "@/components/article-card";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rssFeedUrl, setRssFeedUrl] = useState("");
  const [currentFeedUrl, setCurrentFeedUrl] = useState<string | null>(null);

  const fetchFeed = async (feedUrl: string) => {
    const response = await fetch("/api/rss-feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rssFeedUrl: feedUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to fetch RSS feed" }));
      throw new Error(errorData.error || "Failed to fetch RSS feed");
    }

    return response.json();
  };

  const handleLoadFeed = async () => {
    if (!rssFeedUrl.trim()) {
      setError("Please enter an RSS feed URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const articles = await fetchFeed(rssFeedUrl);
      setArticles(articles);
      setCurrentFeedUrl(rssFeedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RSS feed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!currentFeedUrl) {
      setError("Please load a feed first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const articles = await fetchFeed(currentFeedUrl);
      setArticles(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RSS feed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter RSS feed URL"
                value={rssFeedUrl}
                onChange={(e) => setRssFeedUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLoadFeed();
                  }
                }}
                className="flex-1"
                data-testid="input-rss-url"
              />
              <Button
                onClick={handleLoadFeed}
                disabled={isLoading}
                data-testid="button-load-feed"
              >
                {isLoading ? "Loading..." : "Load Feed"}
              </Button>
            </div>
            {currentFeedUrl && (
              <div className="flex justify-end">
                <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
              </div>
            )}
          </div>

          {error && (
            <ErrorBanner
              message={error}
              onDismiss={() => setError(null)}
            />
          )}

          {isLoading ? (
            <LoadingSkeleton />
          ) : articles.length === 0 ? (
            <EmptyState />
          ) : (
            <ArticleList articles={articles} />
          )}
        </div>
      </main>
    </div>
  );
}
