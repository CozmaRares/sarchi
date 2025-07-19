import type { DottList, DottValue } from "./dotts";

const CUSTOM_DOTTS_KEY = "customDotts";
const DEFAULT_CATEGORY = "Custom";

export type DottValueInput = Omit<DottValue, "c">;

export function getCustomDotts(): DottList {
  const data = localStorage.getItem(CUSTOM_DOTTS_KEY);
  if (!data) return {};
  try {
    return JSON.parse(data) as DottList;
  } catch {
    return {};
  }
}

export function getCustomDott(key: string): DottValue | undefined {
  const dotts = getCustomDotts();
  console.log("getCustomDott", key, dotts);
  return dotts[key];
}

function saveCustomDotts(dotts: DottList): void {
  localStorage.setItem(CUSTOM_DOTTS_KEY, JSON.stringify(dotts));
}

export function addCustomDott(key: string, value: DottValueInput): void {
  const dotts = getCustomDotts();
  dotts[key] = {
    ...value,
    c: DEFAULT_CATEGORY,
  };
  saveCustomDotts(dotts);
}

export function deleteCustomDott(key: string): void {
  const dotts = getCustomDotts();
  if (dotts[key]) {
    delete dotts[key];
    saveCustomDotts(dotts);
  }
}