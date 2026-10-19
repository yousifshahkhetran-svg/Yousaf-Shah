/**
 * ==============================================================================
 * SITE CONFIGURATION
 * ==============================================================================
 * 
 * Edit this single file to customize your website.
 * 
 * You can easily update:
 *  - Website title
 *  - Sample landing image URL
 *  - Main button text ("View All Pictures")
 *  - 6 Gallery image URLs, their destination links, and optional captions
 *  - Contact and Privacy settings
 * 
 * HOW TO USE YOUR OWN IMAGES & DESTINATIONS:
 * 1. Replace the "sampleImage" URL with your landing image link.
 * 2. In the "images" array below, update each item's:
 *    - imageUrl: The direct URL to your hosted image (.jpg, .png, .webp)
 *    - destinationUrl: The external page visitors open when clicking that image
 *    - caption: (Optional) The text label displayed beneath or alongside the image
 * ==============================================================================
 */

export interface GalleryImage {
  id: number;
  imageUrl: string;
  destinationUrl: string;
  caption?: string;
}

export interface SiteConfig {
  /** The main title displayed across the header and landing page */
  title: string;
  /** A concise optional tagline displayed under the title */
  tagline?: string;
  /** Large sample image displayed in the center of Page 1 (Landing Page) */
  sampleImage: string;
  /** Optional caption or label for the sample image */
  sampleImageCaption?: string;
  /** Label for the navigation button on Page 1 (leads to Page 2 Gallery) */
  buttonText: string;
  /** Exactly 6 gallery items for Page 2 */
  images: GalleryImage[];
  /** Optional contact information displayed on the /contact page */
  contact: {
    email?: string;
    description: string;
    responseExpectation: string;
  };
  /** Privacy policy details */
  privacy: {
    lastUpdated: string;
    contactNotice: string;
  };
}

export const siteConfig: SiteConfig = {
  // Main title of your website
  title: "My Image Gallery",
  
  // Optional brief subtitle shown on the landing page
  tagline: "Curated Visual Collection & Destination Directory",

  // PAGE 1: Large sample image URL displayed on the landing page.
  // Note: The sample image on the landing page is not clickable.
  sampleImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
  sampleImageCaption: "Featured Landscape Showcase",

  // Button text on Page 1 that navigates visitors to Page 2
  buttonText: "View All Pictures",

  // PAGE 2: Exactly 6 gallery entries.
  // Each image has its own direct image URL and its assigned destination URL.
  // When a visitor clicks an image, its destination URL opens in the same browser tab.
  images: [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination1",
      caption: "Misty Mountain Vista"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination2",
      caption: "Emerald Forest Canopy"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination3",
      caption: "Golden Sunset Shoreline"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination4",
      caption: "Canyon Sunlight Beam"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination5",
      caption: "Starry Alpine Night"
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      destinationUrl: "https://example.com/destination6",
      caption: "Cascading Crystal Falls"
    }
  ],

  // Configuration for the Contact Page (does not invent unverified personal data)
  contact: {
    email: "", // Leave blank or add your designated contact email address here
    description: "Have a question regarding this gallery, image rights, or a listed destination URL? Send us a message below.",
    responseExpectation: "Inquiries are typically reviewed within 1–2 business days."
  },

  // Configuration for the Privacy Policy Page
  privacy: {
    lastUpdated: "October 2026",
    contactNotice: "If you have questions about privacy or this website's policies, please reach out via our contact page."
  }
};
