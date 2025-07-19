import { createSignal, For, Show, type Accessor, type Setter } from "solid-js";
import Card from "../components/Card";
import {
  addCustomDott,
  customDotts,
  deleteCustomDott,
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
    <div class="min-h-screen w-screen bg-gray-100 p-12">
      <div class="mx-auto max-w-4xl space-y-8">
        <h1 class="text-center text-4xl font-bold">Custom Dotts</h1>
        <DottForm
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          setFormError={setFormError}
        />
        <DottList setFormData={setFormData} />
      </div>
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

    addCustomDott(key, { n: name, u: url, k: keepSlashes });
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
              class="block text-sm font-medium text-gray-700"
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
            class="w-full rounded-md border border-gray-300 p-2"
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
              class="block text-sm font-medium text-gray-700"
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
            class="w-full rounded-md border border-gray-300 p-2"
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
              class="block text-sm font-medium text-gray-700"
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
            class="w-full rounded-md border border-gray-300 p-2"
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
            class="size-4 rounded-md border border-gray-300"
            checked={formData().keepSlashes}
            onChange={e =>
              setFormData(prev => ({ ...prev, keepSlashes: e.target.checked }))
            }
          />
          <label
            for="keepSlashes"
            class="block text-sm font-medium"
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
    const dott = customDotts[key];
    if (!dott) return;

    setFormData({
      key,
      name: dott.n,
      url: dott.u,
      keepSlashes: dott.k ?? false,
    });
  };

  return (
    <Card class="space-y-4">
      <h2 class="text-2xl font-semibold">Your Custom Dotts</h2>
      <ul class="space-y-4">
        <For each={Object.entries(customDotts)}>
          {([key, value]) => (
            <li class="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-2 shadow-sm">
              <div>
                <span class="w-fit rounded-md bg-gray-200 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                  .{key}
                </span>{" "}
                <span class="font-medium">{value.n}</span>
                <div class="text-sm text-gray-600">
                  <span class="font-mono text-xs">{value.u}</span>
                </div>
                <div class="text-sm text-gray-600">
                  {value.k && "Keeps slashes in path"}
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  class="cursor-pointer rounded-md border border-black p-2 hover:bg-black hover:text-white"
                  onclick={() => editDott(key)}
                >
                  <Edit />
                </button>
                <button
                  class="cursor-pointer rounded-md border border-red-600 p-2 text-red-600 accent-red-600 hover:bg-red-600 hover:text-white"
                  onclick={() => deleteCustomDott(key)}
                >
                  <Trash />
                </button>
              </div>
            </li>
          )}
        </For>
      </ul>
    </Card>
  );
}

function Edit() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-pencil-icon lucide-pencil"
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function Trash() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-trash2-icon lucide-trash-2"
    >
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
