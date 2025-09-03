import React, { useState, useEffect } from 'react';
import './CoreCommittee.css';

const CoreCommittee = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtCommittee, setDistrictCommittee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // District mapping for major states
  const stateDistricts = {
    'Andhra Pradesh': [
      'Srikakulam', 'Parvathipuram Manyam', 'Vizianagaram', 'Visakhapatnam', 'Anakapalli',
      'Alluri Sitharama Raju', 'East Godavari', 'Kakinada', 'Konaseema', 'Eluru', 'NTR',
      'Guntur', 'West Godavari', 'Bapatla', 'Palnadu', 'Sri Potti Sriramulu Nellore',
      'Prakasam', 'Tirupati', 'Annamayya', 'YSR Kadapa', 'Chittoor', 'Anantapur',
      'Kurnool', 'Sri Satya Sai', 'Nandyal', 'Sri Balaji'
    ],
    'Arunachal Pradesh': [
      'Tawang', 'West Kameng', 'Bichom', 'East Kameng', 'Pakke-Kessang', 'Kurung Kumey',
      'Papum Pare', 'Itanagar', 'Kra Daadi', 'Lower Subansiri', 'Kamle', 'Keyi Panyor',
      'Upper Subansiri', 'Shi-Yomi', 'West Siang', 'Siang', 'Lower Siang', 'Lepa-Rada',
      'Upper Siang', 'East Siang', 'Dibang Valley', 'Lower Dibang Valley', 'Lohit',
      'Anjaw', 'Namsai', 'Changlang', 'Tirap', 'Longding'
    ],
    'Assam': [
      'Baksa', 'Barpeta', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang',
      'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat',
      'Hailakandi', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong',
      'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon',
      'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia',
      'Udalguri', 'West Karbi Anglong', 'Hojai', 'Biswanath', 'Charaideo', 'Bajali'
    ],
    'Bihar': [
      'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur',
      'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad',
      'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura',
      'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia',
      'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi',
      'Siwan', 'Supaul', 'Vaishali', 'West Champaran'
    ],
    'Chhattisgarh': [
      'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur',
      'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
      'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba',
      'Koriya', 'Mahasamund', 'Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki',
      'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur',
      'Surguja', 'Sarangarh-Bilaigarh', 'Shakti', 'Khairagarh-Chhuikhadan-Gandai'
    ],
    'Goa': [
      'North Goa', 'South Goa'
    ],
    'Gujarat': [
      'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar',
      'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar',
      'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana',
      'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot',
      'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
    ],
    'Haryana': [
      'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram',
      'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh',
      'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat',
      'Yamunanagar'
    ],
    'Himachal Pradesh': [
      'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti',
      'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
    ],
    'Jharkhand': [
      'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa',
      'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma',
      'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj',
      'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'
    ],
    'Karnataka': [
      'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar',
      'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada',
      'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu',
      'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga',
      'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir', 'Vijayanagara'
    ],
    'Kerala': [
      'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam',
      'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram',
      'Thrissur', 'Wayanad'
    ],
    'Madhya Pradesh': [
      'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul',
      'Bhind', 'Bhopal', 'Burhanpur', 'Chachaura', 'Chhatarpur', 'Chhindwara', 'Damoh',
      'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad',
      'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Maihar', 'Mandla',
      'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen',
      'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol',
      'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain',
      'Umaria', 'Vidisha'
    ],
    'Maharashtra': [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana',
      'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna',
      'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded',
      'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad',
      'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha',
      'Washim', 'Yavatmal'
    ],
    'Manipur': [
      'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam',
      'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong',
      'Tengnoupal', 'Thoubal', 'Ukhrul'
    ],
    'Meghalaya': [
      'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills',
      'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills',
      'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'
    ],
    'Mizoram': [
      'Aizawl', 'Champhai', 'Hnahthial', 'Kolasib', 'Khawzawl', 'Lawngtlai', 'Lunglei',
      'Mamit', 'Saiha', 'Saitual', 'Serchhip'
    ],
    'Nagaland': [
      'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Noklak', 'Peren',
      'Phek', 'Tuensang', 'Wokha', 'Zunheboto', 'Chümoukedima', 'Niuland', 'Chumukedima',
      'Tseminyu'
    ],
    'Odisha': [
      'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh',
      'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghapur', 'Jajpur', 'Jharsuguda',
      'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput',
      'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri',
      'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'
    ],
    'Punjab': [
      'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka',
      'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana',
      'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar',
      'Sangrur', 'SAS Nagar', 'Shaheed Bhagat Singh Nagar', 'Tarn Taran'
    ],
    'Rajasthan': [
      'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner',
      'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh',
      'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli',
      'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar',
      'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'
    ],
    'Sikkim': [
      'East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim', 'Pakyong', 'Soreng'
    ],
    'Tamil Nadu': [
      'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
      'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri',
      'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur',
      'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
      'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
      'Tiruppur', 'Tiruvallur', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
    ],
    'Telangana': [
      'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
      'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam',
      'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahbubnagar', 'Mancherial', 'Medak',
      'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal',
      'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet',
      'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban',
      'Yadadri Bhuvanagiri'
    ],
    'Tripura': [
      'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura',
      'Unakoti', 'West Tripura'
    ],
    'Uttar Pradesh': [
      'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya',
      'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki',
      'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli',
      'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad',
      'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur',
      'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj',
      'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar',
      'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau',
      'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
      'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar',
      'Shahjahanpur', 'Shamli', 'Shrawasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra',
      'Sultanpur', 'Unnao', 'Varanasi'
    ],
    'Uttarakhand': [
      'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital',
      'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar',
      'Uttarkashi'
    ],
    'West Bengal': [
      'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling',
      'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda',
      'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
      'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
    ]
  };


  const nationalPositions = [
    { position: 'President', name: 'Raja Saksham Singh Yogi', photo: '/assests/founder.jpg' },
    { position: 'General Secretary', name: 'Pt. Bhanu Mishra (Harsh Bhaiya)', photo: '/assests/GeneralSecretary.jpg' },
    { position: 'Vice President', name: 'Raj Shekhar Singh', photo: '/assests/Coordinator.jpg' },// changed for raj bhaiya
    { position: 'Co-founder & Coordinator', name: 'Yash Pratap Singh', photo: '/assests/Yash.jpg' },
    { position: 'National Treasurer', name: 'Rupesh Soni', photo: '/assests/Treasurer.jpg' },
    { position: 'Media In Charge', name: 'Media In Charge', photo: '/assests/MediaIncharge.jpg' }

  ];

  const getStatePositions = (stateName) => [
    { position: 'President', name: `${stateName} President`, photo: `/assests/states/${stateName}/President.jpg` },
    { position: 'General Secretary', name: `${stateName} General Secretary`, photo: `/assests/states/${stateName}/GeneralSecretary.jpg` },
    { position: 'Vice President', name: `${stateName} Vice President`, photo: `/assests/states/${stateName}/VicePresident.jpg` },
    { position: 'Treasurer', name: `${stateName} Treasurer`, photo: `/assests/states/${stateName}/Treasurer.jpg` },
    { position: 'Coordinator', name: `${stateName} Coordinator`, photo: `/assests/states/${stateName}/Coordinator.jpg` },
    { position: 'Media In Charge', name: `${stateName} Media In Charge`, photo: `/assests/states/${stateName}/MediaInCharge.jpg` }
  ];

  const getDistrictPositions = (stateName, districtName) => [
    { position: 'President', name: `${districtName} President`, photo: `/assests/districts/${stateName}/${districtName}/President.jpg` },
    { position: 'General Secretary', name: `${districtName} General Secretary`, photo: `/assests/districts/${stateName}/${districtName}/GeneralSecretary.jpg` },
    { position: 'Vice President', name: `${districtName} Vice President`, photo: `/assests/districts/${stateName}/${districtName}/VicePresident.jpg` },
    { position: 'Treasurer', name: `${districtName} Treasurer`, photo: `/assests/districts/${stateName}/${districtName}/Treasurer.jpg` },
    { position: 'Coordinator', name: `${districtName} Coordinator`, photo: `/assests/districts/${stateName}/${districtName}/Coordinator.jpg` },
    { position: 'Media In Charge', name: `${districtName} Media In Charge`, photo: `/assests/districts/${stateName}/${districtName}/MediaInCharge.jpg` }
  ];



  // Updated Advisory Members
  const advisoryMembers = [
    {
      name: 'Shastri Kishore Dave Ji',
      designation: 'Chief Legal Advisor',
      photo: '/assests/ShastriKishoreDave.jpg'
    },
    {
      name: 'Dr. Nisheetha Dixit',
      designation: 'Women Wing Chief Advisor',
      photo: '/assests/Nishita.jpg'
    },
    {
      name: 'Dr Rati Hegde',
      designation: 'Advisory Member',
      photo: '/assests/RatiHegde.jpg'
    },
    {
      name: 'Satyam Singh',
      designation: 'Legal Advisor',
      photo: '/assests/SatyamSingh.jpg'
    },
    {
      name: 'Parth Srivastava',
      designation: 'Legal Advisor',
      photo: '/assests/ParthSrivastava.jpg'
    },
    {
      name: 'Aryan Singh',
      designation: 'Legal Adviser',
      photo: '/assests/AryanSingh.jpg'
    }
  ];

  useEffect(() => {
    const fetchDistrictCommittee = async () => {
      if (!selectedDistrict) {
        setDistrictCommittee([]);
        return;
      }


      // Start loading state
      setIsLoading(true);
      setError(null);



      try {
        const response = await fetch(`https://byvs-backend.onrender.com/api/office-bearer/approved-office-bearers?district=${encodeURIComponent(selectedDistrict)}`);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to fetch data from the server.');
        }

        const data = await response.json();
        setDistrictCommittee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistrictCommittee();
  }, [selectedDistrict]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(''); // Reset district when state changes
  };

  return (
    <div className="core-committee">
      {/* Header Spacer */}
      <div className="header-spacer"></div>

      {/* Page Title */}
      <div className="page-title">
        <h1>Core Committee</h1>
        <p>Leadership dedicated to youth empowerment and cultural preservation</p>
      </div>

      {/* Our Leadership Section */}
      <section className="leadership-section">
        <div className="section-header">
          <h2>Our Leadership</h2>
          <p>Meet the dedicated leaders who guide BYVS in its mission of youth empowerment</p>
        </div>

        {/* Jagadguru Shankaracharya Ji */}
        <div className="leader-profile shankaracharya-profile">
          <div className="leader-image">
            <img
              src="/assests/shankaraji.jpg"
              alt="Jagadguru Shankaracharya Ji"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-user-circle"></i>
              <h4>Jagadguru Shankaracharya Ji</h4>
            </div>
          </div>
          <div className="leader-content">
            <h3>Jagadguru Shankaracharya Ji</h3>
            <p>
              Swami Avimukteshwaranand Saraswati Ji – Current Jagadguru Shankaracharya of Jyotish Peeth, Joshimath, Uttarakhand, is a revered spiritual leader and mentor of Bhartiya Yuva Vidyarthi Sangathan (BYVS). Born in 1969 in Pratapgarh, Uttar Pradesh, he was initiated into spiritual life under the guidance of Swami Karapatri Ji Maharaj and later became a disciple of Swami Swaroopanand Saraswati Ji.
            </p>
            <blockquote className="leader-quote">
              <p>“युवा ही राष्ट्र की धरोहर और शक्ति हैं” </p>
            </blockquote>
            <p>
              A scholar of Sanskrit and Vedic texts, he has led movements for the preservation of Hindu culture and social welfare, including advocating for the Ganga's national recognition.
            </p>
            <p>
              He is the spiritual inspiration and guiding force behind Bhartiya Yuva Vidyarthi Sangathan (BYVS). With profound wisdom and divine insight, he provides spiritual guidance, mentorship, and support to BYVS, helping shape its vision and mission in youth empowerment, social service, and cultural revival. Under his guidance since 2023, BYVS continues to grow as a platform that blends spiritual values with active nation-building, inspiring young minds to serve society with dedication, discipline, national spirit and devotion.
            </p>
          </div>
        </div>

        {/* Raja Saksham Singh Yogi */}
        <div className="leader-profile founder-profile">
          <div className="leader-image">
            <img
              src="/assests/founder.jpg"
              alt="Raja Saksham Singh Yogi"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder" style={{ display: 'none' }}>
              <i className="fas fa-user-circle"></i>
              <h4>Raja Saksham Singh Yogi</h4>
            </div>
          </div>
          <div className="leader-content">
            <h3>Raja Saksham Singh Yogi</h3>
            <p>
              Raja Saksham Singh Yogi – Founder and National President of Bhartiya Yuva Vidyarthi Sangathan (BYVS), is a vibrant and visionary young leader, aged 23, who has been inspiring youth across India. Born on 18 June 2002 in Patti town, Pratapgarh District, he founded BYVS in 2020 at the age of 18, shortly after completing his 12th standard, with a mission to unite students and young people for social service, cultural revival, and national welfare.
            </p>
            <p>
              He completed his B.Tech in Computer Science from Kanpur and is currently pursuing LLB, balancing academic excellence with active social leadership. Known for his clear thinking, innovative approach, and strategic vision, Raja Saksham has successfully led BYVS initiatives ranging from Covid-19 relief, youth empowerment, environmental campaigns, to cultural and religious protection activities.
            </p>
            <p>
              Since 2023, he has been working under the guidance of the Jyotishpeeth Shankaracharya, strengthening his spiritual foundation while expanding BYVS's impact nationwide. Under his leadership, BYVS has become a dynamic platform for youth activism, community service, and nation-building, inspiring thousands of young people to contribute to a stronger, culturally aware, and socially responsible India.
            </p>
          </div>
        </div>
      </section>

      {/* Guardians Section */}
      <section className="guardians-section">
        <div className="section-header">
          <h2>Guardians</h2>
          <p>Protective pillars providing wisdom and guidance to our organization</p>
        </div>

        <div className="guardians-grid">
          <div className="guardian-card">
            <a href="/assests/Devendra.jpg" target="_blank" rel="noopener noreferrer">
              <div className="guardian-image">
                <img
                  src="/assests/Devendra.jpg"
                  alt="Devendra Pandey"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <i className="fas fa-user-circle"></i>
                </div>
              </div>
            </a>
            <h3>Devendra Pandey</h3>
          </div>

          <div className="guardian-card">
            <a href="/assests/Yogiraj.jpg" target="_blank" rel="noopener noreferrer">
              <div className="guardian-image">
                <img
                  src="/assests/Yogiraj.jpg"
                  alt="Yogiraj Sarkar"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <i className="fas fa-user-circle"></i>
                </div>
              </div>
            </a>
            <h3>Yogiraj Sarkar</h3>
          </div>
        </div>
      </section>

      {/* Advisory Committee Section - Updated */}
      <section className="advisory-section">
        <div className="section-header">
          <h2>Advisory Committee</h2>
          <p>Distinguished legal advisors and scholars guiding our mission</p>
        </div>

        <div className="advisory-grid-container">
          {advisoryMembers.map((member, index) => (
            <div key={index} className="advisory-card">
              <div className="advisory-image">
                <img
                  src={member.photo}
                  alt={member.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <i className="fas fa-user-circle"></i>
                </div>
              </div>
              <h4>{member.name}</h4>
              <p className="advisory-designation">{member.designation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="structure-section">
        <div className="section-header">
          <h2>Organizational Structure</h2>
          <p>Hierarchical framework from national to district level</p>
        </div>

        {/* National Level Committee */}
        <div className="national-level">
          <h3>
            <i className="fas fa-flag"></i>
            National Level Committee
          </h3>
          <div className="committee-grid">
            {nationalPositions.map((member, index) => (
              <div key={index} className="committee-card">
                <div className="member-image">
                  <img
                    src={member.photo}
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none' }}>
                    <i className="fas fa-user-circle"></i>
                  </div>
                </div>
                <h4>{member.position}</h4>
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* State Level Committee */}
        <div className="state-level">
          <h3>
            <i className="fas fa-map"></i>
            State Level Committee
          </h3>
          <div className="selector-container">
            <div className="state-selector">
              <label htmlFor="state-select">
                <i className="fas fa-map-marker-alt"></i>
                Select State:
              </label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
                className="state-dropdown"
              >
                <option value="">-- Select a State --</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedState && (
            <div className="state-committee-display">
              <h4>
                <i className="fas fa-users"></i>
                Committee for {selectedState}
              </h4>
              <div className="committee-grid">
                {getStatePositions(selectedState).map((member, index) => (
                  <div key={index} className="committee-card">
                    <div className="member-image">
                      <img
                        src={member.photo}
                        alt={member.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-placeholder" style={{ display: 'none' }}>
                        <i className="fas fa-user-circle"></i>
                      </div>
                    </div>
                    <h4>{member.position}</h4>
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* District Level Committee - New Addition */}
        <div className="district-level">
          <h3>
            <i className="fas fa-building"></i>
            District Level Committee
          </h3>

          {!selectedState && (
            <div className="no-selection-message">
              <i className="fas fa-info-circle"></i>
              <p>Please select a state above to view district committees</p>
            </div>
          )}

          {selectedState && (
            <div className="selector-container">
              <div className="district-selector">
                <label htmlFor="district-select">
                  <i className="fas fa-city"></i>
                  Select District in {selectedState}:
                </label>
                <select
                  id="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="district-dropdown"
                >
                  <option value="">-- Select a District --</option>
                  {stateDistricts[selectedState] ?
                    stateDistricts[selectedState].map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))
                    :
                    <option disabled>Districts data not available</option>
                  }
                </select>
              </div>
            </div>
          )}

          {selectedState && selectedDistrict && (
            <div className="district-committee-display">
              <h4>
                <i className="fas fa-users-cog"></i>
                Committee for {selectedDistrict}, {selectedState}
              </h4>

              {isLoading && (
                <div className="loading-message">
                  <div className="loading-spinner"></div>
                  <p>Loading committee data...</p>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  <p>Could not load committee data. Showing position structure.</p>
                </div>
              )}

              <div className="state-committee-display">
                <div className="committee-grid">
                  {getDistrictPositions(selectedState, selectedDistrict).map((member, index) => (
                    <div key={index} className="committee-card">
                      <div className="member-image">
                        <img
                          src={member.photo}
                          alt={member.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="image-placeholder" style={{ display: 'none' }}>
                          <i className="fas fa-user-circle"></i>
                        </div>
                      </div>
                      <h4>{member.position}</h4>
                      <p>{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoreCommittee;