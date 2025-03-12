/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        allowedOrigins: [
          'localhost:3000',
          'studious-doodle-wp6v45rv9p9hvv7r-3000.app.github.dev'
        ]
      }
    },
    reactStrictMode: false,
    images: {
      domains: ['hwoergrnshbhumndrgue.supabase.co', 'lh3.googleusercontent.com'],
    }
  }
  
  module.exports = nextConfig;
  