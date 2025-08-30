import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "./styles.css";
import { getFileType } from "../utils";
import { FILE_TYPES } from "../constant";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface FilePreviewProps {
  preview: string | File;
  clarity?: number;
  placeHolderImage?: string;
  errorImage?: string;
  fileType?: string;
  axiosInstance?: any;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  preview,
  clarity,
  placeHolderImage,
  errorImage,
  fileType,
  axiosInstance = null,
}) => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [pdfThumbnail, setPdfThumbnail] = useState<string | null>(null);
  const [resolvedType, setResolvedType] = useState<string>(fileType ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // If preview is a File, create an object URL
    if (preview instanceof File) {
      const url = URL.createObjectURL(preview);
      setFileUrl(url);
      if (url) {
        return () => URL.revokeObjectURL(url); // Cleanup on unmount
      }
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
    setIsLoading(true);
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

      const desiredWidth = clarity ?? 1000;
      const viewport = page.getViewport({ scale: 1 });
      const scale = desiredWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await page.render({
        canvas,
        canvasContext: ctx,
        viewport: scaledViewport,
      }).promise;
      setPdfThumbnail(canvas.toDataURL("image/png"));
    } catch (error) {
      setIsLoading(false);
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
    if (!resolvedType) {
      return null;
    }

    if (resolvedType === FILE_TYPES.IMAGE) {
      return (
        <img
          onLoad={loaded}
          src={fileUrl}
          alt="Preview"
          className={`reactjs-file-preview-preview-file ${
            isLoading ? "reactjs-file-preview-hidden" : ""
          }`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.VIDEO) {
      return (
        <video
          onLoad={loaded}
          src={fileUrl}
          controls
          className={`reactjs-file-preview-preview-file ${
            isLoading ? "reactjs-file-preview-hidden" : ""
          }`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.PDF) {
      return (
        <img
          onLoad={loaded}
          src={pdfThumbnail || fileUrl}
          alt="PDF Preview"
          className={`reactjs-file-preview-preview-file ${
            isLoading ? "reactjs-file-preview-hidden" : ""
          }`}
          onClick={() => openInNewTab(fileUrl)}
        />
      );
    } else if (resolvedType === FILE_TYPES.UNKNOWN && errorImage) {
      console.log("errorImage", errorImage);
      return (
        <img
          src={errorImage}
          alt="errorImage"
          className={`reactjs-file-preview-preview-file ${
            isLoading ? "reactjs-file-preview-hidden" : ""
          }`}
          onLoad={() => setIsLoading(false)}
        />
      );
    } else {
      return <span>Unsupported file type</span>;
    }
  }

  if (!resolvedType && placeHolderImage) {
    return (
      <img
        src={placeHolderImage}
        alt="placeHolder"
        className="reactjs-file-preview-preview-file"
      />
    );
  }

  return (
    <>
      {renderFile()}
      {isLoading ? (
        <div className="reactjs-file-preview-loader-container">
          <div className="reactjs-file-preview-loader"></div>
        </div>
      ) : null}
    </>
  );
};

export default FilePreview;
