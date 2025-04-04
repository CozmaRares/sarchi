import dotts from "../dotts";

export default function Dotts() {
  const lists = Object.entries(dotts).reduce(
    (acc: { [key: string]: HTMLElement }, [key, value]) => {
      const url = value.u.replace("%s", "<span class='font-bold text-gray-950'>%s</span>");
      const li = document.createElement("li");
      li.innerHTML = `
        <li class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex flex-row gap-2 items-end">
            <span class="font-mono font-bold text-lg">.${key}</span>
            ${!!value.d ? `<span class="text-gray-600 text-sm">(default)</span>` : ""}
          </div>
          <div class="text-gray-600">
            <div>Name: ${value.n}</div>
            <div style="word-break: break-all;">
              URL: <span class="font-mono">${url}</span>
            </div>
            ${!!value.k ? `<div>Keeps slashes in path</div>` : ""}
          </div>
        </li>
      `;

      if (!acc[value.c]) {
        acc[value.c] = document.createElement("ul");
        acc[value.c].className = "space-y-4";
      }
      acc[value.c].appendChild(li);
      return acc;
    },
    {},
  );

  const categoryList = Object.entries(lists)
    .map(
      ([category, ul]) => `
        <div class="w-full">
          <div class="flex flex-row gap-2 items-center">
            <span class="h-[2px] flex-grow bg-gray-300"></span>
            <h2 class="text-2xl font-semibold">${category}</h2>
            <span class="h-[2px] flex-grow bg-gray-300"></span>
          </div>
          ${ul.outerHTML}
        </div>
      `,
    )
    .join("");

  document.getElementById("app")!.innerHTML = `
    <div class="flex w-screen flex-col items-center justify-center p-4 bg-gray-100">
       <div class="max-w-150 mx-auto space-y-8">
         <h1 class="text-4xl font-bold text-center">Dott List</h1>
          ${categoryList}
       </div>
     </div>
  `;
}
