
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
                  <p className="text-sm text-muted-foreground">Last Updated: November 6, 2024</p>

                  <p>DevAura Labs ("us", "we", or "our") operates this website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

                  <h3>1. Information We Collect</h3>
                  <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                  
                  <h4>Personal Data</h4>
                  <p>While using our Service, especially during account creation and checkout, we may ask you to provide us with certain personally identifiable information, including but not limited to:</p>
                  <ul>
                    <li>Full Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing and Shipping Address</li>
                  </ul>

                  <h3>2. How We Use Your Data</h3>
                  <p>DevAura Labs uses the collected data for various purposes:</p>
                  <ul>
                    <li>To provide and maintain our Service, including processing your orders and enrollments.</li>
                    <li>To manage your account and provide you with customer support.</li>
                    <li>To notify you about changes to our Service or policies.</li>
                    <li>To send you marketing and promotional materials, from which you can opt-out at any time.</li>
                  </ul>

                  <h3>3. Data Sharing and Third Parties</h3>
                  <p>We do not sell or rent your personal data to third parties. However, we may share your information with trusted third-party service providers to facilitate our Service. This includes:</p>
                  <ul>
                    <li><strong>Payment Processors:</strong> To process your payments securely, we share transaction information with payment gateways like Razorpay. We do not store your full credit card or debit card information on our servers. Your payment data is encrypted and handled according to the PCI-DSS standards by the payment processor.</li>
                    <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service, who are obligated not to disclose or use your information for any other purpose.</li>
                  </ul>

                  <h3>4. Data Security</h3>
                  <p>The security of your data is important to us. We use industry-standard encryption and security protocols to protect your personal information. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

                  <h3>5. Your Data Protection Rights</h3>
                  <p>You have the right to access, update, or delete the information we have on you. You can do this at any time by accessing your account settings on the profile page or by contacting us directly.</p>

                  <h3>6. Changes to This Privacy Policy</h3>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>

                  <h3>7. Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
