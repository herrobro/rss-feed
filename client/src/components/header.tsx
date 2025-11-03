import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <h1 className="text-xl font-semibold" data-testid="text-dashboard-title">
          RSS Feed Dashboard
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
