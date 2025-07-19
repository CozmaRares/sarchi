import { createMutable } from "solid-js/store";
import type { DottList, DottValue } from "./dotts";

const CUSTOM_DOTTS_KEY = "customDotts";
const DEFAULT_CATEGORY = "Custom";

export type DottValueInput = Omit<DottValue, "c">;

export const customDotts = createMutable<DottList>(
  JSON.parse(localStorage.getItem(CUSTOM_DOTTS_KEY) ?? "{}"),
);

export function getCustomDott(key: string): DottValue | undefined {
  return customDotts[key];
}

function saveCustomDotts(): void {
  localStorage.setItem(CUSTOM_DOTTS_KEY, JSON.stringify(customDotts));
}

export function addCustomDott(key: string, value: DottValueInput): void {
  customDotts[key] = {
    ...value,
    c: DEFAULT_CATEGORY,
  };

  saveCustomDotts();
}

export function deleteCustomDott(key: string): void {
  if (key in customDotts) {
    delete customDotts[key];
    saveCustomDotts();
  }
}
