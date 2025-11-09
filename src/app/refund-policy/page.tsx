
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RefundPolicyPage() {

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Return & Refund Policy</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-6">
                <div 
                className="prose prose-invert lg:prose-lg max-w-none"
                >
                  <h2>Return & Refund Policy for DevAura Labs</h2>
                  <p className="text-sm text-muted-foreground">Last Updated: [Date]</p>
                  
                  <p>Thank you for shopping at DevAura Labs. We appreciate the fact that you like to buy the stuff we build. We also want to make sure you have a rewarding experience while you’re exploring, evaluating, and purchasing our products.</p>

                  <h3>Digital Products (Courses & Skill Programs)</h3>
                  <p>We offer a <strong>3-Day Money-Back Guarantee</strong> on all our digital courses and skill development programs.</p>

                  <h4>Eligibility for a Refund:</h4>
                  <ul>
                    <li>You are eligible for a full refund if you request it within <strong>3 days</strong> of the purchase date.</li>
                    <li>To be eligible, you must not have completed more than <strong>20%</strong> of the course content.</li>
                    <li>Refund requests must be submitted to our support team via email.</li>
                  </ul>

                  <h4>How to Request a Refund:</h4>
                  <p>Please contact our support team at [Your Support Email] with your purchase details and the reason for your request. We will process your request within 5-7 business days.</p>

                  <h3>Hardware Products</h3>
                  <p>Due to the nature of custom-built hardware, all sales of physical products are final once the product has been shipped. If you receive a damaged or defective product, please contact us within 48 hours of delivery to arrange for a repair or replacement.</p>

                  <h3>Contact Us</h3>
                  <p>If you have any questions about our Returns and Refunds Policy, please contact us.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
