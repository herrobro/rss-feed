import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { articlesResponseSchema } from "@shared/schema";

const N8N_WEBHOOK_URL = "https://n8n.homelabmanager.com/webhook-test/36fa5cac-e6da-4695-928c-afeb7b124128";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to fetch RSS feed via n8n webhook
  app.post("/api/rss-feed", async (req, res) => {
    try {
      const { rssFeedUrl } = req.body;

      if (!rssFeedUrl || typeof rssFeedUrl !== "string") {
        return res.status(400).json({ error: "RSS feed URL is required" });
      }

      // Validate URL format
      try {
        new URL(rssFeedUrl);
      } catch {
        return res.status(400).json({ error: "Invalid RSS feed URL format" });
      }

      // Call n8n webhook with the RSS feed URL
      console.log(`Calling n8n webhook with RSS URL: ${rssFeedUrl}`);
      
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rssFeedUrl }),
      });

      console.log(`n8n webhook response status: ${response.status}`);

      if (!response.ok) {
        console.error(`n8n webhook error: ${response.status} ${response.statusText}`);
        return res.status(502).json({ 
          error: `Failed to fetch RSS feed from webhook: ${response.statusText}` 
        });
      }

      // Get the response text first to handle empty responses
      const responseText = await response.text();
      console.log(`n8n webhook response body: ${responseText.substring(0, 200)}...`);

      if (!responseText || responseText.trim() === "") {
        console.error("n8n webhook returned empty response");
        return res.status(502).json({ 
          error: "The webhook returned an empty response. Please check your n8n workflow configuration." 
        });
      }

      // Parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse n8n webhook response as JSON:", parseError);
        return res.status(502).json({ 
          error: "The webhook returned an invalid response. Please check your n8n workflow configuration." 
        });
      }
      
      // Validate response data
      try {
        const articles = articlesResponseSchema.parse(data);
        console.log(`Successfully parsed ${articles.length} articles`);
        res.json(articles);
      } catch (validationError) {
        console.error("n8n webhook response validation failed:", validationError);
        return res.status(502).json({ 
          error: "The webhook returned data in an unexpected format. Expected an array of articles with 'title' and 'link' fields." 
        });
      }
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(500).json({ 
          error: "Invalid response format from webhook" 
        });
      }
      
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch RSS feed" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
