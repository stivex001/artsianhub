const basePalette = [
  { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-600", dot: "bg-blue-500" },
  { bg: "bg-green-100", border: "border-green-300", text: "text-green-600", dot: "bg-green-500" },
  { bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-600", dot: "bg-purple-500" },
  { bg: "bg-pink-100", border: "border-pink-300", text: "text-pink-600", dot: "bg-pink-500" },
  { bg: "bg-yellow-100", border: "border-yellow-300", text: "text-yellow-600", dot: "bg-yellow-500" },
  { bg: "bg-orange-100", border: "border-orange-300", text: "text-orange-600", dot: "bg-orange-500" },
  { bg: "bg-teal-100", border: "border-teal-300", text: "text-teal-600", dot: "bg-teal-500" },
  { bg: "bg-indigo-100", border: "border-indigo-300", text: "text-indigo-600", dot: "bg-indigo-500" },
  { bg: "bg-red-100", border: "border-red-300", text: "text-red-600", dot: "bg-red-500" },
];

const hashStringToNumber = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const generateVariant = (base: (typeof basePalette)[0], factor: number) => {
  // Add a numeric suffix to Tailwind classes like `bg-blue-100/200/300`
  const shiftClass = (cls: string, step: number) => {
    const match = cls.match(/(\D+)(\d{2,3})/);
    if (!match) return cls;
    const [, prefix, num] = match;
    const newNum = Math.min(900, Math.max(100, parseInt(num) + step));
    return `${prefix}${newNum}`;
  };

  return {
    bg: shiftClass(base.bg, factor * 100),
    border: shiftClass(base.border, factor * 100),
    text: shiftClass(base.text, factor * 100),
    dot: shiftClass(base.dot, factor * 100),
  };
};

export const getLocationStyles = (location: string) => {
  if (!location) return basePalette[0];

  const hash = hashStringToNumber(location);

  // Pick base color
  const baseIndex = hash % basePalette.length;
  const variantFactor = Math.floor(hash / basePalette.length) % 5; // gives 0–4 variants

  if (variantFactor === 0) return basePalette[baseIndex];
  return generateVariant(basePalette[baseIndex], variantFactor);
};