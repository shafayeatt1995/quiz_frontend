const loadedAnimations = new Map();
export const useUtils = () => {
  const config = useRuntimeConfig();
  const { APP_NAME, BASE_URL } = config.public;
  const baseUrl = BASE_URL;
  const appName = APP_NAME;

  const strSlug = (val) => {
    return val
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "");
  };

  const arrayConverter = (value) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  };

  const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const getItem = (key, defaultValue = "") => {
    if (typeof window === "undefined") return;
    const item = localStorage.getItem(key);
    return item ?? defaultValue;
  };

  const setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  const randomStr = (key = 10) => {
    return [...Array(key)].map(() => Math.random().toString(36)[2]).join("");
  };

  const encode = (value) => {
    return value ? btoa(value) : "";
  };

  const decode = (value) => {
    return value ? atob(value) : "";
  };

  const initLottie = async (container, path, loop = true) => {
    if (typeof window === "undefined") return;

    if (
      loadedAnimations.has(container) &&
      loadedAnimations.get(container) === path
    ) {
      return;
    }

    const loadLottieScript = () => {
      return new Promise((resolve, reject) => {
        if (window.lottie) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = "/js/lottie.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        }
      });
    };

    await loadLottieScript();

    window.lottie.loadAnimation({
      container: container,
      renderer: "canvas",
      loop,
      autoplay: true,
      path: path,
    });

    loadedAnimations.set(container, path);
  };

  const paginate = (items = [], perPage = 24) => {
    return { perPage, page: items.length / perPage + 1 };
  };

  const cookieParse = (
    cookie = typeof window === "undefined"
      ? useRequestHeaders(["cookie"])?.cookie
      : document.cookie
  ) => {
    try {
      return cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=").map((item) => item.trim());
        acc[name] = decodeURIComponent(value);
        return acc;
      }, {});
    } catch (error) {
      console.error("Failed to parse cookies:", error);
      return {};
    }
  };

  const setCookie = (name, value, options = {}) => {
    let expiresOption = "";
    const { expires, ...otherOptions } = options;

    if (expires) {
      const days = parseInt(expires, 10);
      if (!isNaN(days) && days > 0) {
        expiresOption = `expires=${new Date(
          Date.now() + days * 24 * 60 * 60 * 1000
        ).toUTCString()}; `;
      }
    }

    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; ${expiresOption}${Object.entries(otherOptions)
      .map(([key, val]) => `${key}=${val}`)
      .join("; ")}`;
  };

  const getCookie = (name) => {
    try {
      const cookies = cookieParse();
      return cookies[name];
    } catch (error) {
      console.error("Failed to parse cookies:", error);
      return null;
    }
  };

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const checkDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const fullDateFormat = (date = new Date()) => {
    return Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const processDate = (date = new Date()) => {
    const d = new Date(date);
    return {
      utc: d.toISOString(),
      local: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}T${String(
        d.getHours()
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
        d.getSeconds()
      ).padStart(2, "0")}`,
      isActive: d > new Date(),
    };
  };

  return {
    baseUrl,
    appName,
    strSlug,
    arrayConverter,
    deepClone,
    getItem,
    setItem,
    removeItem,
    randomStr,
    encode,
    decode,
    initLottie,
    paginate,
    cookieParse,
    setCookie,
    getCookie,
    removeCookie,
    checkDate,
    fullDateFormat,
    processDate,
  };
};
