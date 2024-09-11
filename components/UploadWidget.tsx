"use client";
import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";

// Define types for the context and props
interface CloudinaryScriptContextProps {
  loaded: boolean;
}

interface UploadWidgetProps {
  uwConfig: object;
  setState: Dispatch<SetStateAction<string[]>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<CloudinaryScriptContextProps | null>(null);

function UploadWidget({ uwConfig, setState ,setIsDialogOpen}: UploadWidgetProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          setIsDialogOpen(false);
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }} >
   <button
  id="upload_widget"
  className="cloudinary-button hover:bg-customPink"
  onClick={initializeCloudinaryWidget}
>
  Upload 4 Images
</button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
