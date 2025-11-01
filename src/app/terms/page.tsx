
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  // In a real app, this content would be fetched from a CMS or database
  const termsContent = `
    Welcome to DevAura Labs. By accessing our website, you agree to these terms of service.
    
    1.  **Use of Service:** You agree to use our services for lawful purposes only.
    2.  **Intellectual Property:** All content on this site is the property of DevAura Labs.
    3.  **Limitation of Liability:** We are not liable for any damages arising from your use of this site.
    4.  **Governing Law:** These terms are governed by the laws of our jurisdiction.
    `;

  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert lg:prose-lg max-w-none text-muted-foreground">
            <p className="whitespace-pre-wrap">{termsContent}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
