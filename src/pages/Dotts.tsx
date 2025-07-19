import { createComputed, For } from "solid-js";
import { dotts, defaultDott } from "../logic/dotts";
import { customDotts } from "../logic/localStorage";
import Card from "../components/Card";

export default function Dotts() {
  let categories: ReturnType<typeof getCategories>;

  createComputed(() => {
    categories = getCategories();
  });

  return (
    <div class="max-w-2xl space-y-8">
      <h1 class="text-center text-4xl font-bold">Dott List</h1>
      <For each={Array.from(categories!.entries())}>
        {([category, dotts]) => (
          <DottList
            category={category}
            dotts={dotts}
          />
        )}
      </For>
    </div>
  );
}

type CategorizedDott = {
  d: string;
  n: string;
  u: string;
  k?: boolean;
};

function getCategories() {
  const categories = new Map<string, CategorizedDott[]>();

  const combinedDotts = { ...customDotts, ...dotts };

  for (const [key, value] of Object.entries(combinedDotts)) {
    if (!categories.has(value.c)) {
      categories.set(value.c, []);
    }

    categories.get(value.c)!.push({
      d: key,
      n: value.n,
      u: value.u,
      k: value.k,
    });
  }

  return categories;
}

type DottListProps = {
  category: string;
  dotts: CategorizedDott[];
};

function DottList({ category, dotts }: DottListProps) {
  return (
    <>
      <div class="flex flex-row items-center gap-2">
        <span class="h-[2px] flex-grow bg-gray-300"></span>
        <h2 class="text-2xl font-semibold">{category}</h2>
        <span class="h-[2px] flex-grow bg-gray-300"></span>
      </div>
      <ul class="space-y-4">
        <For each={dotts}>{dott => <DottItem {...dott} />}</For>
      </ul>
    </>
  );
}

function DottItem({ d, n, u, k }: CategorizedDott) {
  return (
    <li>
      <Card>
        <div class="flex flex-row items-end gap-2">
          <span class="font-mono text-lg font-bold">.{d}</span>
          {d === defaultDott && (
            <span class="text-sm text-gray-600">(default)</span>
          )}
        </div>
        <div class="text-gray-600">
          <div>Name: {n}</div>
          <div style="word-break: break-all;">
            URL:{" "}
            <span class="font-mono">
              <SearchUrl url={u} />
            </span>
          </div>
          {k && <div>Keeps slashes in path</div>}
        </div>
      </Card>
    </li>
  );
}

function SearchUrl({ url }: { url: string }) {
  const parts = url.split("%s");

  if (parts.length === 1) return parts[0];

  const [url1, url2] = parts;

  return (
    <>
      {url1}
      <span class="font-bold text-gray-950">%s</span>
      {url2}
    </>
  );
}
