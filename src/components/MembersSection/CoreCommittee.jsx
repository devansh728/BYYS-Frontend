import React, { useState, useEffect } from 'react';
import './CoreCommittee.css';

const CoreCommittee = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtCommittee, setDistrictCommittee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const nationalPositions = [
    { position: 'President', name: 'Raja Saksham Singh Yogi', photo: '/public/assests/President.png' },
    { position: 'General Secretary', name: 'Name Here', photo: '/public/assests/GeneralSecretary.png' },
    { position: 'Vice President', name: 'Name Here', photo: '/public/assests/VicePresident.jpg' },
    { position: 'Treasurer', name: 'Name Here', photo: '/public/assests/Treasurer.jpg' },
    { position: 'Coordinator', name: 'Name Here', photo: '/public/assests/Coordinator.jpg' },
    { position: 'Media In Charge', name: 'Name Here', photo: '/public/assests/MediaInCharge.jpg' }
  ];

  const getStatePositions = (stateName) => [
    { position: 'President', name: `${stateName} President`, photo: `/public/assests/states/${stateName}/President.jpg` },
    { position: 'General Secretary', name: `${stateName} General Secretary`, photo: `/public/assests/states/${stateName}/GeneralSecretary.jpg` },
    { position: 'Vice President', name: `${stateName} Vice President`, photo: `/public/assests/states/${stateName}/VicePresident.jpg` },
    { position: 'Treasurer', name: `${stateName} Treasurer`, photo: `/public/assests/states/${stateName}/Treasurer.jpg` },
    { position: 'Coordinator', name: `${stateName} Coordinator`, photo: `/public/assests/states/${stateName}/Coordinator.jpg` },
    { position: 'Media In Charge', name: `${stateName} Media In Charge`, photo: `/public/assests/states/${stateName}/MediaInCharge.jpg` }
  ];

  const advisoryMembers = [
    { name: 'Poornamba Didi', photo: '/public/assests/Poornamba.jpg' },
    { name: 'Shardamba Didi', photo: '/public/assests/Shardamba.jpg' },
    { name: 'Mukundanand Swami Ji', photo: '/public/assests/Mukundanand.jpg' },
    { name: 'Parmatmanand Bramhchari Ji', photo: '/public/assests/Parmatmanand.jpg' },
    { name: 'Dr. Nishita Dixit', photo: '/public/assests/Nishita.jpg' }
  ];

  useEffect(() => {
    const fetchDistrictCommittee = async () => {
      if (!selectedDistrict) {
        setDistrictCommittee([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/approved-office-bearers?district=${encodeURIComponent(selectedDistrict)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
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
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict('');
    setDistrictCommittee([]);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="core-committee">
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
              <p>"Brahman is the only truth, the world is an illusion"</p>
            </blockquote>
            <p>
              A scholar of Sanskrit and Vedic texts, he has led movements for the preservation of Hindu culture and social welfare, including advocating for the Ganga’s national recognition.
            </p>
            <p>
              He is the spiritual inspiration and guiding force behind Bhartiya Yuva Vidyarthi Sangathan (BYVS). With profound wisdom and divine insight, he provides spiritual guidance, mentorship, and support to BYVS, helping shape its vision and mission in youth empowerment, social service, and cultural revival. Under his guidance since 2023, BYVS continues to grow as a platform that blends spiritual values with active nation-building, inspiring young minds to serve society with dedication, discipline, national spirit and devotion.
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
              Since 2023, he has been working under the guidance of the Jyotishpeeth Shankaracharya, strengthening his spiritual foundation while expanding BYVS’s impact nationwide. Under his leadership, BYVS has become a dynamic platform for youth activism, community service, and nation-building, inspiring thousands of young people to contribute to a stronger, culturally aware, and socially responsible India.
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
            <a href="/public/assests/Devendra.jpg" target="_blank" rel="noopener noreferrer">
              <div className="guardian-image">
                <img
                  src="/public/assests/Devendra.jpg"
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
            <a href="/public/assests/Yogiraj.jpg" target="_blank" rel="noopener noreferrer">
              <div className="guardian-image">
                <img
                  src="/public/assests/Yogiraj.jpg"
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

      {/* Advisory Committee Section - Fixed Layout */}
      <section className="advisory-section">
        <div className="section-header">
          <h2>Advisory Committee</h2>
          <p>Distinguished spiritual leaders and scholars guiding our mission</p>
        </div>

        {/* All advisory members in a single grid */}
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
            </div>
          ))}
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="structure-section">
        <div className="section-header">
          <h2>Organizational Structure</h2>
          <p>Hierarchical framework from national to state level</p>
        </div>

        {/* National Level Committee */}
        <div className="national-level">
          <h3>National Level Committee</h3>
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
          <h3>State Level Committee</h3>
          <div className="state-selector">
            <label htmlFor="state-select">Select State:</label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-dropdown"
            >
              <option value="">-- Select a State --</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {selectedState && (
            <>
              <div className="state-committee-display">
                <h4>Committee for {selectedState}</h4>
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
              <div className="district-level">
                <h3>District Level Committee</h3>
                <div className="district-selector">
                  <label htmlFor="district-select">Select District:</label>
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="district-dropdown"
                  >
                    <option value="">-- Select a District --</option>
                    {stateDistrictData[selectedState].map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                {isLoading && <p>Loading district committee...</p>}
                {error && <p className="error-message">Error: {error}</p>}

                {selectedDistrict && !isLoading && !error && (
                  <div className="state-committee-display">
                    <h4>Committee for {selectedDistrict}</h4>
                    <div className="committee-grid">
                      {districtCommittee.length > 0 ? (
                        districtCommittee.map((member, index) => (
                          <div key={index} className="committee-card">
                            <div className="member-image">
                              <img
                                src={member.userData.profilePicture || '/public/assests/placeholder.png'}
                                alt={member.userData.name}
                                onError={(e) => e.target.src = '/public/assests/placeholder.png'}
                              />
                            </div>
                            <h4>{member.position}</h4>
                            <p>{member.userData.fullName}</p>
                            <p className="contact-info">
                              Contact: {member.userData.phone}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No approved office bearers found for this district.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoreCommittee;
