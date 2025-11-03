import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Article {
  title: string;
  link: string;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      className="p-6 hover-elevate active-elevate-2 transition-transform duration-150 hover:scale-[1.01] cursor-pointer"
      onClick={() => window.open(article.link, "_blank", "noopener,noreferrer")}
      data-testid={`card-article-${article.link}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base leading-normal mb-2" data-testid="text-article-title">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate" data-testid="text-article-link">
            {article.link}
          </p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </Card>
  );
}
