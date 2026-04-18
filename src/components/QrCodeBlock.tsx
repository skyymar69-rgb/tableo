import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon } from "lucide-react";

type Props = {
  value: string;
  size?: number;
  label?: string;
  fileName?: string;
};

export const QrCodeBlock = ({ value, size = 240, label, fileName = "tableo-qr" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svgString, setSvgString] = useState<string>("");

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        errorCorrectionLevel: "H",
        margin: 2,
        width: size,
        color: {
          dark: "#0b0c10",
          light: "#ffffff",
        },
      }).catch(() => {
        /* swallow */
      });
    }
    QRCode.toString(value, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 2,
      color: { dark: "#0b0c10", light: "#ffffff" },
    })
      .then((s) => setSvgString(s))
      .catch(() => setSvgString(""));
  }, [value, size]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${fileName}.svg`;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
        <QrIcon className="w-3.5 h-3.5" />
        QR du menu
      </div>
      <div className="rounded-xl bg-white p-3 shadow-card">
        <canvas ref={canvasRef} aria-label={label ?? "QR code"} />
      </div>
      {label && <p className="text-xs text-muted-foreground text-center max-w-[240px] break-all">{label}</p>}
      <div className="flex gap-2 w-full">
        <button
          onClick={downloadPng}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/50 transition-all focus-ring"
        >
          <Download className="w-3.5 h-3.5" />
          PNG
        </button>
        <button
          onClick={downloadSvg}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/50 transition-all focus-ring"
        >
          <Download className="w-3.5 h-3.5" />
          SVG
        </button>
      </div>
    </div>
  );
};
