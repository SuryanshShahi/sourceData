import { useEffect } from 'react'

const useScrollHidden = (shouldHide: boolean) => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    if (shouldHide) {
      html.classList.add('overflow-hidden')
    } else {
      html.classList.remove('overflow-hidden')
    }
  }, [shouldHide])
}

export default useScrollHidden
