import { For } from "solid-js";
import currentHash from "../logic/currentHash";

const links = [
  { hash: "", name: "Home" },
  { hash: "#dotts", name: "Available Dotts" },
  { hash: "#custom", name: "Add Your Own" },
];

export default function Nav() {
  return (
    <nav class="fixed right-0 bottom-0 left-0 flex flex-row items-center justify-center border-t-2 border-gray-600 bg-white/40 shadow-gray-600 backdrop-blur-sm md:right-auto md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border-none md:shadow-md">
      <ul class="flex flex-row items-center divide-x-2 divide-black rounded-full px-2 md:px-6 md:py-4">
        <For each={links}>
          {({ hash, name }) => (
            <li class="py-2 md:py-0">
              <a
                href={hash.length == 0 ? "#" : hash}
                class={`relative mx-2 p-1 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-right after:[scale:0_1] after:bg-black after:transition-[scale] hover:after:origin-left ${currentHash() === hash ? "after:[scale:1_1]" : "hover:after:[scale:1_1]"}`}
              >
                {name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
