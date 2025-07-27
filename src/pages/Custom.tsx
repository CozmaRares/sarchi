import { createSignal, For, Show, type Accessor, type Setter } from "solid-js";
import { Trash2, Pencil } from "lucide-solid";
import Card from "../components/Card";
import {
  addCustomDott,
  customDotts,
  deleteCustomDott,
  getCustomDott,
  hasCustomDotts,
} from "../logic/localStorage";

const defaultFormData = {
  key: "",
  name: "",
  url: "",
  keepSlashes: false,
};

const defaultFormError = {
  key: null,
  name: null,
  url: null,
};

type FormData = typeof defaultFormData;
type FormError = Record<keyof typeof defaultFormError, string | null>;

export default function Custom() {
  const [formData, setFormData] = createSignal<FormData>(defaultFormData);
  const [formError, setFormError] = createSignal<FormError>(defaultFormError);

  return (
    <div class="w-full max-w-4xl space-y-8">
      <div>
        <h1 class="text-center text-4xl font-bold">Custom Dotts</h1>
        <p class="mx-auto max-w-2/3 text-center text-lg text-balance text-gray-500">
          Very useful if you have your own version of the app and want to keep
          some URLs private (like your company's internal links).
        </p>
      </div>
      <DottForm
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        setFormError={setFormError}
      />
      <DottList setFormData={setFormData} />
    </div>
  );
}

type FormProps = {
  formData: Accessor<FormData>;
  setFormData: Setter<FormData>;
  formError: Accessor<FormError>;
  setFormError: Setter<FormError>;
};

function isUrlValid(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function DottForm({
  formData,
  setFormData,
  formError,
  setFormError,
}: FormProps) {
  const submitForm = (e: Event) => {
    e.preventDefault();

    const data = formData();

    const key = data.key;
    const name = data.name;
    const url = data.url;
    const keepSlashes = data.keepSlashes;

    let keyError: string | null = null;
    let nameError: string | null = null;
    let urlError: string | null = null;

    if (key.length === 0) keyError = "Required";

    if (name.length === 0) nameError = "Required";

    if (url.length === 0) urlError = "Required";
    else if (!isUrlValid(url)) urlError = "Invalid URL";

    setFormError({ key: keyError, name: nameError, url: urlError });

    if (Object.values(formError()).some(Boolean)) return;

    addCustomDott(key, { name, url, keepSlashes });
    setFormData(defaultFormData);
  };

  return (
    <Card class="space-y-4">
      <h2 class="text-2xl font-semibold">Add Custom Dott</h2>
      <form
        class="space-y-4"
        onsubmit={submitForm}
      >
        <div class="space-y-2">
          <div class="flex flex-row items-center gap-2">
            <label
              for="key"
              class="block text-sm text-gray-700"
            >
              Key
            </label>
            <Show when={formError().key}>
              <div class="text-sm text-red-600">{formError().key}</div>
            </Show>
          </div>
          <input
            type="text"
            name="key"
            id="key"
            class="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
            placeholder="e.g., g, yt, gh"
            value={formData().key}
            onChange={e =>
              setFormData(prev => ({ ...prev, key: e.target.value }))
            }
          />
        </div>
        <div class="space-y-2">
          <div class="flex flex-row items-center gap-2">
            <label
              for="name"
              class="block text-sm text-gray-700"
            >
              Name
            </label>

            <Show when={formError().name}>
              <div class="text-sm text-red-600">{formError().name}</div>
            </Show>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            class="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
            placeholder="e.g., Google, YouTube, GitHub"
            value={formData().name}
            onChange={e =>
              setFormData(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div class="space-y-2">
          <div class="flex flex-row items-center gap-2">
            <label
              for="url"
              class="block text-sm text-gray-700"
            >
              URL
            </label>

            <Show when={formError().url}>
              <div class="text-sm text-red-600">{formError().url}</div>
            </Show>
          </div>
          <input
            type="text"
            name="url"
            id="url"
            class="w-full rounded-md border border-gray-400 bg-gray-100 p-2"
            placeholder="e.g., https://google.com/search?q=%s"
            value={formData().url}
            onChange={e =>
              setFormData(prev => ({ ...prev, url: e.target.value }))
            }
          />
          <div class="text-sm text-gray-600">
            <p>
              Include <span class="font-bold text-gray-950">%s</span> in the URL
              where the search term should be placed.
            </p>
            <p>
              For example: https://google.com/search?q=
              <span class="font-bold text-gray-950">%s</span>
            </p>
          </div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            name="keepSlashes"
            id="keepSlashes"
            class="size-4 rounded-md border border-gray-400 bg-gray-100"
            checked={formData().keepSlashes}
            onChange={e =>
              setFormData(prev => ({ ...prev, keepSlashes: e.target.checked }))
            }
          />
          <label
            for="keepSlashes"
            class="block text-sm"
          >
            Keep slashes in path (don't encode in URI)
          </label>
        </div>
        <button
          type="submit"
          class="w-full cursor-pointer rounded-md bg-gray-900 p-2 text-white hover:bg-gray-800"
        >
          Add Dott
        </button>
      </form>
    </Card>
  );
}

type ListProps = {
  setFormData: Setter<FormData>;
};

function DottList({ setFormData }: ListProps) {
  const editDott = (key: string) => {
    const dott = getCustomDott(key);
    if (!dott) return;

    setFormData({
      key,
      name: dott.name,
      url: dott.url,
      keepSlashes: dott.keepSlashes ?? false,
    });
  };

  return (
    <Card class="space-y-4">
      <div class="">
        <h2 class="text-2xl font-semibold">Your Custom Dotts</h2>
        <Show when={hasCustomDotts()}>
          You can also{" "}
          <a
            href="#export"
            class="underline"
          >
            export ↗
          </a>{" "}
          your custom dotts.
        </Show>
      </div>
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
                    <span class="font-mono text-xs">{value.url}</span>
                  </div>
                  <div class="text-sm text-gray-600">
                    {value.keepSlashes && "Keeps slashes in path"}
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    class="cursor-pointer rounded-md border border-black p-2 hover:bg-black hover:text-white"
                    onclick={() => editDott(key)}
                  >
                    <Pencil class="size-4" />
                  </button>
                  <button
                    class="cursor-pointer rounded-md border border-red-600 p-2 text-red-600 accent-red-600 hover:bg-red-600 hover:text-white"
                    onclick={() => deleteCustomDott(key)}
                  >
                    <Trash2 class="size-4" />
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </Card>
  );
}
