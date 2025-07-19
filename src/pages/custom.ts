import { addCustomDott, deleteCustomDott, getCustomDotts } from "../localStorage";

export default function CustomPage() {

  const form = document.getElementById("custom-dott-form");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      const key = (form.querySelector('[name="key"]') as HTMLInputElement).value.trim();
      const name = (form.querySelector('[name="name"]') as HTMLInputElement).value.trim();
      const url = (form.querySelector('[name="url"]') as HTMLInputElement).value.trim();
      if (!key || !name || !url) return;
      addCustomDott(key, { n: name, u: url });
      render();
    };
  }

  render();
}


function render() {
  const customDotts = Object.entries(getCustomDotts());

  document.getElementById("app")!.innerHTML = `
    <div class="min-h-screen p-12 bg-gray-100 space-y-8">
      <h1 class="text-4xl font-bold text-center">Custom Dotts</h1>
      <div class="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Add Custom Dott</h2>
        <form id="custom-dott-form" class="space-y-4">
          <div class="space-y-2">
            <label for="key" class="block text-sm font-medium text-gray-700">Key</label>
            <input type="text" name="key" id="key" class="w-full p-2 border border-gray-300 rounded-md" required placeholder="e.g., g, yt, gh">
          </div>
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" class="w-full p-2 border border-gray-300 rounded-md" required placeholder="e.g., Google, YouTube, GitHub">
          </div>
          <div class="space-y-2">
            <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
            <input type="text" name="url" id="url" class="w-full p-2 border border-gray-300 rounded-md" required placeholder="e.g., https://google.com/search?q=%s">
            <div class="text-gray-600 text-sm">
              <p>
                Include <code>%s</code> in the URL where the search term should be placed.
              </p>
              <p>
                For example: <code>https://google.com/search?q=%s</code>
              </p>
            </div>
          </div>
          <button type="submit" class="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700 cursor-pointer">Add Dott</button>
        </form>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Your Custom Dotts</h2>
        <ul class="space-y-4">
          ${customDotts.map(([key, value]) => `
            <li class="p-2 rounded-lg border border-gray-200 shadow-sm flex flex-row justify-between items-center">
              <div>
                <span class="rounded-full text-xs font-mono px-2 py-0.5 bg-gray-200">.${key}</span>
                <span class="font-bold">${value.n}</span>
                <span class="block text-gray-600 text-sm">
                  <span class="font-mono">${value.u.replace("%s", "<span class='font-bold text-gray-950'>%s</span>")}</span>
                </span>
              </div>
              <div>
                <button class="border border-gray-600 hover:bg-gray-600 hover:text-white px-2 py-1 rounded-md" id="custom-edit-${key}">Edit</button>
                <button class="border border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded-md" id="custom-delete-${key}">Delete</button>
              </div>
            </li>
          `).join("")}
      </div>
     </div>
  `;

  const form = document.getElementById("custom-dott-form")!;

  const keyInput = form.querySelector<HTMLInputElement>('[name="key"]')!;
  const nameInput = form.querySelector<HTMLInputElement>('[name="name"]')!;
  const urlInput = form.querySelector<HTMLInputElement>('[name="url"]')!;

  form.onsubmit = function (e) {
    e.preventDefault();
    const key = keyInput.value.trim();
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    if (!key || !name || !url) return;
    addCustomDott(key, { n: name, u: url });
    render();
  }

  customDotts.forEach(([key]) => {
    const editButton = document.getElementById(`custom-edit-${key}`);
    const deleteButton = document.getElementById(`custom-delete-${key}`);

    if (editButton) {
      editButton.onclick = () => {
        keyInput.value = key;
        nameInput.value = getCustomDotts()[key].n;
        urlInput.value = getCustomDotts()[key].u;
      };
    }

    if (deleteButton) {
      deleteButton.onclick = () => {
        deleteCustomDott(key);
        render();
      };
    }
  });
}