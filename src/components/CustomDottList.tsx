import { For, Show, type JSX } from "solid-js";
import type { Dott, DottValue } from "../logic/dotts";
import { customDotts, hasCustomDotts } from "../logic/localStorage";
import Card from "./Card";
import DottUrl from "./DottUrl";

type Props = {
  onAfterItem?: (dott: Dott, value: DottValue) => JSX.Element;
};

export default function CustomDottList({ onAfterItem }: Props) {
  return (
    <Card class="space-y-4">
      <h2 class="text-2xl font-semibold">Your Custom Dotts</h2>
      <Show
        when={hasCustomDotts()}
        fallback={<p>You don't have any custom dotts.</p>}
      >
        <ul class="space-y-4">
          <For each={Object.entries(customDotts)}>
            {([key, value]) => (
              <li class="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-2 shadow-sm">
                <div>
                  <span class="w-fit rounded-md bg-gray-200 px-2 py-0.5 text-xs whitespace-nowrap">
                    .{key}
                  </span>{" "}
                  {value.name}
                  <div class="text-sm text-gray-600">
                    <DottUrl url={value.url} />
                  </div>
                  <div class="text-sm text-gray-600">
                    {value.keepSlashes && "Keeps slashes in path"}
                  </div>
                </div>
                {onAfterItem && onAfterItem(key as Dott, value)}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </Card>
  );
}
