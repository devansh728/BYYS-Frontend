import React, { useState, useRef , useEffect} from 'react';
import html2canvas from "html2canvas";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './JoinForm.css';

const JoinForm = () => {
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: null,
    membershipId: null
  });
  const [formData, setFormData] = useState({
    photo: null,
    fullName: '',
    age: '',
    whatsappNumber: '',
    phone: '',
    email: '',
    state: '',
    district: '', // Changed from city to district
    block: '',    // New field added
    profession: '',
    instituteName: '',
    instituteAddress: '',
    referralCode: '',
    villageTownCity: '' // New field added
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const idCardRef = useRef(null);
  const showIdCard = submissionStatus.success;

  // Complete state-district data for all 28 states and 8 union territories
  const stateDistrictData = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'Alluri Sitharama Raju', 'Anakapalli', 'Annamayya', 'Bapatla', 'Eluru', 'Kakinada', 'Konaseema', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Tirupati'],

    'Arunachal Pradesh': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Dibang Valley', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],

    'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong', 'Bajali', 'Tamulpur'],

    'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],

    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela Pendra Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur', 'Mohla Manpur', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja', 'Sarangarh Bilaigarh', 'Shakti'],

    'Goa': ['North Goa', 'South Goa'],

    'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],

    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],

    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],

    'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahebganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],

    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir', 'Vijayanagara'],

    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],

    'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chachaura', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha', 'Narmadapuram'],

    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],

    'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],

    'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],

    'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Kolasib', 'Khawzawl', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip', 'Saitual'],

    'Nagaland': ['Chumukedima', 'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Niuland', 'Noklak', 'Peren', 'Phek', 'Shamator', 'Tseminyu', 'Tuensang', 'Wokha', 'Zunheboto'],

    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],

    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Mohali', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'Shaheed Bhagat Singh Nagar', 'Tarn Taran'],

    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],

    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim', 'Pakyong', 'Soreng'],

    'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],

    'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hanamkonda', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'],

    'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],

    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],

    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],

    'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],

    // Union Territories
    'Andaman and Nicobar Islands': ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Jammu and Kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Lakshadweep': ['Lakshadweep'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  };

  const states = Object.keys(stateDistrictData).sort();

  const generateMemberId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `BYVS${year}${random}`;
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    try {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Reset district when state changes
      if (name === 'state') {
        setFormData(prev => ({
          ...prev,
          district: '',
          block: ''
        }));
      }
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          photo: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'age', 'whatsappNumber',
      'email', 'state', 'district', 'block', 'profession',
      'instituteName', 'instituteAddress'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }

    if (formData.age < 16 || formData.age > 35) {
      alert('Age must be between 16 and 35 years');
      return false;
    }

    // Phone number validation (assuming a simple 10-digit number for now based on your UI)
    const phoneRegex = /^(?:\+91\d{10}|\d{10})$/;
    if (!phoneRegex.test(formData.whatsappNumber)) {
      alert('Please enter a valid phone number (either 10 digits or +91 followed by 10 digits).');
      return false;
    }

    return true;
  };

  const sendEmail = async (memberIdNumber) => {
    console.log(`Email sent to ${formData.email} with Member ID: ${memberIdNumber}`);
    alert(`Congratulations! Welcome to BYVS. Your membership ID ${memberIdNumber} has been sent to your email.`);
  };

  const downloadIdCard = async (format) => {
    if (!idCardRef.current) return;

    try {
      const canvas = await html2canvas(idCardRef.current, {
        scale: 2,
        allowTaint: false,
        useCORS: true
      });

      if (format === 'jpg') {
        const link = document.createElement('a');
        link.download = `BYVS_ID_Card_${memberId}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
      } else if (format === 'pdf') {
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 85.6;
        const imgHeight = 54;
        const x = (210 - imgWidth) / 2;
        const y = 50;
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`BYVS_ID_Card_${memberId}.pdf`);
      }
    } catch (error) {
      console.error('Error generating ID card:', error);
      alert('Error generating ID card. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmissionStatus({ loading: true, success: false, error: null, membershipId: null });

    try {
        if (!validateForm()) {
            setSubmissionStatus({ loading: false, success: false, error: 'Form validation failed.', membershipId: null });
            return;
        }

        // Construct the FormData object with individual fields for the multipart request
        const data = new FormData();

        // Append each data field as a separate part
        data.append('fullName', formData.fullName);
        data.append('age', parseInt(formData.age, 10));
        data.append('phone', formData.phone);
        data.append('email', formData.email);
        data.append('whatsappNumber', formData.whatsappNumber);
        data.append('villageTownCity', formData.villageTownCity);
        data.append('blockName', formData.block);
        data.append('district', formData.district);
        data.append('state', formData.state);
        data.append('profession', formData.profession);
        data.append('institutionName', formData.institutionName);
        data.append('institutionAddress', formData.institutionAddress);
        if (formData.referralCode) {
            data.append('referralCode', formData.referralCode);
        }

        // Append the photo file if it exists
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            const response = await fetch('https://byys-backend.onrender.com/auth/otp', {
                method: 'POST',
                body: data // The FormData object automatically sets the correct Content-Type header
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed.');
            }

            const responseData = await response.json();
            const membershipId = responseData.membershipId;
            setSubmissionStatus({ loading: false, success: true, error: null, membershipId });
            navigate('/login', { state: { membershipId, registrationSuccess: true } });
        } catch (error) {
            setSubmissionStatus({ loading: false, success: false, error: error.message, membershipId: null });
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
    }
};

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="join-byvs">
      <div className="page-header">
        <h1>Join BYVS Today!</h1>
        <p>Become part of a movement that empowers youth and preserves our cultural heritage</p>
      </div>

      {!showIdCard ? (
        <div className="membership-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Membership Registration Form</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="photo-upload">
                  <div className="photo-upload-container">
                    <input
                      type="file"
                      id="photo-input"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    <label htmlFor="photo-input" className="photo-upload-label">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <i className="fas fa-camera"></i>
                          <span>Upload Your Photo</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="16"
                    max="35"
                    placeholder="16-35 years"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsappNumber">WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    placeholder="Enter WhatsApp number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsappNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter Phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="district">District *</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.state}
                  >
                    <option value="">Select District</option>
                    {formData.state && stateDistrictData[formData.state]?.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="block">Block *</label>
                  <input
                    type="text"
                    id="block"
                    name="block"
                    value={formData.block}
                    onChange={handleInputChange}
                    placeholder="Enter your block"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="block">Village/Town/City *</label>
                  <input
                    type="text"
                    id="block"
                    name="block"
                    value={formData.villageTownCity}
                    onChange={handleInputChange}
                    placeholder="Enter your Town"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profession">Profession *</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    placeholder="Enter your profession"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="referralCode">Referral Code (if any)</label>
                  <input
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instituteName">School/College Name *</label>
                  <input
                    type="text"
                    id="instituteName"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    placeholder="Enter your school or college name"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="instituteAddress">School/College Address *</label>
                  <textarea
                    id="instituteAddress"
                    name="instituteAddress"
                    value={formData.instituteAddress}
                    onChange={handleInputChange}
                    placeholder="Enter complete school or college address"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="credentials-note">
                <p>⚠️ Please ensure all information is accurate as it will appear on your membership ID card</p>
              </div>

              <button type="submit" className="submit-btn" disabled={submissionStatus.loading}>
              {submissionStatus.loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
              {submissionStatus.loading ? 'Submitting...' : 'Submit Registration'}
            </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="id-card-section">
          <div className="success-message">
            <p>🎉 **Welcome to BYVS!**</p>
            <p>Congratulations, now you are a family member of team BYVS.</p>
            <p>Your membership details have been sent to your email.</p>
          </div>

          <div className="id-card-wrapper">
            <div className="new-id-card" ref={idCardRef}>
              {/* Header */}
              <header className="new-card-header">
                <div className="new-logo-section">
                  <img src="/assests/logo.jpg" alt="BYVS Logo" />
                  <p>REG. NO. : 66/22</p>
                </div>
                <div className="new-header-text">
                  <h2>BHARATIYA YUVA VIDYARTHI SANGATHAN (BYVS)</h2>
                  <p className="new-tagline">"FOR YOU , WITH YOU , FROM YOU"</p>
                </div>
              </header>

              {/* Membership Title */}
              <div className="new-title-section">
                <h3>MEMBERSHIP ID CARD</h3>
              </div>

              {/* Body */}
              <div className="new-body-section">
                <div className="new-left">
                  <p><strong>Name :</strong> {formData.fullName}</p>
                  <p><strong>Member ID :</strong> {memberId}</p>
                  <p><strong>State :</strong> {formData.state}</p>
                  <p><strong>District :</strong> {formData.district}</p>
                  <p><strong>Block :</strong> {formData.block}</p>
                  <p><strong>D.O.I :</strong> {getCurrentDate()}</p>
                </div>
                <div className="new-right">
                  <div className="new-photo">
                    {photoPreview && (
                      <img src={photoPreview} alt="Member Photo" />
                    )}
                  </div>
                  <div className="new-signature">
                    <img src="/assests/signature.jpg" alt="Signature" />
                    <p>Founder & National President</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="new-card-footer">
                <p>BHARATIYA YUVA VIDYARTHI SANGATHAN (BYVS)</p>
              </footer>
            </div>
          </div>

          <div className="download-buttons">
            <button onClick={() => downloadIdCard('jpg')} className="download-btn">
              <i className="fas fa-download"></i> Download JPG
            </button>
            <button onClick={() => downloadIdCard('pdf')} className="download-btn">
              <i className="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Membership Benefits Section */}
      <div className="membership-benefits">
        <div className="benefits-container">
          <h3>Membership Benefits</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h4>Official Recognition</h4>
              <p>Receive official membership certificate and ID card from a registered organization</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h4>Support Network</h4>
              <p>Get family-like support and guidance whenever you need it</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h4>Career Enhancement</h4>
              <p>Boost your CV with NGO membership and social service experience</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Community Building</h4>
              <p>Connect with like-minded youth across India and build lasting relationships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
