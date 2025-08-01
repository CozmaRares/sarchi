import currentHash from "../logic/currentHash";
import { Home, Layers, Plus } from "lucide-solid";

const NAV_ITEMS = [
  { hash: "", name: "Home", icon: Home },
  { hash: "#dotts", name: "Available Dotts", icon: Layers },
  { hash: "#custom", name: "Add Your Own", icon: Plus },
];

export default function Nav() {
  return (
    <div class="fixed bottom-0 md:bottom-6 left-0 right-0 md:left-1/2 md:right-auto z-50 md:-translate-x-1/2 border md:rounded-full border-black/50 bg-white/90 px-2 py-2 shadow-lg backdrop-blur-md">
      <nav class="">
        <div class="flex items-center justify-center">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = currentHash() === item.hash;

            return (
              <a
                href={item.hash.length == 0 ? "#" : item.hash}
                class={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-md"
                    : "hover:bg-gray-100/80 hover:text-gray-900"
                } `}
              >
                <Icon class="size-4" />
                <span class="whitespace-nowrap">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
