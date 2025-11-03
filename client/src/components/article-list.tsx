import { ArticleCard, type Article } from "./article-card";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="flex flex-col gap-4" data-testid="container-article-list">
      {articles.map((article, index) => (
        <ArticleCard key={`${article.link}-${index}`} article={article} />
      ))}
    </div>
  );
}
