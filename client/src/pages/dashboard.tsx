import { useState } from "react";
import { Header } from "@/components/header";
import { RefreshButton } from "@/components/refresh-button";
import { ArticleList } from "@/components/article-list";
import { EmptyState } from "@/components/empty-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorBanner } from "@/components/error-banner";
import { Input } from "@/components/ui/input";
import type { Article } from "@/components/article-card";

export default function Dashboard() {
  //todo: remove mock functionality
  const [articles, setArticles] = useState<Article[]>([
    {
      title: "Introduction to React Query: A Complete Guide",
      link: "https://example.com/react-query-guide"
    },
    {
      title: "Building Scalable Web Applications with TypeScript",
      link: "https://example.com/typescript-apps"
    },
    {
      title: "Modern CSS Techniques for Responsive Design",
      link: "https://example.com/css-responsive"
    },
    {
      title: "Understanding JavaScript Async/Await Patterns",
      link: "https://example.com/async-await"
    },
    {
      title: "Best Practices for API Design in 2025",
      link: "https://example.com/api-design"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rssFeedUrl, setRssFeedUrl] = useState("");

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    //todo: remove mock functionality - simulate API call
    console.log("Fetching RSS feed from webhook with URL:", rssFeedUrl);
    
    setTimeout(() => {
      //todo: remove mock functionality - simulate random success/error
      const shouldSucceed = Math.random() > 0.3;
      
      if (shouldSucceed) {
        //todo: remove mock functionality - add a new article to demonstrate refresh
        const newArticle = {
          title: `New Article - ${new Date().toLocaleTimeString()}`,
          link: `https://example.com/article-${Date.now()}`
        };
        setArticles(prev => [newArticle, ...prev]);
      } else {
        setError("Failed to fetch RSS feed. Please check your connection and try again.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="Enter RSS feed URL"
              value={rssFeedUrl}
              onChange={(e) => setRssFeedUrl(e.target.value)}
              className="flex-1"
              data-testid="input-rss-url"
            />
            <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
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
