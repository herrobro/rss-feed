# RSS Feed Dashboard

A modern web dashboard that integrates with n8n workflow to fetch and display RSS feed articles.

## Overview
This application provides a clean interface for viewing RSS feed articles. Users enter an RSS feed URL, which is sent to an n8n webhook that processes the feed and returns a list of articles with titles and links.

## Architecture

### Frontend (React + TypeScript)
- **Dashboard Page**: Main interface with RSS feed input and article display
- **Components**:
  - `Header`: Top navigation with theme toggle
  - `ThemeProvider`: Light/dark mode management with localStorage persistence
  - `ArticleCard`: Individual article display with external link
  - `ArticleList`: Collection of article cards
  - `RefreshButton`: Button to reload the current feed
  - `EmptyState`: Displayed when no articles are loaded
  - `LoadingSkeleton`: Loading state during API calls
  - `ErrorBanner`: Error message display with dismiss functionality

### Backend (Express.js)
- **API Route** (`POST /api/rss-feed`):
  - Accepts RSS feed URL from frontend
  - Proxies request to n8n webhook
  - Validates response format
  - Returns array of articles (title, link)

### n8n Integration
- **Webhook URL**: `https://n8n.homelabmanager.com/webhook-test/36fa5cac-e6da-4695-928c-afeb7b124128`
- **Request Format**: 
  ```json
  {
    "rssFeedUrl": "https://example.com/feed.xml"
  }
  ```
- **Expected Response Format**: 
  ```json
  [
    {
      "title": "Article Title",
      "link": "https://example.com/article-1"
    },
    {
      "title": "Another Article",
      "link": "https://example.com/article-2"
    }
  ]
  ```

#### n8n Workflow Requirements
Your n8n workflow must:
1. Accept a POST request with JSON body containing `rssFeedUrl`
2. Fetch and parse the RSS feed from the provided URL
3. Extract article titles and links
4. Return a JSON array of objects with `title` and `link` fields
5. Both fields must be valid strings (link must be a valid URL)

#### Error Handling
The dashboard handles various error scenarios:
- Empty webhook response → "The webhook returned an empty response. Please check your n8n workflow configuration."
- Invalid JSON → "The webhook returned an invalid response. Please check your n8n workflow configuration."
- Wrong data format → "The webhook returned data in an unexpected format. Expected an array of articles with 'title' and 'link' fields."

## Features
- RSS feed URL input with validation
- Load Feed button to fetch articles from n8n webhook
- Refresh button to reload the current feed
- Light/dark theme toggle with persistent preference
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- External link indicators on article cards
- Keyboard support (Enter key to submit)

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend**: Express.js, Node.js
- **Styling**: Tailwind CSS with custom design system
- **Font**: Inter (UI), JetBrains Mono (monospace)

## User Preferences
- Modern, clean dashboard aesthetic
- Light and dark mode support
- Minimal visual noise, focus on content
- Responsive across all devices
