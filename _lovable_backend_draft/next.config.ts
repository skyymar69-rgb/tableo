'use strict';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'], // replace with your allowed domains
  },
  env: {
    CUSTOM_ENV_VAR: 'your_value', // add your environment variables here
  },
  // Additional configurations can go here
};

module.exports = nextConfig;