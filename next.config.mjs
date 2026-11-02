/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
            "source": "/author/elena-marquez",
            "destination": "/author/emily-carter",
            "permanent": true
      },
      {
            "source": "/author/daniel-whitmore",
            "destination": "/author/james-bennett",
            "permanent": true
      },
      {
            "source": "/author/amalia-hart",
            "destination": "/author/olivia-brooks",
            "permanent": true
      },
      {
            "source": "/author/louis-vogel",
            "destination": "/author/michael-reed",
            "permanent": true
      },
      {
            "source": "/author/priya-shah",
            "destination": "/author/sarah-mitchell",
            "permanent": true
      },
      {
            "source": "/author/miriam-keller",
            "destination": "/author/rachel-parker",
            "permanent": true
      }
];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
