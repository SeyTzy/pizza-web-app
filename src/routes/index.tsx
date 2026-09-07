import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pizza, Flame, Clock, Leaf } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import heroPizza from "@/assets/pizza/hero.jpg";
import { useCart } from "@/lib/cart";
import { featuredPizzaIds, formatPrice, getMenuItem, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harvest Pizza — Wood-Fired Neapolitan Pizza in Brooklyn" },
      {
        name: "description",
        content:
          "Harvest Pizza serves wood-fired Neapolitan pizza with seasonal, local ingredients. Visit us in Brooklyn or order online.",
      },
      {
        property: "og:title",
        content: "Harvest Pizza — Wood-Fired Neapolitan Pizza in Brooklyn",
      },
      {
        property: "og:description",
        content:
          "Harvest Pizza serves wood-fired Neapolitan pizza with seasonal, local ingredients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featuredPizzas = featuredPizzaIds
  .map((id) => getMenuItem(id))
  .filter((pizza): pizza is MenuItem => pizza !== undefined);

function Index() {
  const { addItem } = useCart();
  const navigate = useNavigate();

  function addToCart(item: MenuItem) {
    addItem(item.id);
    toast.success(`បានបន្ថែម ${item.name} ទៅកន្ត្រករបស់អ្នក`);
  }

  function orderNow(item: MenuItem) {
    addItem(item.id);
    navigate({ to: "/checkout" });
  }
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Flame className="h-4 w-4" />
              ដុតអុស និងរុញដោយដៃ
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              ភីហ្សាធ្វើពីគ្រឿងផ្សំល្អបំផុតប្រចាំរដូវកាល។
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              ភីហ្សាស្តាយ Neapolitan ដុតក្នុងឡកម្ដៅ 900°F ជាមួយនឹងផលិតផលក្នុងស្រុក និងឈីសសិប្បកម្ម។ សាមញ្ញ ពិតៗ និងឆ្ងាញ់។
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-primary text-primary-foreground hover:bg-primary/90",
                })}
              >
                មើលម៉ឺនុយ
              </Link>
              <Link
                to="/contact"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "border-primary/30 text-foreground",
                })}
              >
                កក់តុ
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                បើករៀងរាល់ថ្ងៃ ម៉ោង 11ព្រឹក — 10យប់
              </span>
              <span className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                គ្រឿងផ្សំពីក្នុងស្រុក
              </span>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-background shadow-2xl shadow-primary/10">
            <img
              src={heroPizza}
              alt="Fresh wood-fired pizza with basil and melted mozzarella"
              width={1024}
              height={1024}
              className="size-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Featured pizzas */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                មុខម្ហូបពេញនិយមបំផុត
              </h2>
              <p className="mt-2 text-muted-foreground">
                ភីហ្សាបួនមុខដែលភ្ញៀវរបស់យើងតែងតែត្រឡប់មកញ៉ាំវិញ។
              </p>
            </div>
            <Link
              to="/menu"
              className={buttonVariants({
                variant: "outline",
                className: "border-primary/30 text-foreground",
              })}
            >
              មើលម៉ឺនុយពេញលេញ
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPizzas.map((pizza) => (
              <Card
                key={pizza.id}
                className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    width={1024}
                    height={1024}
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-display text-xl text-card-foreground">
                      {pizza.name}
                    </CardTitle>
                    <span className="font-display text-lg font-semibold text-primary">
                      {formatPrice(pizza.price)}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {pizza.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 text-foreground"
                      onClick={() => addToCart(pizza)}
                    >
                      បន្ថែម
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => orderNow(pizza)}
                    >
                      កុម្ម៉ង់ឥឡូវនេះ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                title: "ម្សៅទុករយៈពេល 48 ម៉ោង",
                body: "ទុកឱ្យឡើងមេយឺតៗដើម្បីបានសំបកស្រួយស្រាល និងទន់ល្មម។",
              },
              {
                title: "គ្រឿងផ្សំក្នុងស្រុក និងតាមរដូវកាល",
                body: "យើងយកបន្លែ សាច់ និងឈីសពីកសិដ្ឋានជិតៗនៅពេលដែលអាចធ្វើបាន។",
              },
              {
                title: "ឡដុតអុសកម្ដៅ 900°F",
                body: "សំបកឡើងពពុះ ឈីសរលាយ និងក្លិនឈ្ងុយផ្សែង។",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            តើអ្នកត្រៀមខ្លួនភ្លក់រសជាតិហើយឬនៅ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
            មកញ៉ាំនៅហាង នាំមិត្តភក្តិមកញ៉ាំអាហារពេលល្ងាច ឬកុម្ម៉ង់ខ្ចប់ក៏បាន។
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className={buttonVariants({
                size: "lg",
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
              })}
            >
              កក់តុ
            </Link>
            <Link
              to="/menu"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border border-primary-foreground/40 bg-primary text-primary-foreground shadow-lg shadow-black/10 hover:border-primary-foreground/60 hover:bg-primary/80",
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
