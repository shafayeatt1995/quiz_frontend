export const useData = () => {
  return useState("data", () => ({
    isTablet: false,
    isMobile: false,
  }));
};
