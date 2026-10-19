/**
 * ==============================================================================
 * SITE CONFIGURATION
 * ==============================================================================
 * 
 * Edit this single file or use the built-in /admin panel to customize your website.
 * 
 * All six uploaded images in src/assets/images are preserved and imported below.
 * ==============================================================================
 */

import image1 from '../assets/images/regenerated_image_1792413619865.jpg';
import image2 from '../assets/images/regenerated_image_1792413622421.png';
import image3 from '../assets/images/regenerated_image_1792413629309.jpg';
import image4 from '../assets/images/regenerated_image_1792413630953.jpg';
import image5 from '../assets/images/regenerated_image_1792413633440.jpg';
import image6 from '../assets/images/regenerated_image_1792413643226.jpg';

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

/**
 * Preserved catalog of your 6 uploaded images.
 * You can select any of these in the /admin panel or in code.
 */
export const uploadedImages = [
  { id: 1, name: 'Image 1 (Mountain / Landscape)', src: image1, filename: 'regenerated_image_1792413619865.jpg' },
  { id: 2, name: 'Image 2 (Forest / Nature)', src: image2, filename: 'regenerated_image_1792413622421.png' },
  { id: 3, name: 'Image 3 (Shoreline / Coast)', src: image3, filename: 'regenerated_image_1792413629309.jpg' },
  { id: 4, name: 'Image 4 (Canyon / Rock)', src: image4, filename: 'regenerated_image_1792413630953.jpg' },
  { id: 5, name: 'Image 5 (Night Sky / Mountain)', src: image5, filename: 'regenerated_image_1792413633440.jpg' },
  { id: 6, name: 'Image 6 (Waterfall / Lagoon)', src: image6, filename: 'regenerated_image_1792413643226.jpg' },
];

export const siteConfig: SiteConfig = {
  // Main title of your website
  title: "My Image Gallery",
  
  // Optional brief subtitle shown on the landing page
  tagline: "Curated Visual Collection & Destination Directory",

  // PAGE 1: Large sample image URL displayed on the landing page.
  // Note: The sample image on the landing page is not clickable.
  sampleImage: image1,
  sampleImageCaption: "Featured Landscape Showcase",

  // Button text on Page 1 that navigates visitors to Page 2
  buttonText: "View All Pictures",

  // PAGE 2: Exactly 6 gallery entries.
  // Each image has its own direct image URL and its assigned destination URL.
  // When a visitor clicks an image, its destination URL opens in the same browser tab.
  images: [
    {
      id: 1,
      imageUrl: image1,
      destinationUrl: "https://example.com/destination1",
      caption: "Misty Mountain Vista"
    },
    {
      id: 2,
      imageUrl: image2,
      destinationUrl: "https://example.com/destination2",
      caption: "Emerald Forest Canopy"
    },
    {
      id: 3,
      imageUrl: image3,
      destinationUrl: "https://example.com/destination3",
      caption: "Golden Sunset Shoreline"
    },
    {
      id: 4,
      imageUrl: image4,
      destinationUrl: "https://example.com/destination4",
      caption: "Canyon Sunlight Beam"
    },
    {
      id: 5,
      imageUrl: image5,
      destinationUrl: "https://example.com/destination5",
      caption: "Starry Alpine Night"
    },
    {
      id: 6,
      imageUrl: image6,
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
