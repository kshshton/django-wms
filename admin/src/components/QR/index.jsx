import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";

const QR = () => {
  const { id } = useParams();

  const downloadQRCode = () => {
    const qrCodeElement = document.querySelector(".qrWrapper");
    html2canvas(qrCodeElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${id}.png`;
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div
      className="container"
      style={{ marginTop: 250, flex: 1, flexDirection: "column" }}
    >
      <div className="qrWrapper">
        <QRCodeSVG value={id} size="256" />
      </div>
      <button style={{ marginTop: 20 }} onClick={downloadQRCode}>
        Download
      </button>
    </div>
  );
};

export default QR;
