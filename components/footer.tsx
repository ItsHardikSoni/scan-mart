import Link from "next/link"
import Image from "next/image"
import { Scan, Twitter, Instagram, Linkedin, Facebook, Github, Globe } from "lucide-react"
import { siteConfig } from "@/lib/seo/config"

const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
}

const socialLinks = [
  { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.links.facebook, icon: Facebook, label: "Facebook" },
]

const developerSocialLinks = [
  { href: siteConfig.developer.social.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.developer.social.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.developer.social.github, icon: Github, label: "GitHub" },
  { href: siteConfig.developer.social.portfolio, icon: Globe, label: "Portfolio" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Scan className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ScanMart</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Scan. Shop. Go. – Skip the Queue
            </p>
            <p className="text-sm font-medium text-primary">
              Coming Soon on Android & iOS
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Email: {siteConfig.contact.email}
            </p>
          </div>
        </div>

        {/* Developer Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <p className="text-sm text-muted-foreground">Developed by</p>
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  src={siteConfig.developer.image}
                  alt={siteConfig.developer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {siteConfig.developer.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {siteConfig.developer.role}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {developerSocialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={`Developer ${social.label}`}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScanMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
