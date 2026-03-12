import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/seo/json-ld'
import { 
  baseMetadata, 
  baseViewport,
  organizationSchema, 
  websiteSchema, 
  softwareAppSchema 
} from '@/lib/seo'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

// Export metadata and viewport from centralized SEO files
export const metadata = baseMetadata
export const viewport = baseViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd schema={[organizationSchema, websiteSchema, softwareAppSchema]} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
