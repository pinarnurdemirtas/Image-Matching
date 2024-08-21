import React, { useState, useEffect } from "react";
import { Card, notification } from "antd";
import "./flip.css";

const images = [
  "https://i.pinimg.com/474x/73/d8/92/73d89287de2a9f5a0ff80cb372c267d4.jpg",
  "https://i.pinimg.com/236x/0c/f5/e4/0cf5e4800504443f8f047e0d700925c8.jpg",
  "https://i.pinimg.com/736x/aa/f3/f2/aaf3f23526e801fc9dd4741a08a26f1e.jpg",
  "https://i.pinimg.com/236x/9c/f6/ad/9cf6ad43be33319c49ba858b44b31641.jpg",
  "https://i.pinimg.com/236x/9c/f6/ad/9cf6ad43be33319c49ba858b44b31641.jpg",
  "https://i.pinimg.com/236x/0c/f5/e4/0cf5e4800504443f8f047e0d700925c8.jpg",
  "https://i.pinimg.com/474x/fb/f6/f8/fbf6f8daafb89a7e18bf6eaaf3450b02.jpg",
  "https://i.pinimg.com/236x/09/99/90/0999909cf0cb6a09dbf28b75f3ee7cfb.jpg",
  "https://i.pinimg.com/474x/73/d8/92/73d89287de2a9f5a0ff80cb372c267d4.jpg",
  "https://i.pinimg.com/736x/aa/f3/f2/aaf3f23526e801fc9dd4741a08a26f1e.jpg",
  "https://i.pinimg.com/474x/fb/f6/f8/fbf6f8daafb89a7e18bf6eaaf3450b02.jpg",
  "https://i.pinimg.com/236x/09/99/90/0999909cf0cb6a09dbf28b75f3ee7cfb.jpg",
];

const ImageCardList = () => {
  const [flippedcard, setFlippedcard] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (flippedcard.length === 2) {
      const [firstcard, secondcard] = flippedcard;

      if (images[firstcard] === images[secondcard]) {
        // Kartlar eşleştiğinde
        setMatchedCards((matching) => [...matching, firstcard, secondcard]);

        notification.success({
          message: "Başarı",
          description: "Kartlar eşleşti!",
          duration: 1,
        });
        setFlippedcard([]);
      } else {
        // Kartlar eşleşmediğinde
        const timer = setTimeout(() => {
          notification.error({
            message: "Başarısız",
            description: "Kartlar eşleşmedi!",
            duration: 1,
          });
          setFlippedcard([]);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [flippedcard]);

  const handleFlip = (index) => {
    // Eğer kart daha önce eşleştiyse işlem yapma
    if (matchedCards.includes(index) || flippedcard.includes(index)) {
      return;
    }

    setFlippedcard((matching) =>
      matching.length === 2 ? [index] : [...matching, index]
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1 className="baslik">CARD MATCHİNG</h1>
      <div className="flip-card-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="flip-card"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`flip-card-inner ${
                flippedcard.includes(index) || matchedCards.includes(index)
                  ? "flipped"
                  : ""
              }`}
            >
              <div className="flip-card-front">
                <Card
                  cover={
                    <img
                      src="https://i.pinimg.com/564x/97/e6/21/97e621b54ad134f3fd2eed04835771e7.jpg"
                      alt={`Front ${index}`}
                      style={{ width: 200, height: 240, borderRadius: 0 }}
                    />
                  }
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <div className="flip-card-back">
                <Card
                  cover={
                    <img
                      src={image}
                      alt={`Back ${index}`}
                      style={{ width: 200, height: 240, borderRadius: 0 }}
                    />
                  }
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCardList;
