import { FILE_TYPES, SUPPORTED_EXTENSIONS } from "../constant";

export const getFileType = async (
  fileType: string | undefined,
  preview: string|File,
  axiosInstance: any = null
): Promise<string> => {


  if (fileType) return fileType;

  try {

    let extension;

    if(typeof preview === 'object' && preview instanceof File)
      extension= preview.type.split('/')[1];

    else{
    const url = new URL(preview);
    const pathname = url.pathname.toLowerCase();
    extension = getFileExtension(pathname);
    }

    if (SUPPORTED_EXTENSIONS.IMAGE.includes(extension)) {
      return FILE_TYPES.IMAGE;
    } else if (SUPPORTED_EXTENSIONS.VIDEO.includes(extension)) {
      return FILE_TYPES.VIDEO;
    } else if (SUPPORTED_EXTENSIONS.PDF.includes(extension)) {
      return FILE_TYPES.PDF;
    }

    const fetcher = axiosInstance ? axiosInstance.get : fetch;
    const response = axiosInstance
      ? await fetcher(preview)
      : await fetcher(preview, { method: "GET" });
    const contentType = axiosInstance
      ? response.headers["content-type"]
      : response.headers.get("Content-Type");

    if (contentType.startsWith("image/")) return FILE_TYPES.IMAGE;
    if (contentType.startsWith("video/")) return FILE_TYPES.VIDEO;
    if (contentType === "application/pdf") return FILE_TYPES.PDF;
  } catch (error) {
    console.warn("Invalid URL or local file detected.", error);
  }

  return FILE_TYPES.UNKNOWN;
};

export const getFileExtension = (url: string) => {
  if (!url.includes(".")) return "";
  const extenstion = url?.split(".")?.pop()?.toLowerCase();
  if (extenstion) {
    return extenstion;
  }
  return "";
};
