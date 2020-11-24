import React from 'react'
import loadingDefault from "../images/loading.gif";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center content-center">
      <img src={loadingDefault} className="w-56 h-56" alt="loading" />
    </div>
  )
}
