import { useState } from "react";

function FormInput({ onSubmit, loading = false }) {
    const [form, setForm] = useState({
        Pclass: "",
        Name: "",
        Sex: "",
        Age: "",
        Fare: "",
        SibSp: "",
        Parch: "",
        Ticket: "",
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
    // Chuyển đổi kiểu trước (Number("") = 0, nên cần check rỗng riêng)
    const ageNum   = Number(form.Age);
    const fareNum  = Number(form.Fare);
    const sibspNum = Number(form.SibSp);
    const parchNum = Number(form.Parch);

    // Mỗi phần tử: [điều kiện lỗi, thông báo hiển thị]
    const rules = [
        [!form.Name.trim(),                                                                    "Vui lòng nhập họ tên"],
        [!!form.Name.trim() && !form.Name.includes("."),                                       "Tên phải có dấu chấm, vd: Braund, Mr. Owen Harris"],
        [!form.Pclass,                                                                         "Vui lòng chọn hạng vé"],
        [!form.Sex,                                                                            "Vui lòng chọn giới tính"],
        [form.Age === "",                                                                       "Vui lòng nhập tuổi"],
        [form.Age !== "" && (isNaN(ageNum) || ageNum < 0 || ageNum > 120),                    "Tuổi phải là số hợp lệ trong khoảng 0–120"],
        [form.Fare === "",                                                                      "Vui lòng nhập giá vé"],
        [form.Fare !== "" && (isNaN(fareNum) || fareNum < 0),                                 "Giá vé phải là số hợp lệ và không âm"],
        [form.SibSp === "",                                                                    "Vui lòng nhập số anh/chị/em"],
        [form.SibSp !== "" && (!Number.isInteger(sibspNum) || sibspNum < 0 || sibspNum > 10), "SibSp phải là số nguyên trong khoảng 0–10"],
        [form.Parch === "",                                                                    "Vui lòng nhập số cha mẹ/con cái"],
        [form.Parch !== "" && (!Number.isInteger(parchNum) || parchNum < 0 || parchNum > 10), "Parch phải là số nguyên trong khoảng 0–10"],
        [!form.Embarked,                                                                       "Vui lòng chọn cảng khởi hành"],
    ];

    const firstError = rules.find(([cond]) => cond);
    if (firstError) {
        alert(firstError[1]);
        return;
    }

    const data = {
        Pclass:   Number(form.Pclass),
        Sex:      form.Sex,
        Age:      ageNum,
        Fare:     fareNum,
        SibSp:    sibspNum,
        Parch:    parchNum,
        Ticket:   form.Ticket,
        Cabin:    form.Cabin,
        Name:     form.Name.trim(),
        Embarked: form.Embarked,
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

    const fieldStyle = {
        marginBottom: "10px"
    };

    const labelStyle = {
        fontWeight: "600",
        marginBottom: "4px",
        color: "#1f2937"
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

            <div style={fieldStyle}>
                <label style={labelStyle}>Họ và tên hành khách</label>
                <input
                    name="Name"
                    placeholder="Ví dụ: Mr. Pips"
                    value={form.Name}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Hạng vé</label>
                <select name="Pclass" value={form.Pclass} onChange={handleChange} style={inputStyle}>
                    <option value="">Chọn hạng vé</option>
                    <option value="1">Hạng 1</option>
                    <option value="2">Hạng 2</option>
                    <option value="3">Hạng 3</option>
                </select>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Giới tính</label>
                <select name="Sex" value={form.Sex} onChange={handleChange} style={inputStyle}>
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Tuổi</label>
                <input
                    name="Age"
                    placeholder="Ví dụ: 22"
                    value={form.Age}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Giá vé</label>
                <input
                    name="Fare"
                    placeholder="Ví dụ: 7.25"
                    value={form.Fare}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Số anh/chị/em hoặc vợ/chồng đi cùng</label>
                <input
                    name="SibSp"
                    placeholder="Ví dụ: 1"
                    value={form.SibSp}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Số cha mẹ hoặc con cái đi cùng</label>
                <input
                    name="Parch"
                    placeholder="Ví dụ: 0"
                    value={form.Parch}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Số vé</label>
                <input
                    name="Ticket"
                    placeholder="Ví dụ: A/5 21171"
                    value={form.Ticket}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Mã cabin</label>
                <input
                    name="Cabin"
                    placeholder="Ví dụ: C85"
                    value={form.Cabin}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            <div style={fieldStyle}>
                <label style={labelStyle}>Cảng khởi hành</label>
                <select name="Embarked" value={form.Embarked} onChange={handleChange} style={inputStyle}>
                    <option value="">Chọn cảng</option>
                    <option value="C">Cherbourg</option>
                    <option value="Q">Queenstown</option>
                    <option value="S">Southampton</option>
                </select>
            </div>

            <button style={buttonStyle} onClick={handleSubmit} disabled={loading}>
                {loading ? "Đang dự đoán..." : "Dự đoán"}
            </button>
        </div>
    );
}

export default FormInput;