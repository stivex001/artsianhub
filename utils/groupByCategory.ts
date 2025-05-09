
export const groupByCategoryName = (categories: any[]) => {
  const grouped: Record<string, any[]> = {};

  categories.forEach((category) => {
    if (!grouped[category.name]) {
      grouped[category.name] = [];
    }
    grouped[category.name].push(category);
  });

  return grouped;
};
