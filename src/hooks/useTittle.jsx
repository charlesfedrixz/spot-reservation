import React, { useEffect } from 'react'

export default function useTittle(title) {
  useEffect(() => {
    document.title = title ? `${title} - SearchMyPlay` : 'SearchMyPlay';
  })
}
