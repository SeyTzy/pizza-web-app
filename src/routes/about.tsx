import { createFileRoute } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import restaurant from "@/assets/pizza/restaurant.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "អំពីយើង — Harvest Pizza" },
      {
        name: "description",
        content:
          "ស្វែងយល់ពីរឿងរ៉ាវនៅពីក្រោយ Harvest Pizza ឡដុតអុស និងការប្តេជ្ញាចិត្តរបស់យើងចំពោះគ្រឿងផ្សំតាមរដូវកាល និងក្នុងស្រុក។",
      },
      { property: "og:title", content: "អំពីយើង — Harvest Pizza" },
      {
        property: "og:description",
        content:
          "ស្វែងយល់ពីរឿងរ៉ាវនៅពីក្រោយ Harvest Pizza ឡដុតអុស និងការប្តេជ្ញាចិត្តរបស់យើងចំពោះគ្រឿងផ្សំតាមរដូវកាល និងក្នុងស្រុក។",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              សាច់រឿងរបស់យើង
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              ហាងភីហ្សាក្នុងសហគមន៍ដែលបង្កើតឡើងដោយភ្លើង ម្សៅ និងផលិតផលស្រស់ៗពីកសិដ្ឋាន។
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-background shadow-xl">
            <img
              src={restaurant}
              alt="Cozy interior of Harvest Pizza with a wood-fired oven"
              width={1024}
              height={768}
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              ពី Naples ទៅ Brooklyn
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Harvest Pizza ត្រូវបានបង្កើតឡើងដោយក្រុមតូចមួយដែលមានចំណង់ចំណូលចិត្តតែមួយគត់៖ ភីហ្សា Neapolitan ដ៏ល្អឥតខ្ចោះ។ យើងបាននាំចូលឡដុតរបស់យើងពីទីក្រុង Naples ហ្វឹកហាត់ក្រោមស្នាដៃចុងភៅភីហ្សានៅ Campania ហើយបន្ទាប់មកចាប់ផ្តើមបង្កើតអ្វីមួយជារបស់ក្នុងស្រុក។
            </p>
            <p className="leading-relaxed text-muted-foreground">
              រៀងរាល់ព្រឹក យើងលាយម្សៅដោយដៃ ហើយទុកឲ្យវាឡើងមេរយៈពេល 48 ម៉ោង។ យើងអាំងខ្ទឹមស បុកប៉េងប៉ោះ San Marzano ដោយខ្លួនឯង និងបើកឡានទៅកសិដ្ឋានជិតៗដើម្បីយកបន្លែល្អបំផុតប្រចាំរដូវកាល។ លទ្ធផលគឺភីហ្សាដែលមានរសជាតិឆ្លុះបញ្ចាំងពីប្រភពដើមរបស់វាពិតៗ។
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <span className="font-display text-3xl font-bold text-primary">2016</span>
                <p className="text-sm text-muted-foreground">ឆ្នាំបើកដំណើរការ</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">900°F</span>
                <p className="text-sm text-muted-foreground">សីតុណ្ហភាពឡដុត</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">48h</span>
                <p className="text-sm text-muted-foreground">រយៈពេលបន្ទុំម្សៅ</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">12</span>
                <p className="text-sm text-muted-foreground">ដៃគូកសិដ្ឋានក្នុងស្រុក</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">
            ជំនឿរបស់យើង
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "គ្រឿងផ្សំសាមញ្ញ",
                body: "យើងប្រើប្រាស់គ្រឿងផ្សំតិចមុខ ប៉ុន្តែប្រភពច្បាស់លាស់។ ប្រសិនបើគ្រឿងផ្សំមិនទាន់ដល់រដូវកាល យើងសុខចិត្តរង់ចាំ។",
              },
              {
                title: "ធ្វើដោយដៃ",
                body: "ម្សៅគ្រប់ដុំត្រូវបានរុញដោយដៃ ទឹកជ្រលក់គ្រប់មុខធ្វើដោយផ្ទាល់ ហើយភីហ្សាគ្រប់ថាសត្រូវបានតាមដានយ៉ាងយកចិត្តទុកដាក់ក្នុងឡ។",
              },
              {
                title: "សហគមន៍ជាចម្បង",
                body: "យើងក៏រស់នៅទីនេះដែរ។ ក្រុមការងារ កសិដ្ឋាន និងអតិថិជនប្រចាំរបស់យើង សុទ្ធតែជាផ្នែកមួយនៃ Harvest។",
              },
            ].map((value) => (
              <div key={value.title} className="rounded-xl bg-background p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground">មកលេងយើងមក</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            យើងរង់ចាំជួបអ្នក។ កក់តុ ឬមកញ៉ាំនៅហាងផ្ទាល់។
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
            <Link
              to="/menu"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "border-primary/30 text-foreground",
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
