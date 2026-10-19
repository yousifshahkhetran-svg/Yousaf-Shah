# Lumina Gallery - Responsive Image Landing & Gallery Website

A modern, high-performance, mobile-responsive image landing and gallery website built with React, TypeScript, and Tailwind CSS. Designed specifically for static hosting on Cloudflare Pages.

---

## Features

- **Page 1 — Sample Landing Page**:
  - Centered hero sample image (strictly non-clickable, protecting user intent).
  - Prominent "View All Pictures" action button directing visitors to the gallery.
  - Responsive, fast, and accessible layout on mobile phones, tablets, and desktops.
- **Page 2 — Image Gallery**:
  - Responsive 6-image grid (3 columns on desktop, 2 columns on mobile).
  - Each image has its own image URL and destination URL.
  - Standard HTML anchor links that open destination URLs directly in the **same tab**.
  - Built-in zero-broken-image fallback system (if an image fails to load, a clean placeholder renders gracefully).
  - No popups, no redirects, no hidden scripts, and no forced advertisements.
- **Additional Pages**:
  - **Privacy Policy**: Honest, accurate privacy policy outlining data practices and third-party link disclaimers.
  - **Contact Page**: Clean contact form and support information without invented email addresses or phone numbers.
- **Interactive Admin Panel (`/admin`)**:
  - Visually customize image assignments and displayed captions for all 6 gallery pictures and the landing sample image.
  - 1-click thumbnail selector from all 6 preserved uploaded images in `src/assets/images/`.
  - Instant live grid preview and localStorage persistence.
  - 1-click "Export Code" generator to keep static code in sync.
- **Single-File Configuration**: Customize title, images, destinations, button text, and captions in `src/config/siteConfig.ts` or via `/admin`.

---

## Quick Start (Run Locally)

### 1. Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:3000` to view the live website.

---

## Where to Change Image URLs and Destination Links

All URLs, captions, and text are stored in a single configuration file:
👉 **`src/config/siteConfig.ts`**

You **do not** need to edit any React components or HTML files.

### Configuration Guide

Open `src/config/siteConfig.ts` in your code editor. You will see:

```typescript
export const siteConfig: SiteConfig = {
  // 1. Website Title displayed across the header and landing page
  title: "My Image Gallery",
  
  // 2. Optional subtitle
  tagline: "Curated Visual Collection & Destination Directory",

  // 3. PAGE 1: Large sample image (Non-clickable)
  sampleImage: "https://your-domain.com/sample.jpg",
  sampleImageCaption: "Featured Landscape Showcase",

  // 4. Primary button label on the landing page
  buttonText: "View All Pictures",

  // 5. PAGE 2: 6 Gallery images with their own destination URLs
  images: [
    {
      id: 1,
      imageUrl: "https://your-domain.com/image1.jpg",
      destinationUrl: "https://example.com/destination1",
      caption: "Picture 1"
    },
    {
      id: 2,
      imageUrl: "https://your-domain.com/image2.jpg",
      destinationUrl: "https://example.com/destination2",
      caption: "Picture 2"
    },
    {
      id: 3,
      imageUrl: "https://your-domain.com/image3.jpg",
      destinationUrl: "https://example.com/destination3",
      caption: "Picture 3"
    },
    {
      id: 4,
      imageUrl: "https://your-domain.com/image4.jpg",
      destinationUrl: "https://example.com/destination4",
      caption: "Picture 4"
    },
    {
      id: 5,
      imageUrl: "https://your-domain.com/image5.jpg",
      destinationUrl: "https://example.com/destination5",
      caption: "Picture 5"
    },
    {
      id: 6,
      imageUrl: "https://your-domain.com/image6.jpg",
      destinationUrl: "https://example.com/destination6",
      caption: "Picture 6"
    }
  ],

  // 6. Contact & Privacy Information
  contact: {
    email: "your-email@example.com", // Or leave empty ""
    description: "Have a question regarding this gallery? Send us a message below.",
    responseExpectation: "Inquiries are typically reviewed within 1–2 business days."
  },
  privacy: {
    lastUpdated: "October 2026",
    contactNotice: "If you have questions about privacy, please reach out via our contact page."
  }
};
```

### Steps to Replace with Your Own Links:
1. Open `src/config/siteConfig.ts`.
2. Locate `sampleImage`: Paste your landing image URL here.
3. In the `images` array:
   - Paste each picture's image file link into `imageUrl`.
   - Paste the external website link into `destinationUrl`.
   - Adjust `caption` to describe the picture or leave as desired.
4. Save the file. The website updates automatically.

---

---

## Deployment to Netlify

This website is fully configured for deployment on Netlify with pre-configured SPA routing redirects (`netlify.toml` and `public/_redirects`).

### Method 1: Netlify Drop (Instant Drag-and-Drop, No Git Required)
1. Build the production files:
   ```bash
   npm run build
   ```
2. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
3. Drag and drop the `dist` folder directly onto the upload area.
4. Netlify will publish your site in seconds with a live HTTPS URL!

### Method 2: Connect via GitHub / GitLab
1. Push your repository to GitHub or GitLab.
2. In the Netlify dashboard, click **"Add new site"** > **"Import an existing project"**.
3. Choose your repository.
4. Netlify automatically detects the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

---

## Deployment to Cloudflare Pages

This website is pre-configured for static hosting on Cloudflare Pages. The `public/_redirects` file is included to handle client-side routing (`/*  /index.html  200`) seamlessly.

### Method A: Connect with GitHub / GitLab (Recommended)
1. Push your repository to GitHub or GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository and specify the build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` or `20` (in Environment Variables, set `NODE_VERSION = 20`)
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy your site to a global CDN.

### Method B: Direct Upload via Cloudflare Dashboard
1. Build the production bundle locally:
   ```bash
   npm run build
   ```
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Pages** > **Upload assets**.
3. Drag and drop the generated `dist` folder directly into the Cloudflare upload window.
4. Name your project and click **Deploy site**.

### Method C: Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name=my-image-gallery
```

---

## Policy & Compliance Guarantee

- **Transparent Links**: All gallery images use standard HTML anchor links (`<a>`). Clicking an image opens the destination URL directly in the same browser tab.
- **No Cloaking or Deceptive Redirects**: Links resolve directly without intermediary ad gates, timer redirects, or script hooks.
- **Zero Aggressive Ads or Popups**: No forced popups, popunders, or misleading download banners.
- **Accessible & Clean**: Full keyboard navigation, semantic HTML, and responsive touch targets.
