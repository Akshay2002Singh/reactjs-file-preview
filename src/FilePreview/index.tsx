import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./styles.css";
import { getFileType } from "../utils";
import { FILE_TYPES, PDF_JS_LIB_SRC } from "../constant";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_JS_LIB_SRC;

interface FilePreviewProps {
  preview: string|File;
  placeHolderImage?: string;
  errorImage?: string;
  fileType?: string;
  axiosInstance?: any; // Using `any` as axiosInstance type (can be refined further)
}

const FilePreview: React.FC<FilePreviewProps> = ({
  preview,
  placeHolderImage,
  errorImage,
  fileType,
  axiosInstance = null,
}) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [pdfThumbnail, setPdfThumbnail] = useState<string | null>(null);
  const [resolvedType, setResolvedType] = useState<string>(fileType ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // If preview is a File, create an object URL
    if (preview instanceof File) {
      const url = URL.createObjectURL(preview);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url); // Cleanup on unmount
    } else {
      setFileUrl(preview);
    }
  }, [preview]);

  useEffect(() => {
    if (resolvedType === FILE_TYPES.PDF) {
      generatePdfThumbnail(fileUrl);
    }
  }, [fileUrl, resolvedType]);

  useEffect(() => {
    const resolveType = async () => {
      const type = await getFileType(fileType, preview, axiosInstance);
      setResolvedType(type);
    };

    resolveType();
  }, [preview, fileType, axiosInstance]);

  const generatePdfThumbnail = async (pdfUrl: string) => {
    try {
      let pdfData: Uint8Array;
      if (axiosInstance) {
        const response = await axiosInstance.get(pdfUrl, {
          responseType: "arraybuffer",
        });
        pdfData = new Uint8Array(response.data);
      } else {
        const response = await fetch(pdfUrl);
        const arrayBuffer = await response.arrayBuffer();
        pdfData = new Uint8Array(arrayBuffer);
      }

      const loadingTask = pdfjsLib.getDocument({
        data: pdfData,
        verbosity: pdfjsLib.VerbosityLevel.ERRORS,
      });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const desiredWidth = 10000;
      const viewport = page.getViewport({ scale: 1 });
      const scale = desiredWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await page.render({ canvasContext: ctx, viewport: scaledViewport })
        .promise;
      setPdfThumbnail(canvas.toDataURL("image/png"));
   } catch (error) {
      console.error("Error generating PDF thumbnail:", error);
    }
  };

  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  function rendered() {
    //Render complete
    setIsLoading(false);
  }

  function startRender() {
    //Rendering start
    requestAnimationFrame(rendered);
  }

  function loaded() {
    requestAnimationFrame(startRender);
  }

  function renderFile() {
    if(!resolvedType) {
      return null;
    }

    if (resolvedType === FILE_TYPES.IMAGE) {
      return (
        <img
          onLoad={loaded}
          src={fileUrl}
          alt="Preview"
          className={`preview-file ${isLoading ? "hidden" : ""}`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.VIDEO) {
      return (
        <video
          onLoad={loaded}
          src={fileUrl}
          controls
          className={`preview-file ${isLoading ? "hidden" : ""}`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.PDF) {
      return (
        <img
          onLoad={loaded}
          src={pdfThumbnail || fileUrl}
          alt="PDF Preview"
          className={`preview-file ${isLoading ? "hidden" : ""}`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.UNKNOWN && errorImage) {
      console.log("errorImage", errorImage);
      return (
      <img
        src={errorImage}
        alt="errorImage"
        className={`preview-file ${isLoading ? "hidden" : ""}`}
        onLoad={() => setIsLoading(false)}
      />);
    } else {
      return <span>Unsupported file type</span>;
    }
  }

  if (!resolvedType && placeHolderImage) {
    return (
      <img src={placeHolderImage} alt="placeHolder" className="preview-file" />
    );
  }

  return (
    <>
      {renderFile()}
      {isLoading ? (
        <div className="skeleton">
          <div className="skeleton-line"></div>
        </div>
      ) : null}
    </>
  );
};

export default FilePreview;
