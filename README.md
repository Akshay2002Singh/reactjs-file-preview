# reactjs-file-preview – A Smart File Preview Component for React

[![npm version](https://badge.fury.io/js/reactjs-file-preview.svg)](https://badge.fury.io/js/reactjs-file-preview) [![npm](https://img.shields.io/npm/dw/reactjs-file-preview.svg?logo=npm)](https://www.npmjs.com/package/reactjs-file-preview) [![npm](https://img.shields.io/bundlephobia/minzip/reactjs-file-preview)](https://www.npmjs.com/package/reactjs-file-preview)

Effortlessly preview images, videos, and PDFs in your React applications with **reactjs-file-preview**. This lightweight and customizable component intelligently detects file types and displays:

- ✅ **Images** – Render high-quality previews for JPG, PNG, GIF, and more.
- ✅ **Videos** – Play MP4, WebM, and other video formats directly in the preview.
- ✅ **PDFs** – Generate a thumbnail preview of the first page for quick viewing.
- ✅ **Auto-Detection** – Handles file URLs, local files, and external sources.
- ✅ **Seamless Integration** – Works with any React project with minimal setup.

Perfect for **file upload interfaces, document management systems, and media galleries!** 🚀

**Live Demo:** [https://akshay2002singh.github.io/reactjs-file-preview/](https://akshay2002singh.github.io/reactjs-file-preview/)


---

## 📦 Installation

[![NPM](https://nodei.co/npm/reactjs-file-preview.png?compact=true)](https://nodei.co/npm/reactjs-file-preview/)

#### To install the latest stable version:

```sh
npm install reactjs-file-preview
# OR
yarn add reactjs-file-preview
```

---

## 🚀 Usage

### Basic Example (Remote URL)

```jsx
import React from "react";
import FilePreview from "reactjs-file-preview";

const App = () => {
  return (
    <div>
      <h2>File Preview Example</h2>
      <FilePreview preview="https://example.com/sample.pdf" />
    </div>
  );
};

export default App;
```

### Example with Placeholder and Error Image

```jsx
<FilePreview
  preview="https://example.com/sample.jpg"
  placeHolderImage="https://example.com/placeholder.png"
  errorImage="https://example.com/error.png"
/>
```

### Local File Example

```jsx
import sampleImg from "../assets/exampleImage.png";

<div style={{ width: "300px" }}>
  <FilePreview preview={sampleImg} />
</div>;
```

### File Input Example

```jsx
<input
    type="file"
    onChange={(e) => e.target.files && setFile(e.target.files[0])}
    style={{ marginBottom: "1rem" }}
  />

<div style={{ width: "600px", height: "400px", borderRadius: '12px', overflow:'hidden' }}>
  <FilePreview
    preview={file ?? ""}
    placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
    errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
  />
</div>
```

### Example with Custom Axios Instance

If your files require authentication or are behind CORS restrictions, you can pass a custom Axios instance:

```jsx
import axios from "axios";

const customAxios = axios.create({
  headers: {
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
});

<FilePreview
  preview="https://example.com/protected-file.pdf"
  axiosInstance={customAxios}
/>;
```

---

## 📂 Supported Formats

**reactjs-file-preview** currently supports the following file extensions:

- **Images:** `jpg`, `jpeg`, `png`, `gif`, `webp`  
- **Videos:** `mp4`, `webm`, `ogg`  
- **Documents:** `pdf

---

## Props

### Available Props

| Prop Name          | Type   | Required | Description                                                                                                         |
| ------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `preview`          | string \| File \| null | ✅       | The source of the file to preview. <br/>Supports: <br/>• **Remote URL** (string)<br/>• **Local file import** via bundler (`import sample from "./file.png"`) <br/>• **File object** from an `<input type="file" />`<br/>• `null` (shows the placeholder if provided)                                                                      |
| `clarity`          | string | ❌       | Defines clarity of the file being previewed. Defaults to 1000. Higher the value, more the loading time of the file. |
| `placeHolderImage` | string | ❌       | URL of an image to display if no file is provided.                                                                  |
| `errorImage`       | string | ❌       | URL of an image to display if the file fails to load.                                                               |
| `fileType`         | string | ❌       | Type of the file (`image`, `video`, `pdf`). If not provided, the type will be auto-detected.                        |
| `axiosInstance`    | object | ❌       | Custom Axios instance for fetching files, useful for handling authentication or CORS issues.                        |

> **ℹ️ Note:**  
> If `preview` is not provided (or is `null`) **and** a `placeHolderImage` is supplied, the placeholder image will be shown automatically.

This component will automatically detect the file type and display the appropriate preview. 🎉

---

## 🎯 Why Use reactjs-file-preview?

- 📂 **Multi-format support** – Works with images, videos, and PDFs.
- 🔍 **Auto-detection** – No need to specify file types manually.
- 🛠️ **Customizable** – Supports placeholders, error images, and authentication.
- 🏆 **Lightweight** – Minimal dependencies for fast performance.
- 🚀 **Easy to integrate** – Works with any React project effortlessly.

Start using **reactjs-file-preview** today and enhance your file preview experience! 🎉
