import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartProvider } from "../lib/cart";
import { AuthProvider } from "../lib/auth";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">រកមិនឃើញទំព័រនេះទេ</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានប្តូរទីតាំង។
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          ទំព័រនេះមិនដំណើរការទេ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          មានបញ្ហាអ្វីមួយបានកើតឡើង។ អ្នកអាចសាកល្បងផ្ទុកទំព័រឡើងវិញ ឬត្រឡប់ទៅទំព័រដើម។
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            សាកល្បងម្តងទៀត
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            ត្រឡប់ទៅទំព័រដើម
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Harvest Pizza" },
      {
        name: "description",
        content: "ភីហ្សា Neapolitan ដុតអុសធ្វើពីគ្រឿងផ្សំតាមរដូវកាល និងក្នុងស្រុក។",
      },
      { name: "author", content: "Harvest Pizza" },
      { property: "og:title", content: "Harvest Pizza" },
      {
        property: "og:description",
        content: "ភីហ្សា Neapolitan ដុតអុសធ្វើពីគ្រឿងផ្សំតាមរដូវកាល និងក្នុងស្រុក។",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/pizza-logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/pizza-logo.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/pizza-logo.jpg", type: "image/jpeg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
