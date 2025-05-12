
export const groupByCategoryName = (services: any[]) => {
  return services.reduce((acc: Record<string, any[]>, item) => {
    const categoryName = item?.categoryId?.name;
    if (!categoryName) return acc;

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});
};