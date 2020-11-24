import React from 'react'
import errorDefault from "../images/error.gif";

export default function Error() {
  return (
    <div className="h-screen flex flex-col justify-center items-center content-center">
      <img src={errorDefault} className="w-56 h-56" alt="loading" />
      <h3 className="text-lg mt-2">Something went wrong. Try refreshing the page or report this bug to us.</h3>
    </div>
  )
}
