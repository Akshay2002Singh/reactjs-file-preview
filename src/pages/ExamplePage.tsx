import React, { useState } from "react";
import FilePreview from "reactjs-file-preview";
import sampleImg from "../assets/exampleImage.png";
import samplePdf from "../assets/examplePdf.pdf";
import sampleVideo from "../assets/exampleVideo.mp4";

const containerStyle: React.CSSProperties = {
  padding: "2rem",
  fontFamily: "sans-serif",
  minHeight: "100vh",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "1.5rem",
  background: "#141111ff",
  maxWidth: "700px",
  margin: "1.5rem auto",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const titleStyle: React.CSSProperties = {
  marginBottom: "0.75rem",
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#dfdfdfff",
};

const codeBlockStyle: React.CSSProperties = {
  position: "relative",
  background: "#2d2d2d",
  color: "#f8f8f2",
  fontFamily: "monospace",
  fontSize: "0.9rem",
  padding: "0.75rem",
  borderRadius: "6px",
  overflowX: "auto",
  marginBottom: "1rem",
};

const copyBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "6px",
  right: "6px",
  background: "#444",
  color: "#fff",
  border: "none",
  fontSize: "0.75rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
};

function CodeBlock({ code }: { code: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div style={codeBlockStyle}>
      <button style={copyBtnStyle} onClick={handleCopy}>
        Copy
      </button>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{code}</pre>
    </div>
  );
}

export default function ExamplePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        📂 reactjs-file-preview — Demo Showcase
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "2rem" }}>
        A clean single-column layout demonstrating all usage combinations of the{" "}
        <code>FilePreview</code> component.
      </p>

      {/* IMAGE FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>1. Image from URL</h2>
        <CodeBlock
          code={`
<div style={{width: '300px'}}>
    <FilePreview preview="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" />
        </div>
      </div>

      {/* PDF FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>1. PDF from URL</h2>
        <CodeBlock
          code={`<FilePreview preview="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />`}
        />
        <FilePreview preview="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
      </div>

      {/* PDF FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>1. Video from URL</h2>
        <CodeBlock
          code={`<FilePreview preview="https://file-examples.com/storage/fe77d6f38e68b20cd96e0c3/2017/04/file_example_MP4_640_3MG.mp4" />`}
        />
        <FilePreview preview="https://file-examples.com/storage/fe77d6f38e68b20cd96e0c3/2017/04/file_example_MP4_640_3MG.mp4" />
      </div>

      {/* FILE INPUT */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>2. File Input</h2>
        <CodeBlock
          code={`<input type="file" onChange={...} />
<FilePreview preview={file} />`}
        />
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />
        {file && <FilePreview preview={file} />}
      </div>

      {/* LOCAL IMPORTED IMAGE */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>3. Local Imported Asset</h2>
        <CodeBlock
          code={`import sampleImg from "../assets/exampleImage.png";

<FilePreview preview={sampleImg} />`}
        />
        <FilePreview preview={sampleImg} />
      </div>

      {/* VIDEO */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>3. Video File</h2>
        <CodeBlock code={`<FilePreview preview={sampleVideo} />`} />
        <FilePreview preview={sampleVideo} />
      </div>

      {/* PDF */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>4. PDF Preview</h2>
        <CodeBlock code={`<FilePreview preview={samplePdf} clarity={800} />`} />
        <FilePreview preview={samplePdf} clarity={800} />
      </div>

      {/* PLACEHOLDER + ERROR IMAGE */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>5. Placeholder & Error</h2>
        <CodeBlock
          code={`<FilePreview
  preview="https://example.com/invalid.png"
  placeHolderImage="https://via.placeholder.com/150/cccccc/000000?text=Loading..."
  errorImage="https://via.placeholder.com/150/ff0000/ffffff?text=Error"
/>`}
        />
        <FilePreview
          preview="https://example.com/invalid.png"
          placeHolderImage="https://via.placeholder.com/150/cccccc/000000?text=Loading..."
          errorImage="https://via.placeholder.com/150/ff0000/ffffff?text=Error"
        />
      </div>
    </div>
  );
}
