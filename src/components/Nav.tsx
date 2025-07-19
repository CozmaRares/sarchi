import { For } from "solid-js";
import currentHash from "../logic/currentHash";

const links = [
  { hash: "", name: "Home" },
  { hash: "#dotts", name: "Available Dotts" },
  { hash: "#custom", name: "Add Your Own" },
];

export default function Nav() {
  return (
    <nav class="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/40 shadow-lg backdrop-blur-sm">
      <ul class="flex flex-row items-center divide-x-2 divide-black rounded-full px-6 py-4">
        <For each={links}>
          {({ hash, name }) => (
            <li>
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
