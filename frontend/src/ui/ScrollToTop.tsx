import {useState, useEffect} from 'react'
import {FiArrowUp} from 'react-icons/fi'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-amber-700 text-white hover:bg-amber-800 hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </>
  )
}
