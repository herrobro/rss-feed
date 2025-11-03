import { ArticleList } from "../article-list";
import { ThemeProvider } from "../theme-provider";

export default function ArticleListExample() {
  const mockArticles = [
    {
      title: "Getting Started with TypeScript in 2025",
      link: "https://example.com/typescript-guide"
    },
    {
      title: "Best Practices for React Component Design",
      link: "https://example.com/react-components"
    },
    {
      title: "Understanding CSS Grid and Flexbox",
      link: "https://example.com/css-layout"
    }
  ];

  return (
    <ThemeProvider>
      <div className="p-4 max-w-3xl mx-auto">
        <ArticleList articles={mockArticles} />
      </div>
    </ThemeProvider>
  );
}
