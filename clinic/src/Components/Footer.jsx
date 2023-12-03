import React from 'react'

const Footer = ({props, children}) => {
  return (
    <footer className={`p-3 d-flex gap-2 align-items-center footer text-light justify-content-end w-100 ${props}`}>
      {children}
    </footer>
  )
}

export default Footer