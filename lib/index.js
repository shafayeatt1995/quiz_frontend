export async function copyToClipboard(t) {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(t);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = t;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  } catch (e) {
    console.error(e);
    return e;
  }
}
