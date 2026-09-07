import { Link } from "@tanstack/react-router";
import { Pizza, Instagram, Facebook, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Pizza className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Harvest Pizza
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ភីហ្សា Neapolitan ដុតអុសធ្វើពីគ្រឿងផ្សំតាមរដូវកាល និងក្នុងស្រុក។ ភ្លក់រសជាតិដ៏ឈ្ងុយឆ្ងាញ់។
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/thoeurnseyhat/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://web.facebook.com/sey.hat.199157"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              ស្វែងយល់បន្ថែម
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "ទំព័រដើម" },
                { to: "/menu", label: "ម៉ឺនុយ" },
                { to: "/about", label: "អំពីយើង" },
                { to: "/contact", label: "ទំនាក់ទំនង" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              ម៉ោងបើកដំណើរការ
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>ចន្ទ — ព្រហស្បតិ៍</span>
                <span>11:00 — 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>សុក្រ — សៅរ៍</span>
                <span>11:00 — 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>អាទិត្យ</span>
                <span>12:00 — 21:00</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              ទីតាំង
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>ទួលគោក, ភ្នំពេញ, កម្ពុជា</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>(+855) 996-987-77</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Harvest Pizza. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              គោលការណ៍ឯកជនភាព
            </a>
            <a href="#" className="hover:text-foreground">
              លក្ខខណ្ឌនៃសេវាកម្ម
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
