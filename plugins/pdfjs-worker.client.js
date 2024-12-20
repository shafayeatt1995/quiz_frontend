import { GlobalWorkerOptions } from "pdfjs-dist";

export default defineNuxtPlugin(() => {
  // Set the workerSrc path for pdfjs-dist
  GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@2.10.377/es5/build/pdf.worker.min.js";
});
