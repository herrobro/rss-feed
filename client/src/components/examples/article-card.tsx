import { ArticleCard } from "../article-card";
import { ThemeProvider } from "../theme-provider";

export default function ArticleCardExample() {
  const mockArticle = {
    title: "Understanding Modern Web Development Best Practices",
    link: "https://example.com/article-1"
  };

  return (
    <ThemeProvider>
      <div className="p-4 max-w-3xl">
        <ArticleCard article={mockArticle} />
      </div>
    </ThemeProvider>
  );
}
