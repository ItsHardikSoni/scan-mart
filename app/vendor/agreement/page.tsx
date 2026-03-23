'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function VendorAgreementPage() {
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
                            href="/vendor/apply"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Application
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">Vendor Agreement</h1>
                            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
                    <div className="prose prose-invert max-w-none space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Vendor Partnership Agreement</h2>
                            <p className="text-muted-foreground">
                                This Vendor Agreement ("Agreement") is entered into between ScanMart ("Platform") and the vendor ("You" or "Vendor"). By applying to become a vendor on ScanMart, you agree to be bound by the terms and conditions of this Agreement.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                ScanMart is a peer-to-peer barcode scanning and smart POS platform that enables customers to scan products and process transactions efficiently.
                            </p>
                        </section>

                        {/* Eligibility */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Vendor Eligibility</h2>
                            <p className="text-muted-foreground">
                                To become a vendor on ScanMart, you must:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Be at least 18 years of age</li>
                                <li>Own or operate a legitimate retail store or business</li>
                                <li>Provide accurate business information and documentation</li>
                                <li>Obtain all necessary business licenses and permits</li>
                                <li>Comply with all local, state, and national regulations</li>
                                <li>Maintain proper tax registration (GST/TIN)</li>
                                <li>Have a valid business bank account for payouts</li>
                            </ul>
                        </section>

                        {/* Application and Approval */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Application and Approval Process</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.1 Application Requirements</h3>
                            <p className="text-muted-foreground">
                                All vendors must complete the application process and provide accurate information including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Store name and business details</li>
                                <li>Owner identification and contact information</li>
                                <li>GST number and tax registration</li>
                                <li>Store address and operational location</li>
                                <li>Product categories and inventory details</li>
                                <li>Bank account information for payouts</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.2 Approval and Verification</h3>
                            <p className="text-muted-foreground">
                                ScanMart reserves the right to verify all information provided and may reject applications that do not meet our standards. We may conduct background checks, verify business licenses, and contact you for additional documentation.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">3.3 Approval Notification</h3>
                            <p className="text-muted-foreground">
                                Approval decisions will be communicated via email. You will receive access to the vendor dashboard and billing interface upon approval.
                            </p>
                        </section>

                        {/* Vendor Responsibilities */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Vendor Responsibilities and Obligations</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.1 Product Management</h3>
                            <p className="text-muted-foreground">
                                As a vendor, you are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Maintaining accurate product information and pricing</li>
                                <li>Updating inventory and barcode data regularly</li>
                                <li>Ensuring all products are legally sellable</li>
                                <li>Displaying correct prices in the system and at the store</li>
                                <li>Managing product categorization and descriptions</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.2 Customer Service</h3>
                            <p className="text-muted-foreground">
                                You agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Process transactions accurately and promptly</li>
                                <li>Maintain professional conduct with all customers</li>
                                <li>Respond to customer inquiries within 24 hours</li>
                                <li>Resolve complaints and disputes fairly</li>
                                <li>Maintain customer data privacy and security</li>
                                <li>Honor refund policies and applicable regulations</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.3 Compliance and Legal Obligations</h3>
                            <p className="text-muted-foreground">
                                You agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Comply with all applicable laws and regulations</li>
                                <li>Maintain proper business licenses and permits</li>
                                <li>Pay all required taxes and statutory obligations</li>
                                <li>Not engage in fraud or deceptive practices</li>
                                <li>Comply with consumer protection laws</li>
                                <li>Maintain appropriate insurance coverage</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">4.4 Data Security</h3>
                            <p className="text-muted-foreground">
                                You agree to maintain reasonable security measures to protect customer data, including customer names, phone numbers, and order information. Unauthorized disclosure of customer data is a breach of this agreement.
                            </p>
                        </section>

                        {/* Billing and Payment */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Billing and Payment Terms</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.1 Payment Processing</h3>
                            <p className="text-muted-foreground">
                                ScanMart processes all customer payments through our payment gateway (Razorpay). You authorize ScanMart to collect transaction fees and platform charges from your revenue.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.2 Transaction Fees</h3>
                            <p className="text-muted-foreground">
                                Current transaction fees are 2-3% per transaction (subject to change with notice). Additional fees may apply for certain payment methods or high-value transactions. You will be notified of any fee changes 30 days in advance.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.3 Payouts</h3>
                            <p className="text-muted-foreground">
                                Payouts are processed weekly to your registered bank account, less applicable fees and charges. You must maintain accurate bank information. Failed payout attempts may delay your payments.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.4 Tax Reporting</h3>
                            <p className="text-muted-foreground">
                                You are solely responsible for reporting all income, filing tax returns, and paying applicable taxes. ScanMart will provide transaction summaries for your tax reporting purposes. You acknowledge that income from ScanMart is subject to applicable tax laws.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">5.5 Disputes and Chargebacks</h3>
                            <p className="text-muted-foreground">
                                In case of customer disputes or chargebacks, ScanMart will investigate and deduct the disputed amount from your account pending resolution. You agree to cooperate fully in dispute investigations.
                            </p>
                        </section>

                        {/* Intellectual Property */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property Rights</h2>
                            <p className="text-muted-foreground">
                                You retain ownership of product images and descriptions you provide. However, you grant ScanMart a worldwide, royalty-free license to display, reproduce, and distribute your product information on the platform. You agree not to infringe on third-party intellectual property rights.
                            </p>
                        </section>

                        {/* Termination */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination and Suspension</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.1 Vendor Termination</h3>
                            <p className="text-muted-foreground">
                                You may terminate your vendor account by providing written notice to ScanMart. Upon termination, your store will be immediately disabled, and payouts will cease after final transaction settlement.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.2 ScanMart Suspension/Termination</h3>
                            <p className="text-muted-foreground">
                                ScanMart may suspend or terminate your vendor account for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Violation of this agreement or applicable laws</li>
                                <li>Non-payment of fees or disputes</li>
                                <li>Multiple customer complaints or fraud allegations</li>
                                <li>Providing false or misleading information</li>
                                <li>Failure to maintain required documentation</li>
                                <li>Suspicious or illegal activity</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">7.3 Effect of Termination</h3>
                            <p className="text-muted-foreground">
                                Upon termination, all vendor access ends immediately. Any outstanding fees or disputes will be settled before final payout. Customer data will be retained per our privacy policy and applicable law.
                            </p>
                        </section>

                        {/* Liability and Indemnification */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Liability and Indemnification</h2>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">8.1 Vendor Liability</h3>
                            <p className="text-muted-foreground">
                                You are solely responsible for your products, store operations, and customer interactions. You agree to indemnify and hold harmless ScanMart from any claims, damages, or losses arising from your products, services, or violations of this agreement.
                            </p>

                            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">8.2 Limitation of Liability</h3>
                            <p className="text-muted-foreground">
                                ScanMart is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees you paid in the past 12 months. This limitation applies except where prohibited by law.
                            </p>
                        </section>

                        {/* Dispute Resolution */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Dispute Resolution</h2>
                            <p className="text-muted-foreground">
                                Any disputes arising from this agreement shall be resolved through:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Good faith negotiation between the parties</li>
                                <li>Mediation if negotiation fails</li>
                                <li>Arbitration or legal proceedings if mediation is unsuccessful</li>
                            </ol>
                            <p className="text-muted-foreground mt-4">
                                This agreement is governed by the laws of India and subject to the jurisdiction of Indian courts.
                            </p>
                        </section>

                        {/* Amendments and Modifications */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">10. Amendments and Modifications</h2>
                            <p className="text-muted-foreground">
                                ScanMart may update this agreement at any time by posting changes on the platform. Continued use of the platform after such changes constitutes acceptance. For material changes, we will provide 30 days' notice via email.
                            </p>
                        </section>

                        {/* Code of Conduct */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">11. Code of Conduct</h2>
                            <p className="text-muted-foreground">
                                As a vendor, you commit to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
                                <li>Treat all customers, employees, and ScanMart staff with respect</li>
                                <li>Maintain honest and transparent business practices</li>
                                <li>Not engage in discrimination or harassment</li>
                                <li>Not manipulate ratings, reviews, or transactions</li>
                                <li>Not engage in price fixing or anti-competitive practices</li>
                                <li>Report any suspicious or illegal activity immediately</li>
                            </ul>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact and Support</h2>
                            <p className="text-muted-foreground">
                                For questions, concerns, or support regarding this Vendor Agreement:
                            </p>
                            <div className="bg-muted/50 border border-border rounded-lg p-6 mt-4">
                                <p className="text-foreground font-semibold">ScanMart Vendor Support</p>
                                <p className="text-muted-foreground">Email: vendor@scanmart.com</p>
                                <p className="text-muted-foreground">Support Portal: vendor.scanmart.com/support</p>
                            </div>
                        </section>

                        {/* Acknowledgment */}
                        <section className="mt-12 pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                By clicking "I Accept" during the vendor registration process, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions of this Vendor Agreement and ScanMart's Terms of Service.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                This agreement constitutes the entire agreement between you and ScanMart regarding your vendor status and supersedes all prior agreements and understandings.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
