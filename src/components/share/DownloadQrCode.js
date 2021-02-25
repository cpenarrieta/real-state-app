import React, { Component } from "react";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";

class DownloadQrCode extends Component {
  constructor(props) {
    super(props);
    this.token = props.token;
    this.serviceKey = props.serviceKey;
  }

  codeClassName = `QRCode-${this.props.serviceKey}`;

  refCallback(node) {
    if (node) {
      const nodeId = node.title;
      const canvas = document.querySelector(`.QRCode-${nodeId} > canvas`);
      node.href = canvas.toDataURL();
      node.download = `RealtorApp-QRCode-${nodeId}.png`;
    }
  }

  render() {
    return (
      <>
        <div hidden className={this.codeClassName}>
          <QRCode value={this.token} size={1024} />
        </div>
        <Link
          to="/"
          target="_blank"
          title={this.serviceKey}
          innerRef={this.refCallback}
          className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <svg
            className="-ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </Link>
      </>
    );
  }
}

export { DownloadQrCode };
