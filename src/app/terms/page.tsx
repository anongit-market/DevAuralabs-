
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms & Policies</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-6">
                <div 
                  className="prose prose-invert lg:prose-lg max-w-none"
                >
                  <h2>Terms of Service for DevAura Labs</h2>
                  <p className="text-sm text-muted-foreground">Last Updated: [Date]</p>
                  
                  <h3>1. Introduction</h3>
                  <p>Welcome to DevAura Labs! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use DevAura Labs if you do not agree to all of the terms and conditions stated on this page.</p>

                  <h3>2. Intellectual Property Rights</h3>
                  <p>Other than the content you own, under these Terms, DevAura Labs and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this website.</p>

                  <h3>3. User Accounts</h3>
                  <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

                  <h3>4. Purchases</h3>
                  <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>

                  <h3>5. Termination</h3>
                  <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                  <h3>6. Governing Law</h3>
                  <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

                  <h3>7. Changes to Terms</h3>
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>

                  <h3>8. Contact Us</h3>
                  <p>If you have any questions about these Terms, please contact us at [Your Contact Email].</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
