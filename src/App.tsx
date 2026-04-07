import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState<'ask' | 'success' | 'final'>( 'ask')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const moveButton = () => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const buttonWidth = 100
    const buttonHeight = 50
    
    // Calculate random position within container bounds
    const maxX = container.width - buttonWidth
    const maxY = container.height - buttonHeight
    
    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY
    
    setNoButtonStyle({
      position: 'absolute',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.2s ease-out'
    })
  }

  const handleYes = () => {
    setStep('success')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.trim()) {
      setStep('final')
    }
  }

  return (
    <div className="container" ref={containerRef}>
      {step === 'ask' && (
        <div className="card fade-in">
          <h1 className="title">Boleh minta nomor telponnya? 🥺💖</h1>
          <div className="button-group">
            <button className="btn btn-yes" onClick={handleYes}>Iya</button>
            <button 
              className="btn btn-no" 
              style={noButtonStyle}
              onMouseEnter={moveButton}
              onClick={moveButton}
            >
              Tdk
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="card fade-in">
          <h1 className="title">Yeay! Makasih yaa 🥰</h1>
          <p className="subtitle">Boleh ketik nomornya di sini?</p>
          <form onSubmit={handleSubmit} className="form">
            <input 
              type="tel" 
              placeholder="0812xxxxxx" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field"
              required
              autoFocus
            />
            <button type="submit" className="btn btn-submit">Kirim ✨</button>
          </form>
        </div>
      )}

      {step === 'final' && (
        <div className="card fade-in final-card">
          <h1 className="title">Makasih banget ya! ✨</h1>
          <p className="encouragement-text">
            Semangat terus buat hari-harinya! <br />
            Semoga segala urusanmu lancar dan bahagia selalu. <br />
            Ditunggu chatnya ya! 💖
          </p>
          <div className="heart-icon">💝</div>
        </div>
      )}
    </div>
  )
}

export default App
