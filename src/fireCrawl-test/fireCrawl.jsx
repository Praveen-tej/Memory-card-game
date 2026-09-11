import { useEffect, useState } from "react";

function FirecrawlTest() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Firecrawl Popup Test</h1>

      <p>
        This is the actual website content that Firecrawl should scrape.
      </p>

      <h2>Products</h2>

      <ul>
        <li>Laptop</li>
        <li>Mobile Phone</li>
        <li>Headphones</li>
      </ul>

      {showPopup && (
        <div
          id="popup"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              id="closePopup"
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
              }}
            >
              X
            </button>

            <h2>🎁 Special Offer!</h2>

            <p>Spin & Win a Free Prize!</p>

            <button>Spin Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FirecrawlTest;