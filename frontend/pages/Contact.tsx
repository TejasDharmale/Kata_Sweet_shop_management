import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent", description: "Thanks! We'll get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthClick={() => {}} onCartClick={() => {}} onSearch={() => {}} searchQuery="" />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <Card className="p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-2">Name</label>
                <Input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <Input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <Textarea required placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}


