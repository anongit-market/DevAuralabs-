
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-6">
                <div 
                  className="prose prose-invert lg:prose-lg max-w-none"
                >
                  <h2>Terms of Service for DevAura Labs</h2>
                  <p className="text-sm text-muted-foreground">Last Updated: November 6, 2024</p>
                  
                  <h3>1. Acceptance of Terms</h3>
                  <p>Welcome to DevAura Labs. By accessing our website, creating an account, or purchasing our products and services (including courses, skill programs, and hardware), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of the terms, you are prohibited from using or accessing this site.</p>

                  <h3>2. User Accounts</h3>
                  <p>To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>

                  <h3>3. Payments, Billing, and Pricing</h3>
                  <p>All payments for products and services are processed through our third-party payment gateway, Razorpay. By making a purchase, you agree to abide by Razorpay's terms of service. All prices are listed in Indian Rupees (INR) or US Dollars (USD) and are subject to change without notice. We are not responsible for pricing, typographical, or other errors in any offer by us and we reserve the right to cancel any orders arising from such errors.</p>
                  
                  <h3>4. Intellectual Property & Content Usage</h3>
                  <p>All content provided on DevAura Labs, including courses, videos, text, graphics, logos, and software, is the property of DevAura Labs or its content suppliers and is protected by international copyright laws. Upon purchase, you are granted a limited, non-exclusive, non-transferable license to access and view the content for your personal, non-commercial use. You are strictly prohibited from recording, sharing, reselling, or distributing any of our content.</p>

                  <h3>5. Hardware Products</h3>
                  <p>All hardware sales are subject to availability. We reserve the right to discontinue any product at any time. Please review our Return & Refund Policy for details on hardware returns and warranty.</p>

                  <h3>6. Limitation of Liability</h3>
                  <p>In no event shall DevAura Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                  <h3>7. Governing Law</h3>
                  <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

                  <h3>8. Changes to Terms</h3>
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                  <h3>9. Contact Us</h3>
                  <p>If you have any questions about these Terms, please contact us through our contact page.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
