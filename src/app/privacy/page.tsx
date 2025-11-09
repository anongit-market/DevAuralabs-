
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="p-6">
                <div 
                className="prose prose-invert lg:prose-lg max-w-none"
                >
                  <h2>Privacy Policy for DevAura Labs</h2>
                  <p className="text-sm text-muted-foreground">Last Updated: [Date]</p>

                  <p>DevAura Labs ("us", "we", or "our") operates the website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>

                  <h3>1. Information Collection and Use</h3>
                  <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                  
                  <h4>Types of Data Collected</h4>
                  <ul>
                    <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, Phone number, Cookies and Usage Data.</li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data").</li>
                  </ul>

                  <h3>2. Use of Data</h3>
                  <p>DevAura Labs uses the collected data for various purposes:</p>
                  <ul>
                    <li>To provide and maintain the Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer care and support</li>
                    <li>To provide analysis or valuable information so that we can improve the Service</li>
                  </ul>

                  <h3>3. Data Security</h3>
                  <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.</p>

                  <h3>4. Your Data Protection Rights</h3>
                  <p>You have certain data protection rights. DevAura Labs aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>

                  <h3>5. Changes to This Privacy Policy</h3>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                  <h3>6. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
