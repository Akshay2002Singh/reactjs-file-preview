# reactjs-file-preview – A Smart File Preview Component for React

[![npm version](https://badge.fury.io/js/reactjs-file-preview.svg)](https://badge.fury.io/js/reactjs-file-preview) [![npm](https://img.shields.io/npm/dw/reactjs-file-preview.svg?logo=npm)](https://www.npmjs.com/package/reactjs-file-preview) [![npm](https://img.shields.io/bundlephobia/minzip/reactjs-file-preview)](https://www.npmjs.com/package/reactjs-file-preview)

Effortlessly preview images, videos, and PDFs in your React applications with **reactjs-file-preview**. This lightweight and customizable component intelligently detects file types and displays:

- ✅ **Images** – Render high-quality previews for JPG, PNG, GIF, and more.
- ✅ **Videos** – Play MP4, WebM, and other video formats directly in the preview.
- ✅ **PDFs** – Generate a thumbnail preview of the first page for quick viewing.
- ✅ **Auto-Detection** – Handles file URLs, local files, and external sources.
- ✅ **Seamless Integration** – Works with any React project with minimal setup.

Perfect for **file upload interfaces, document management systems, and media galleries!** 🚀

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

### Basic Example

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
/>
```

---

## Props

### Available Props

| Prop Name         | Type    | Required | Description |
|------------------|---------|----------|-------------|
| `preview`       | string  | ✅       | The URL or local path of the file to preview. |
| `placeHolderImage` | string  | ❌       | URL of an image to display if no file is provided. |
| `errorImage`    | string  | ❌       | URL of an image to display if the file fails to load. |
| `fileType`      | string  | ❌       | Type of the file (`image`, `video`, `pdf`). If not provided, the type will be auto-detected. |
| `axiosInstance` | object  | ❌       | Custom Axios instance for fetching files, useful for handling authentication or CORS issues. |

This component will automatically detect the file type and display the appropriate preview. 🎉

---

## 🎯 Why Use reactjs-file-preview?

- 📂 **Multi-format support** – Works with images, videos, and PDFs.
- 🔍 **Auto-detection** – No need to specify file types manually.
- 🛠️ **Customizable** – Supports placeholders, error images, and authentication.
- 🏆 **Lightweight** – Minimal dependencies for fast performance.
- 🚀 **Easy to integrate** – Works with any React project effortlessly.

Start using **reactjs-file-preview** today and enhance your file preview experience! 🎉
