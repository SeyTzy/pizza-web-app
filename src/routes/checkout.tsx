import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, LogIn, Minus, Plus, ShoppingBag, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart, type CartLine } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/menu-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "ទូទាត់ប្រាក់ — Harvest Pizza" },
      {
        name: "description",
        content: "ពិនិត្យការកុម្ម៉ង់ និងទូទាត់ប្រាក់សម្រាប់ខ្ចប់ ឬដឹកជញ្ជូននៅ Harvest Pizza។",
      },
    ],
  }),
  component: CheckoutPage,
});

const DELIVERY_FEE = 3;

type PlacedOrder = {
  number: string;
  lines: CartLine[];
  fulfillment: "pickup" | "delivery";
  name: string;
  address?: string | undefined;
  total: number;
};

function CheckoutPage() {
  const { lines, count, subtotal, setQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Card className="border-primary/30 bg-card text-center">
          <CardHeader className="items-center">
            <CheckCircle2 className="h-14 w-14 text-primary" />
            <CardTitle className="font-display text-3xl">ការកុម្ម៉ង់បានទទួលជោគជ័យ!</CardTitle>
            <CardDescription>
              អរគុណ{placedOrder.name ? ` ${placedOrder.name}` : ""}! ការកុម្ម៉ង់លេខ{" "}
              <span className="font-semibold text-foreground">{placedOrder.number}</span> របស់អ្នកកំពុងត្រូវបានរៀបចំ។
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-left text-sm">
              <p className="font-medium text-foreground">
                {placedOrder.fulfillment === "pickup"
                  ? "ខ្ចប់នៅ Harvest Pizza ទួលគោក"
                  : `ដឹកជញ្ជូនទៅកាន់ ${placedOrder.address}`}
              </p>
              <Separator className="my-3" />
              {placedOrder.lines.map(({ item, qty }) => (
                <div key={item.id} className="flex justify-between py-1 text-muted-foreground">
                  <span>
                    {qty}× {item.name}
                  </span>
                  <span>{formatPrice(item.price * qty)}</span>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between font-semibold text-foreground">
                <span>សរុប</span>
                <span>{formatPrice(placedOrder.total)}</span>
              </div>
            </div>
            <Button asChild variant="outline" className="border-primary/30 text-foreground">
              <Link to="/menu">ត្រឡប់ទៅម៉ឺនុយវិញ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold text-foreground">កន្ត្រករបស់អ្នកទទេស្អាត</h1>
        <p className="max-w-sm text-muted-foreground">
          បន្ថែមភីហ្សាដុតអុសដ៏ឈ្ងុយឆ្ងាញ់មុនពេលទូទាត់ប្រាក់។
        </p>
        <Button asChild size="lg">
          <Link to="/menu">មើលម៉ឺនុយ</Link>
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-muted/30 px-4 py-16">
        <Card className="w-full max-w-md border-border bg-card text-center">
          <CardHeader className="items-center">
            <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">ចូលគណនីដើម្បីទូទាត់ប្រាក់</CardTitle>
            <CardDescription>
              អ្នកត្រូវការគណនីដើម្បីកុម្ម៉ង់។ ចូលគណនី ឬបង្កើតគណនីថ្មីក្នុងរយៈពេលប៉ុន្មានវិនាទី — កន្ត្រករបស់អ្នកនឹងត្រូវបានរក្សាទុក។
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link to="/login" search={{ redirect: "/checkout" }}>
                <LogIn className="mr-2 h-4 w-4" />
                ចូលគណនី
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary/30 text-foreground"
            >
              <Link to="/register" search={{ redirect: "/checkout" }}>
                <UserPlus className="mr-2 h-4 w-4" />
                បង្កើតគណនី
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "សូមបញ្ចូលឈ្មោះរបស់អ្នក។";
    if (!phone.trim()) next["phone"] = "សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក។";
    if (fulfillment === "delivery" && !address.trim())
      next["address"] = "សូមបញ្ចូលអាសយដ្ឋានដឹកជញ្ជូនរបស់អ្នក។";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function placeOrder() {
    if (!validate()) return;
    const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
    setPlacedOrder({
      number: `HP-${Math.floor(100000 + Math.random() * 900000)}`,
      lines,
      fulfillment,
      name,
      address: fulfillment === "delivery" ? address.trim() : undefined,
      total: subtotal + deliveryFee,
    });
    clearCart();
  }

  const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;

  return (
    <div className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-foreground">ទូទាត់ប្រាក់</h1>
        <p className="mt-2 text-muted-foreground">
          ពិនិត្យការកុម្ម៉ង់របស់អ្នក ហើយប្រាប់យើងថាតើត្រូវយកទៅណា។
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Card className="lg:col-span-3 border-border bg-card">
            <CardHeader>
              <CardTitle className="font-display text-xl">ព័ត៌មានរបស់អ្នក</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <RadioGroup
                value={fulfillment}
                onValueChange={(value) => setFulfillment(value as "pickup" | "delivery")}
                className="grid grid-cols-2 gap-3"
              >
                <Label
                  htmlFor="pickup"
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                    fulfillment === "pickup"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="pickup" id="pickup" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">ខ្ចប់</p>
                    <p className="text-sm text-muted-foreground">រួចរាល់ក្នុងរយៈពេល ~20 នាទី</p>
                  </div>
                </Label>
                <Label
                  htmlFor="delivery"
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                    fulfillment === "delivery"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="delivery" id="delivery" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">ដឹកជញ្ជូន</p>
                    <p className="text-sm text-muted-foreground">
                      សេវា {formatPrice(DELIVERY_FEE)} · ~40 នាទី
                    </p>
                  </div>
                </Label>
              </RadioGroup>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">ឈ្មោះ</Label>
                  <Input
                    id="name"
                    placeholder="ឈ្មោះរបស់អ្នក"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors["name"] && <p className="text-xs text-destructive">{errors["name"]}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">លេខទូរស័ព្ទ</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(012) 345-678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors["phone"] && <p className="text-xs text-destructive">{errors["phone"]}</p>}
                </div>
              </div>

              {fulfillment === "delivery" && (
                <div className="space-y-1.5">
                  <Label htmlFor="address">អាសយដ្ឋានដឹកជញ្ជូន</Label>
                  <Input
                    id="address"
                    placeholder="ផ្ទះលេខ ១២៣ ផ្លូវ..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors["address"] && (
                    <p className="text-xs text-destructive">{errors["address"]}</p>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="notes">ចំណាំ (ស្រេចចិត្ត)</Label>
                <Textarea
                  id="notes"
                  placeholder="អាលែហ្សី ម្ទេសបន្ថែម..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={placeOrder}
              >
                កុម្ម៉ង់ឥឡូវនេះ · {formatPrice(subtotal + deliveryFee)}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                ការទូទាត់នឹងត្រូវធ្វើឡើងនៅពេលអ្នកទទួលបានការកុម្ម៉ង់។
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="self-start lg:col-span-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="font-display text-xl">សេចក្តីសង្ខេបនៃការកុម្ម៉ង់</CardTitle>
              <CardDescription>
                {count} មុខ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {lines.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => setQty(item.id, qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-5 text-center text-sm font-medium">{qty}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => setQty(item.id, qty + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {formatPrice(item.price * qty)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">សរុបរង</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">សេវាដឹកជញ្ជូន</span>
                  <span>{deliveryFee === 0 ? "ឥតគិតថ្លៃ" : formatPrice(deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold text-foreground">
                  <span>សរុប</span>
                  <span>{formatPrice(subtotal + deliveryFee)}</span>
                </div>
              </div>

              <Button asChild variant="ghost" className="w-full text-muted-foreground">
                <Link to="/menu">បន្ថែមមុខម្ហូបទៀត</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
