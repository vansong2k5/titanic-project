import React from "react";

function ResultCard({ result }) {
    const isSurvived = result === 1;

    const cardStyle = {
        maxWidth: "400px",
        margin: "20px auto",
        padding: "25px",
        borderRadius: "16px",
        // Tách case: null = chưa có kết quả → màu xám/neutral
        background: result === null
            ? "linear-gradient(135deg, #9e9e9e, #616161)"   // chưa dự đoán
            : isSurvived
                ? "linear-gradient(135deg, #4caf50, #2ecc71)"
                : "linear-gradient(135deg, #e74c3c, #c0392b)",

        color: "#fff",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        fontFamily: "Arial",
        transition: "0.3s"
    };

    const titleStyle = {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "10px"
    };

    const emojiStyle = {
        fontSize: "50px",
        marginBottom: "10px"
    };

    return (
        <>{result !==null && result!==undefined ? (<div style={cardStyle}>
            <div style={emojiStyle}>
                {isSurvived ? "🎉" : "💀"}
            </div>

            <div style={titleStyle}>
                {isSurvived ? "Sống sót!" : "Không sống sót"}
            </div>

            <p>
                {isSurvived
                    ? "Hành khách này có khả năng sống sót cao 🚢"
                    : "Rất tiếc, khả năng sống sót thấp 😢"}
            </p>
        </div>) :
           ( <div style={cardStyle}>
                <p style={titleStyle}>Vui lòng nhập thông tin!</p>
            </div>)}
        </>
    );
}

export default ResultCard;