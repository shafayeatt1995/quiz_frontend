export default defineNuxtPlugin(() => {
  const formatDate = (value, options) =>
    new Date(value).toLocaleString("en-US", options);

  return {
    provide: {
      filters: {
        // December 27, 2024 at 05:37:48 PM
        date: (value) =>
          formatDate(value, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        // December 27, 2024
        normalDate: (value) =>
          formatDate(value, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        // 12/27/2024, 05:37:48 PM
        normalDate2: (value) =>
          formatDate(value, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
        // Friday, December 27, 2024 at 05:37:48 PM
        fullDate: (value) =>
          formatDate(value, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            weekday: "long",
            hour12: true,
          }),
        // 2 days ago
        agoDate: (value) => {
          const now = new Date();
          const then = new Date(value);
          const diff = Math.abs(now.getTime() - then.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return `${days} days ago`;
        },
        year: (value) => new Date(value).getFullYear(),
        numberFloat: (value) => parseFloat(value).toFixed(2),
        number: (value) =>
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        currencyNumber: (value) => value.toLocaleString("en-IN"),
        mathRound: (value) => Math.round(value),
      },
    },
  };
});
