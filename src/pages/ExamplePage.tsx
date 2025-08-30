import React, { useState } from "react";
import FilePreview from "reactjs-file-preview";
import sampleImg from "../assets/exampleImage.png";
import samplePdf from "../assets/examplePdf.pdf";
import sampleVideo from "../assets/exampleVideo.mp4";

const containerStyle: React.CSSProperties = {
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
      <pre style={{ margin: 0, textAlign: "left" }}>{code}</pre>
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
      <p style={{ textAlign: "center", color: "#b4b4b4ff", marginBottom: "2rem" }}>
        A clean single-column layout demonstrating all usage combinations of the{" "}
        <code>FilePreview</code> component.
      </p>

      {/* IMAGE FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>1. Image from URL</h2>
        <CodeBlock
          code={`
<div style={{ width: "300px" }}>
    <FilePreview preview="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" />
        </div>
      </div>

      {/* PDF FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>2. PDF from URL</h2>
        <CodeBlock
          code={`
<div style={{ width: "300px" }}>
    <FilePreview preview="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
        </div>
      </div>

      {/* Video FROM REMOTE URL */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>3. Video from URL</h2>
        <CodeBlock
          code={`
<div style={{ width: "400px" }}>
    <FilePreview preview="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</div>`}
        />
        <div style={{ width: "400px" }}>
          <FilePreview preview="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
      </div>

      {/* FILE INPUT WITH PLACEHOLDER AND ERROR IMAGE */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>4. File Input With Placeholder & Error Image</h2>
        <CodeBlock
          code={`
<input
type="file"
onChange={(e) => e.target.files && setFile(e.target.files[0])}
style={{ marginBottom: "1rem" }}
/>

<div style={{ width: "600px", height: "400px", borderRadius: '12px', overflow: 'hidden' }}>
    <FilePreview
        preview={file ?? ""}
        placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
        errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
    />
</div>`}
        />
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />
        <div style={{ width: "600px", height: "400px", borderRadius: '12px', overflow: 'hidden' }}>
          <FilePreview
            preview={file ?? ""}
            placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
            errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
          />
        </div>
      </div>

      {/* LOCAL IMPORTED IMAGE */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>5. Local Imported Image File</h2>
        <CodeBlock
          code={`
import sampleImg from "../assets/exampleImage.png";

<div style={{ width: "300px" }}>
    <FilePreview preview={sampleImg} />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview={sampleImg} />
        </div>
      </div>

      {/* LOCAL IMPORTED VIDEO */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>6. Local Imported Video File</h2>
        <CodeBlock
          code={`
<div style={{ width: "300px" }}>
    <FilePreview preview={sampleVideo} />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview={sampleVideo} />
        </div>
      </div>

      {/* LOCAL IMPORTED PDF */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>7. Local Imported PDF File</h2>
        <CodeBlock
          code={`
<div style={{ width: "300px" }}>
    <FilePreview preview={samplePdf} clarity={800} />
</div>`}
        />
        <div style={{ width: "300px" }}>
          <FilePreview preview={samplePdf} clarity={800} />
        </div>
      </div>
    </div>
  );
}
