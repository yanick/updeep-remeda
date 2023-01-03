export default function splitPath(path: string | number | (number | string)[]) {
  if (typeof path === "number") path = new String(path) as any;

  return Array.isArray(path)
    ? path
    : (path as string).split(".").filter((x) => x !== "");
}
