import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu-data";

type CartSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { lines, count, subtotal, setQty, removeItem } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display">ការកុម្ម៉ង់របស់អ្នក</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "កន្ត្រករបស់អ្នកទទេ។"
              : `មាន ${count} មុខទំនិញក្នុងកន្ត្រករបស់អ្នក។`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">បន្ថែមអាហារឆ្ងាញ់ៗពីម៉ឺនុយរបស់យើង។</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link to="/menu">មើលម៉ឺនុយ</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="-mx-2 flex-1 space-y-4 overflow-y-auto px-2 py-4">
              {lines.map(({ item, qty }) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(item.price)} មួយ</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => setQty(item.id, qty - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">{qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => setQty(item.id, qty + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7 text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {formatPrice(item.price * qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>សរុប</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" onClick={() => onOpenChange(false)}>
                  <Link to="/checkout">ទូទាត់ប្រាក់</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-foreground"
                  onClick={() => onOpenChange(false)}
                >
                  <Link to="/menu">បន្ថែមមុខទំនិញ</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
