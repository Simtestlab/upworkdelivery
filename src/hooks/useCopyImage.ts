import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  copyBlobToClipboard,
} from 'copy-image-clipboard'
import { useToast } from "@/components/ui/use-toast"


const useCopyImage = () => {
  const ref: any = useRef(null);
  const { toast } = useToast()

  
const copyImgToClipboard = async (data: any) => {
  const URL = data;
  try {
    const copiedImage = await fetch(URL);
    const blobData = await copiedImage.blob();
    await copyBlobToClipboard(blobData)
    toast({
      description: "Copied to clipboard",
    })
  } catch (e) {
    alert('Your brower does not support this feature.')
    console.log(e);
  }
};

  const handleButtonClick = () => {
    const canvas = document.getElementById('canvas')

    if (canvas) {
      html2canvas(canvas).then((canvas) => {
        const dataURL = canvas.toDataURL("image/png");
        console.log({ dataURL });
        copyImgToClipboard(dataURL);
      });
    }
  };
  return { handleButtonClick, ref };
};

export default useCopyImage;
