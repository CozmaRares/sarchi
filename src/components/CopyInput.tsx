import { createSignal, Show } from "solid-js";
import Clipboard from "lucide-solid/icons/clipboard";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";

type Props = {
  value: string;
};

export default function CopyInput({ value }: Props) {
  const [isCopied, setIsCopied] = createSignal(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div class="flex flex-row items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
      <input
        type="text"
        value={value}
        readOnly
        class="h-10 flex-grow rounded-l-md px-3 py-2 font-mono text-sm ring-offset-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
      />
      <button
        class="flex size-10 items-center justify-center rounded-r-md ring-offset-gray-100 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
        onclick={copy}
      >
        <Show
          when={isCopied()}
          fallback={<Clipboard class="size-6" />}
        >
          <ClipboardCheck class="size-6" />
        </Show>
      </button>
    </div>
  );
}
