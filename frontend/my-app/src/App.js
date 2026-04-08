import React from 'react';
import FormInput from './components/formInput';
import ResultCard from './components/resultCar';

function App() {
  const [result, setResult] = React.useState(null);
   const handleSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      setResult(json.result);

    } catch (err) {
      console.error(err);
    }
  };
  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #74ebd5, #9face6)",
      fontFamily: "Arial"
    },
    header: {
      textAlign: "center",
      padding: "40px 20px",
      color: "white"
    },
    title: {
      fontSize: "32px",
      marginBottom: "10px"
    },
    subtitle: {
      fontSize: "16px",
      opacity: 0.9
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "30px",
      padding: "20px",
      flexWrap: "wrap"
    },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>🚢 Titanic Survival Predictor</h1>
        <p style={styles.subtitle}>
          Dự đoán khả năng sống sót của hành khách
        </p>
      </div>
      <div style={styles.container}>
        
        <div style={styles.card}>
          <FormInput onSubmit={handleSubmit}/>
        </div>
        <div style={styles.card}>
          <ResultCard result={result} />
        </div>

      </div>

    </div>
  );
}

export default App;
