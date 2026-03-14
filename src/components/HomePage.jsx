import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">🧠 Brain Hack</h1>
                <p className="home-description">
                    Test your memory! Match all the cards to win!
                </p>
                <button className="play-btn" onClick={() => navigate('/game')}>
                    Play Now 🎮
                </button>
            </div>
        </div>
    )
}