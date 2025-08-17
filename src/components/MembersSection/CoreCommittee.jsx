import React, { useState } from 'react';
import './CoreCommittee.css';

const CoreCommittee = () => {
  const [selectedState, setSelectedState] = useState('');

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const nationalPositions = [
    { position: 'President', name: 'Raja Saksham Singh Yogi', photo: '/public/assests/President.jpg' },
    { position: 'General Secretary', name: 'Name Here', photo: '/public/assests/GeneralSecretary.jpg' },
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
          )}
        </div>
      </section>
    </div>
  );
};

export default CoreCommittee;
