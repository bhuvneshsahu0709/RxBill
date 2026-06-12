# 🏥 RxBill - AI-Powered Prescription Analyzer & Invoice Generator

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Material--UI-5.0-purple?style=for-the-badge&logo=mui" alt="Material-UI" />
</div>

<br>

<div align="center">
  <h3>✨ Transform handwritten prescriptions into digital invoices with AI precision</h3>
  <p>A modern, beautiful medical application that uses Google's Gemini AI to analyze prescription images and generate professional invoices automatically.</p>
</div>

---

## Screenshots

<img width="1919" height="917" alt="Screenshot 2026-06-13 010926" src="https://github.com/user-attachments/assets/c2a00923-79fc-49bf-ab4d-6174d23a8a3c" />
<img width="1919" height="922" alt="Screenshot 2026-06-13 010917" src="https://github.com/user-attachments/assets/e5958708-09ae-4d4e-9def-637b6bce0295" />
<img width="1919" height="904" alt="Screenshot 2026-06-13 010904" src="https://github.com/user-attachments/assets/e1a0b29f-c0d7-4bc4-9279-b9c8013e75cd" />


## 🌟 Features

### 🔍 **AI-Powered Prescription Analysis**
- **Smart Image Recognition**: Upload prescription images (JPG, PNG, JPEG)
- **Automatic Data Parsing**: Extracts medicines, dosages, frequencies, and patient details
- **Multi-Model Support**: Intelligent model selection for optimal results

### 💊 **Medicine Management**
- **Automatic Price Estimation**: Smart pricing based on medicine type and dosage
- **Comprehensive Database**: Built-in medicine price database
- **Dosage Analysis**: Extracts dosage, frequency, and duration information
- **Special Instructions**: Captures doctor's specific instructions

### 🧾 **Professional Invoice Generation**
- **Beautiful PDF Export**: High-quality invoice generation
- **Medical Branding**: Professional medical theme and styling
- **Automatic Calculations**: Subtotal, tax, and total calculations
- **Customizable Fields**: Editable patient, doctor, and medicine details

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful glass-like interface
- **Animated Backgrounds**: Floating medical symbols and gradients
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Professional medical color scheme
- **Smooth Animations**: Hover effects and transitions

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhuvneshsahu0709/RxBill.git
   cd RxBill
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../DoctorsHandwiring
   npm install
   ```

4. **Environment Configuration**
   
   Create `Backend/.env` file:
   ```env
   PORT=5000
   ```

5. **Start the Application**
   
   **Backend:**
   ```bash
   cd Backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd DoctorsHandwiring
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 📱 How to Use

### 1. **Upload Prescription**
- Drag and drop or click to select prescription image
- Supports JPG, PNG, JPEG formats (max 5MB)
- Beautiful upload interface with progress indicators

### 2. **AI Analysis**
- LLM automatically analyzes the image
- Extracts medicine names, dosages, frequencies
- Identifies patient and doctor information
- Handles multiple medicine formats

### 3. **Review & Edit**
- Review extracted information
- Edit medicine details if needed
- Add or remove medicines
- Verify patient and doctor information

### 4. **Generate Invoice**
- Switch to "Generate Invoice" tab
- Automatic price estimation for all medicines
- Professional medical invoice layout
- Download as PDF

---

## 🛠️ Technical Stack

### **Frontend**
- **React 18.2.0** - Modern UI framework
- **Material-UI 5** - Component library
- **Vite** - Fast build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **jsPDF** - PDF generation
- **html2canvas** - Screenshot capture

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### **AI & ML**
- **Multi-model support** - Automatic model selection
- **JSON response parsing** - Structured data extraction
- **Error handling** - Robust retry mechanisms

---

## 📁 Project Structure

```
RxBill/
├── Backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── DoctorsHandwiring/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Global styles
│   │   ├── Pages/
│   │   │   └── PrescriptionUpload.jsx
│   │   └── Components/
│   │       └── InvoiceGenerator.jsx
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # Project documentation
```

---



## 🎯 Key Features Explained

### **Smart Price Estimation**
- Analyzes medicine names and dosages
- Uses built-in database for common medicines
- Fallback pricing based on medicine type
- Never shows zero prices

### **Robust Error Handling**
- Multiple retry attempts for API calls
- Graceful fallback to alternative models
- User-friendly error messages
- Comprehensive logging

### **Professional Invoice Design**
- Medical-themed branding
- Clean, professional layout
- Automatic calculations
- PDF export functionality

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Material-UI** for beautiful component library
- **React Community** for excellent documentation and support
- **Medical professionals** who inspired this project



<div align="center">
  <p>Made with ❤️ for the medical community</p>
  <p>⭐ Star this repository if you found it helpful!</p>

</div>

