import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Flame, Milk, Wheat } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { extras, formatPrice, pizzas, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "ម៉ឺនុយរបស់យើង — Harvest Pizza" },
      {
        name: "description",
        content:
          "ស្វែងយល់ពីភីហ្សា Neapolitan ដុតអុស ម្ហូបញ៉ាំលេង សាឡាដ និងបង្អែមរបស់យើងនៅ Harvest Pizza។",
      },
      { property: "og:title", content: "ម៉ឺនុយរបស់យើង — Harvest Pizza" },
      {
        property: "og:description",
        content: "ស្វែងយល់ពីភីហ្សា Neapolitan ដុតអុស ម្ហូបញ៉ាំលេង សាឡាដ និងបង្អែមរបស់យើង។",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
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
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">ម៉ឺនុយរបស់យើង</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            អ្វីៗគ្រប់យ៉ាងគឺធ្វើដោយផ្ទាល់ ចាប់ពីការទុកម្សៅ 48 ម៉ោង រហូតដល់ការស្រក់ប្រេងអូលីវនៅដំណាក់កាលចុងក្រោយ។
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" /> បួស
            </span>
            <span className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" /> ហឹរ
            </span>
            <span className="flex items-center gap-2">
              <Milk className="h-4 w-4 text-primary" /> មានផ្ទុកជាតិទឹកដោះគោ
            </span>
            <span className="flex items-center gap-2">
              <Wheat className="h-4 w-4 text-primary" /> មានផ្ទុកជាតិគ្លុយតេន
            </span>
          </div>
        </div>
      </section>

      {/* Pizzas */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-foreground">
            ភីហ្សាដុតអុស
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pizzas.map((pizza) => (
              <Card
                key={pizza.name}
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
                  <div className="flex items-start justify-between gap-2">
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
                  <div className="mb-4 flex flex-wrap gap-2">
                    {pizza.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-secondary/30 text-secondary-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-primary/30 text-foreground"
                      onClick={() => addToCart(pizza)}
                    >
                      បន្ថែមចូលកន្ត្រក
                    </Button>
                    <Button
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

      {/* Extras */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-foreground">
            អាហារញ៉ាំលេង សាឡាដ និងបង្អែម
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((item) => (
              <Card key={item.id} className="flex flex-col border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-display text-lg text-card-foreground">
                      {item.name}
                    </CardTitle>
                    <span className="font-display font-semibold text-primary">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-foreground"
                    onClick={() => addToCart(item)}
                  >
                    បន្ថែមចូលកន្ត្រក
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground">ឃ្លានឬនៅ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            តេមកមុនដើម្បីកុម្ម៉ង់ខ្ចប់ ឬកក់តុដើម្បីទទួលបទពិសោធន៍ពេញលេញ។
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className={buttonVariants({
                size: "lg",
                className: "bg-primary text-primary-foreground hover:bg-primary/90",
              })}
            >
              កក់តុ
            </Link>
            <a
              href="tel:+15551234567"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "border-primary/30 text-foreground",
              })}
            >
              តេកុម្ម៉ង់ខ្ចប់
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
