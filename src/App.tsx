import { useState } from "react";
import "./App.css";
import FilePreview from "./FilePreview";

function App() {
  //   return (
  // <div
  //   style={{
  //     position: "relative",
  //     width: "150px",
  //     height: "150px",
  //     border: "1px solid #ccc",
  //     borderRadius: "8px",
  //     overflow: "hidden",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f3f3f3",
  //   }}
  // >
  //   <FilePreview
  //     preview="https://picsum.photos/200/300"
  //   />
  //   {/* <FilePreview
  //   preview="https://example.com/sample.jp"
  //   placeHolderImage="https://example.com/placeholder.png"
  //   errorImage="https://picsum.photos/200/300"
  // /> */}
  // </div>

  //   )
  const [fileUrl, setFileUrl] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUrl(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
        <div
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f3f3",
          }}
        >
          {<FilePreview preview={fileUrl}  placeHolderImage="https://placehold.co/600x400?text=Hello+World" errorImage="https://placehold.co/600x400?text=Error"/>}        
          </div>
    </div>
  );
}

export default App;
