/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost'], // Adicione 'localhost' como domínio permitido
  },
}

module.exports = nextConfig
