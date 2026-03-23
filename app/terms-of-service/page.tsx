'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
                            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
                            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
                    <div className="prose prose-invert max-w-none space-y-8">
                        {/* Agreement */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                            <p className="text-muted-foreground">
                                By accessing and using ScanMart ("Service," "Application," "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service. ScanMart reserves the right to update these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                            </p>
                        </section>

                        {/* Use License */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
                            <p className="text-muted-foreground">
                                ScanMart grants you a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes, subject to these Terms. You agree not to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Reverse engineer, decompile, or disassemble the Service</li>
                                <li>Use the Service for any unlawful or fraudulent purpose</li>
                                <li>Attempt to gain unauthorized access to the Service</li>
                                <li>Transmit viruses, malware, or harmful code</li>
                                <li>Scrape, crawl, or extract data without authorization</li>
                                <li>Impersonate or misrepresent your identity</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>
                        </section>

                        {/* User Accounts */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Account Creation</h3>
                            <p className="text-muted-foreground">
                                To use certain features of ScanMart, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and are fully responsible for all activities that occur under your account. You agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Provide accurate and complete information during registration</li>
                                <li>Keep your password secure and confidential</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Accept responsibility for all activities under your account</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Ages</h3>
                            <p className="text-muted-foreground">
                                You must be at least 13 years old to use ScanMart. By creating an account, you represent that you meet this age requirement.
                            </p>
                        </section>

                        {/* Vendor Terms */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Vendor Terms</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Vendor Registration</h3>
                            <p className="text-muted-foreground">
                                Vendors must provide accurate business information and obtain approval before accessing vendor features. ScanMart reserves the right to reject or revoke vendor status at any time.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Vendor Responsibilities</h3>
                            <p className="text-muted-foreground">
                                Vendors agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Maintain accurate and up-to-date product information</li>
                                <li>Process transactions promptly and securely</li>
                                <li>Comply with all applicable laws and regulations</li>
                                <li>Not engage in fraudulent or deceptive practices</li>
                                <li>Maintain appropriate security measures for customer data</li>
                                <li>Respond to customer inquiries and issues professionally</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Product Information</h3>
                            <p className="text-muted-foreground">
                                Vendors are responsible for ensuring all product information (descriptions, prices, barcodes) is accurate and current. ScanMart is not liable for errors in vendor-provided information.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.4 Payment Terms</h3>
                            <p className="text-muted-foreground">
                                Payments are processed through Razorpay. Vendors authorize ScanMart to collect transaction fees. Payouts will be made according to the schedule communicated at account creation. Vendors are responsible for accurate tax reporting.
                            </p>
                        </section>

                        {/* Intellectual Property */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property Rights</h2>
                            <p className="text-muted-foreground">
                                ScanMart and its contents (including but not limited to logos, text, graphics, code, and design) are the exclusive property of ScanMart and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or transmit any content without explicit written permission.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                User-generated content (order data, feedback) is owned by you, but you grant ScanMart a worldwide, royalty-free license to use it for service improvement and analytics.
                            </p>
                        </section>

                        {/* Payment Terms */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Payment and Pricing</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.1 Payment Methods</h3>
                            <p className="text-muted-foreground">
                                ScanMart accepts payments through multiple methods including credit cards, debit cards, digital wallets, and cash (for vendors). All payments are processed securely through Razorpay.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.2 Pricing</h3>
                            <p className="text-muted-foreground">
                                Prices for products are set by individual vendors and may change at any time. ScanMart may also charge service fees or transaction fees at our discretion.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">6.3 Refunds</h3>
                            <p className="text-muted-foreground">
                                Refund policies are determined by individual vendors. ScanMart facilitates refunds but is not responsible for vendor refund decisions. Disputes should be directed to the relevant vendor.
                            </p>
                        </section>

                        {/* Warranty Disclaimer */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Disclaimers and Warranties</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.1 "As Is" Basis</h3>
                            <p className="text-muted-foreground">
                                The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either expressed or implied. ScanMart disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.2 Service Availability</h3>
                            <p className="text-muted-foreground">
                                While we strive for high availability, ScanMart does not guarantee uninterrupted access. We are not liable for downtime, data loss, or service interruptions due to maintenance, updates, or technical issues.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                To the fullest extent permitted by law, ScanMart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunity, arising from your use or inability to use the Service.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Our total liability shall not exceed the amount you paid for the Service in the past 12 months. Some jurisdictions do not allow the exclusion of certain warranties, so some limitations may not apply to you.
                            </p>
                        </section>

                        {/* Indemnification */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Indemnification</h2>
                            <p className="text-muted-foreground">
                                You agree to indemnify, defend, and hold harmless ScanMart and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
                            </p>
                        </section>

                        {/* Acceptable Use Policy */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">10. Acceptable Use Policy</h2>
                            <p className="text-muted-foreground">
                                You agree to use ScanMart only for lawful purposes and in ways that do not infringe upon the rights of others or restrict their use and enjoyment. Prohibited behavior includes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Harassment, abuse, or threats toward other users</li>
                                <li>Posting offensive, defamatory, or libelous content</li>
                                <li>Engaging in fraudulent or deceptive practices</li>
                                <li>Violating any laws or regulations</li>
                                <li>Attempting to manipulate reviews or ratings</li>
                            </ul>
                        </section>

                        {/* Termination */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">11. Termination</h2>
                            <p className="text-muted-foreground">
                                ScanMart may terminate or suspend your account at any time, with or without cause, and without notice. Upon termination, your right to use the Service ceases immediately. Any provisions that should survive termination (such as intellectual property and liability limitations) shall remain in effect.
                            </p>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">12. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding arising from these Terms shall be exclusively within the jurisdiction of courts located in India.
                            </p>
                        </section>

                        {/* Dispute Resolution */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">13. Dispute Resolution</h2>
                            <p className="text-muted-foreground">
                                In the event of a dispute, you agree to first attempt resolution through good faith negotiation. If negotiation fails, disputes may be resolved through arbitration or mediation as agreed upon by both parties.
                            </p>
                        </section>

                        {/* Severability */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">14. Severability</h2>
                            <p className="text-muted-foreground">
                                If any provision of these Terms is found to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid, or if not possible, severed, and the remaining provisions shall continue in full force and effect.
                            </p>
                        </section>

                        {/* Entire Agreement */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">15. Entire Agreement</h2>
                            <p className="text-muted-foreground">
                                These Terms, along with our Privacy Policy, constitute the entire agreement between you and ScanMart regarding the Service and supersede all prior agreements and understandings.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have any questions regarding these Terms of Service, please contact us at:
                            </p>
                            <div className="bg-muted/50 border border-border rounded-lg p-6 mt-4">
                                <p className="text-foreground font-semibold">ScanMart Support</p>
                                <p className="text-muted-foreground">Email: support@scanmart.com</p>
                                <p className="text-muted-foreground">Legal: legal@scanmart.com</p>
                            </div>
                        </section>

                        {/* Acknowledgment */}
                        <section className="mt-12 pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                By creating an account or using ScanMart, you acknowledge that you have read and understood these Terms of Service and agree to be bound by all of its terms and conditions.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
