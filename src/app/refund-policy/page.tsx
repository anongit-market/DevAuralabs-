
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
                  <p className="text-sm text-muted-foreground">Last Updated: November 6, 2024</p>
                  
                  <p>Thank you for purchasing our products at DevAura Labs. We are committed to ensuring your satisfaction. This policy outlines the conditions under which returns and refunds are processed.</p>

                  <h3>Digital Products (Courses & Skill Programs)</h3>
                  <p>We offer a conditional refund on our digital courses and skill development programs.</p>

                  <h4>Eligibility for a Refund:</h4>
                  <ul>
                    <li>You are eligible for a full refund if you request it within <strong>24 hours</strong> of the original purchase time.</li>
                    <li>To be eligible, you must not have completed more than <strong>20%</strong> of the course content. Our system tracks progress, and exceeding this limit will void your eligibility for a refund.</li>
                    <li>Refund requests must be submitted to our support team via email with your purchase details.</li>
                  </ul>

                  <h3>Hardware Products</h3>
                  <p>All hardware sales are considered final upon successful delivery.</p>
                  <ul>
                    <li>Once a hardware product has been delivered to your specified address, the order cannot be cancelled and is not eligible for a refund.</li>
                    <li>If you receive a product that is damaged in transit or defective, you must contact us within <strong>48 hours</strong> of delivery. Please provide photographic evidence of the damage. We will arrange for a repair or a replacement at our discretion.</li>
                  </ul>

                  <h3>How to Request a Refund</h3>
                  <p>To request a refund for a digital product, please contact our support team at our official support email with your order number and the reason for your request. We will review your request and process it within 5-7 business days if it meets the eligibility criteria.</p>

                  <h3>Contact Us</h3>
                  <p>If you have any questions about our Returns and Refunds Policy, please feel free to contact us.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
