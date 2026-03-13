"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, Twitter, Instagram, Linkedin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hardiksoni019@gmail.com",
    href: "mailto:hardiksoni019@gmail.com",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9661850789",
    href: "tel:+15551234567",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Patna, Bihar, India",
    href: "#",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white" 
  },
]

const socialLinks = [
  { href: "https://twitter.com/scanmart", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/scanmart", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/scanmart", icon: Linkedin, label: "LinkedIn" },
  { href: "https://facebook.com/scanmart", icon: Facebook, label: "Facebook" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="border-none bg-card shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-lg bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
                  <p className="mt-2 text-green-700">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="mt-2"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="mt-2"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        className="mt-2 resize-none"
                      />
                    </Field>

                    <Button
                      type="submit"
                      className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
              <p className="mt-2 text-muted-foreground">
                We&apos;re here to help and answer any questions you might have.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-start gap-4 rounded-lg bg-card p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${info.color}`}>
                    <info.icon className={`${info.textColor} h-6 w-6`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Notify Me Section */}
            <Card className="border-none bg-primary shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary-foreground">
                  Get Notified on Launch
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Be the first to know when ScanMart launches in your area.
                </p>
                <div className="mt-4 flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button variant="secondary" className="shrink-0">
                    Notify Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
