import { useState } from "react";

function FormInput({ onSubmit }) {
    const [form, setForm] = useState({
        Pclass: "",
        Name: "",
        Sex: "",
        Age: "",
        Fare: "",
        SibSp: "",
        Parch: "",
        ticket: "",
        Cabin: "",
        Embarked: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const data = {
            Pclass: form.Pclass,
            Sex: form.Sex,
            Age: form.Age,
            Fare: form.Fare,
            SibSp: form.SibSp,
            Parch: form.Parch,
            ticket: form.ticket,
            Cabin: form.Cabin,
            Name: form.Name,
            Embarked: form.Embarked
        };

        onSubmit(data);
    };
    const containerStyle = {
        maxWidth: "500px",
        margin: "30px auto",
        padding: "25px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "Arial"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none"
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        background: "linear-gradient(135deg, #4cafef, #007bff)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: "center" }}>🚢 Nhập thông tin hành khách</h2>

            <input name="Name" placeholder="Tên" value={form.Name} onChange={handleChange} style={inputStyle} />

            <input name="Pclass" placeholder="Hạng vé (1-3)" value={form.Pclass} onChange={handleChange} style={inputStyle} />

            <select name="Sex" value={form.Sex} onChange={handleChange} style={inputStyle}>
                <option value="">Chọn giới tính</option>
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
            </select>

            <input name="Age" placeholder="Tuổi" value={form.Age} onChange={handleChange} style={inputStyle} />

            <input name="Fare" placeholder="Giá vé" value={form.Fare} onChange={handleChange} style={inputStyle} />

            <input name="SibSp" placeholder="Anh chị em/vợ chồng" value={form.SibSp} onChange={handleChange} style={inputStyle} />

            <input name="Parch" placeholder="Cha mẹ/con cái" value={form.Parch} onChange={handleChange} style={inputStyle} />

            <input name="ticket" placeholder="Ticket" value={form.ticket} onChange={handleChange} style={inputStyle} />

            <input name="Cabin" placeholder="Cabin" value={form.Cabin} onChange={handleChange} style={inputStyle} />

            <select name="Embarked" value={form.Embarked} onChange={handleChange} style={inputStyle}>
                <option value="">Chọn cảng</option>
                <option value="C">Cherbourg</option>
                <option value="Q">Queenstown</option>
                <option value="S">Southampton</option>
            </select>

            <button style={buttonStyle} onClick={handleSubmit}>
                Dự đoán
            </button>
        </div>
    );
}

export default FormInput;