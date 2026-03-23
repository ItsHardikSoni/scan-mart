'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    const lastUpdated = "March 2026";

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                {/* Header */}
                <div className="border-b border-border bg-muted/30">
                    <div className="container mx-auto px-4 py-8 md:px-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
                            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
                    <div className="prose prose-invert max-w-none space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground">
                                Welcome to ScanMart ("we," "our," "us," or "Company"). ScanMart is committed to protecting your privacy. This Privacy Policy explains our data practices for our mobile application, website, and services (collectively, the "Service").
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Please read this Privacy Policy carefully. By accessing and using ScanMart, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.1 Information You Provide</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Account Information:</strong> When you register, we collect your name, email address, password, and phone number.</li>
                                <li><strong>Profile Information:</strong> For vendors, we collect store details, business information, and payment information.</li>
                                <li><strong>Order Information:</strong> We collect purchase history, cart items, payment methods, and shipping addresses.</li>
                                <li><strong>Communication:</strong> Messages, feedback, and support inquiries you send us.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.2 Information Collected Automatically</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers.</li>
                                <li><strong>Location Data:</strong> For store detection and location-based services (with your permission).</li>
                                <li><strong>Usage Analytics:</strong> How you interact with our Service, pages visited, and time spent.</li>
                                <li><strong>Barcode Scans:</strong> Products you scan and search history within the application.</li>
                                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and analytics tools to enhance user experience.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">2.3 Information from Third Parties</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Payment processors (Razorpay) for payment verification</li>
                                <li>Analytics providers for usage insights</li>
                                <li>Social media platforms if you connect your accounts</li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Provide, operate, and maintain our Service</li>
                                <li>Process transactions and send transaction confirmations</li>
                                <li>Improve and optimize user experience</li>
                                <li>Send promotional emails, announcements, and updates (with your consent)</li>
                                <li>Respond to your inquiries and customer support requests</li>
                                <li>Detect and prevent fraudulent transactions</li>
                                <li>Comply with legal obligations</li>
                                <li>Generate analytics and usage patterns for business improvement</li>
                            </ul>
                        </section>

                        {/* Data Sharing and Disclosure */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Third-Party Service Providers</h3>
                            <p className="text-muted-foreground">
                                We may share your information with third-party service providers who assist us in operating our Service, including payment processors, cloud hosting providers, and analytics services. These providers are contractually obligated to use your information only as necessary to provide services to us.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Vendor and Customer Data</h3>
                            <p className="text-muted-foreground">
                                Vendors can access customer order history to recognize repeat customers. Customer names and phone numbers are stored to facilitate better service.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Legal Requirements</h3>
                            <p className="text-muted-foreground">
                                We may disclose your information if required by law or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or that of others.
                            </p>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement industry-standard security measures including SSL encryption, secure password hashing, and secure API communications to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                If you suspect any unauthorized access to your account, please contact us immediately at support@scanmart.com.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
                            <p className="text-muted-foreground">
                                We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy. Order history and transaction records are retained for at least 7 years for compliance and business purposes. You may request deletion of your account by contacting our support team.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Privacy Rights</h2>
                            <p className="text-muted-foreground">Depending on your location, you may have the following rights:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li><strong>Access:</strong> You can request access to your personal information.</li>
                                <li><strong>Correction:</strong> You can request that we correct inaccurate data.</li>
                                <li><strong>Deletion:</strong> You can request deletion of your data (subject to legal requirements).</li>
                                <li><strong>Opt-Out:</strong> You can opt-out of marketing communications at any time.</li>
                                <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format.</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                To exercise any of these rights, please contact us at privacy@scanmart.com.
                            </p>
                        </section>

                        {/* Location-Based Services */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Location-Based Services</h2>
                            <p className="text-muted-foreground">
                                ScanMart uses location services to identify nearby stores and provide location-restricted features. Location data is only collected when you explicitly grant permission through your device settings. You can disable location services at any time through your device settings.
                            </p>
                        </section>

                        {/* Children's Privacy */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
                            <p className="text-muted-foreground">
                                ScanMart is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete such information and terminate the child's account.
                            </p>
                        </section>

                        {/* Third-Party Links */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">10. Third-Party Links</h2>
                            <p className="text-muted-foreground">
                                Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any personal information.
                            </p>
                        </section>

                        {/* Changes to This Policy */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy with a new "Last Updated" date. Your continued use of the Service after such modifications constitutes your acceptance of the updated Privacy Policy.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                            </p>
                            <div className="bg-muted/50 border border-border rounded-lg p-6 mt-4">
                                <p className="text-foreground font-semibold">ScanMart Support</p>
                                <p className="text-muted-foreground">Email: privacy@scanmart.com</p>
                                <p className="text-muted-foreground">Support: support@scanmart.com</p>
                            </div>
                        </section>

                        {/* Acknowledgment */}
                        <section className="mt-12 pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                By using ScanMart, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with our privacy practices, please do not use our Service.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
