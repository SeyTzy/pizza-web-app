import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "ទំនាក់ទំនង — Harvest Pizza" },
      {
        name: "description",
        content:
          "ទំនាក់ទំនង Harvest Pizza សម្រាប់ការកក់តុ ការរៀបចំអាហារ ឬសំណួរនានា។ មកលេងយើងនៅទួលគោក។",
      },
      { property: "og:title", content: "ទំនាក់ទំនង — Harvest Pizza" },
      {
        property: "og:description",
        content: "ទំនាក់ទំនង Harvest Pizza សម្រាប់ការកក់តុ ការរៀបចំអាហារ ឬសំណួរនានា។",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              ទំនាក់ទំនង
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              កក់តុ សំណួររៀបចំអាហារ ឬគ្រាន់តែចង់សួរស្តី? យើងរង់ចាំស្តាប់ពីអ្នក។
            </p>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">មកលេងយើង</h2>
              <p className="mt-2 text-muted-foreground">
                យើងមានទីតាំងនៅទួលគោក រាជធានីភ្នំពេញ។
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">អាសយដ្ឋាន</h3>
                  <p className="text-muted-foreground">ទួលគោក, រាជធានីភ្នំពេញ,</p>
                  <p className="text-muted-foreground">កម្ពុជា</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">លេខទូរស័ព្ទ</h3>
                  <p className="text-muted-foreground">(+855) 996-987-77</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">អ៊ីមែល</h3>
                  <p className="text-muted-foreground">thoeeurnseyhat@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">ម៉ោងបើកដំណើរការ</h3>
                  <p className="text-muted-foreground">ចន្ទ — ព្រហស្បតិ៍៖ 11:00 — 22:00</p>
                  <p className="text-muted-foreground">សុក្រ — សៅរ៍៖ 11:00 — 23:00</p>
                  <p className="text-muted-foreground">អាទិត្យ៖ 12:00 — 21:00</p>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
              <iframe
                title="Harvest Pizza location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0!2d-73.99!3d40.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQwJzQ4LjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-card-foreground">
              ផ្ញើសារ
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              សម្រាប់ការកក់តុចាប់ពី 8 នាក់ឡើងទៅ សូមទាក់ទងមកយើងខ្ញុំផ្ទាល់តាមទូរស័ព្ទ។
            </p>
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("អរគុណសម្រាប់សាររបស់អ្នក! យើងនឹងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗនេះ។");
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">ឈ្មោះ</Label>
                  <Input id="name" placeholder="ឈ្មោះរបស់អ្នក" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">អ៊ីមែល</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">ប្រធានបទ</Label>
                <Input id="subject" placeholder="កក់តុ រៀបចំអាហារ សំណួរ..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">សារ</Label>
                <Textarea id="message" rows={5} placeholder="ប្រាប់យើងពីអ្វីដែលអ្នកត្រូវការ..." />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                ផ្ញើសារ
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">ឃ្លានឬនៅ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
            មើលម៉ឺនុយរបស់យើង និងស្វែងរកភីហ្សាដែលអ្នកចូលចិត្ត។
          </p>
          <div className="mt-8">
            <Link
              to="/menu"
              className={buttonVariants({
                size: "lg",
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
              })}
            >
              មើលម៉ឺនុយ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
