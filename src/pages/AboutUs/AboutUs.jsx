import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AboutUs.css';

const AboutUs = () => {
  const workCategories = [
    {
      icon: 'fas fa-hand-holding-medical',
      title: 'Covid-19 Relief',
      items: [
        'During March–April 2021, BYVS launched the Covid Mukt Bharat Mission, providing essential supplies, food, and medical support to affected families both online and at the ground level—earning widespread gratitude and media coverage.',
        'Created and operated CovidMuktBharat.in to help COVID patients by providing verified leads for available hospital beds, oxygen cylinders, and blood donors.',
        'Distributed food packets in Prayagraj on 17 June 2020, serving 300+ needy families.',
        'Distributed masks, sanitizers, and other essential items to COVID-affected slum areas in Faridabad.',
        'Collected and contributed donations through the Charitism website to support COVID relief.'
      ]
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Community Service',
      items: [
        'Celebrate the National President\'s birthday every year with slum area children, bringing joy to 100+ kids through games, food, and gifts.',
        'Distribute notebooks, books, and stationery items to underprivileged kids every year on the National President\'s birthday and in Faridabad, Haryana.',
        'Celebrate Diwali every year with underprivileged children and slum communities, spreading light and happiness to hundreds of families.',
        'Distributed eatables in Prayagraj slum areas on 15 October 2021, reaching over 150 underprivileged people.',
        'Organised tea, snacks, and winter essentials distribution drive for the underprivileged in Faridabad, Haryana on January 2024.'
      ]
    },
    {
      icon: 'fas fa-leaf',
      title: 'Environmental Initiatives',
      items: [
        'Conduct plantation drives every Environment Day, planting hundreds of saplings annually to promote greenery and environmental awareness.',
        'Take pledges and create awareness campaigns to celebrate Eco-Friendly Holi and Diwali every year, reducing pollution and protecting nature.',
        'Organize tree plantation campaigns in schools and colleges across different states.',
        'Promote sustainable living practices through workshops and community programs.'
      ]
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Youth Empowerment & Student Rights',
      items: [
        'Organised a membership drive and youth conference at Aaspur Devsara on 20 August 2022, inspiring 200+ youth to join the movement.',
        'Submitted a memorandum to the Degree College Principal against fee hikes and for better student facilities, ensuring fair education rights.',
        'Submitted a memorandum to CO Patti against a policeman abusing a student on 6 April 2022, standing for justice and student dignity.',
        'Conduct career guidance sessions and skill development workshops for rural youth.',
        'Provide legal aid and support for students facing harassment or discrimination.'
      ]
    },
    {
      icon: 'fas fa-flag',
      title: 'Patriotism & National Causes',
      items: [
        'Paid tribute to Pulwama martyrs on 14 February 2023, honouring the sacrifice of our soldiers.',
        'Participated in the Meri Maati Mera Desh campaign to honour the soil and spirit of the nation.',
        'Organize patriotic rallies and programs on national festivals and important days.',
        'Promote awareness about national heroes and freedom fighters among youth.',
        'Conduct flag hoisting ceremonies and cultural programs celebrating Indian heritage.'
      ]
    },
    {
      icon: 'fas fa-om',
      title: 'Religious & Cultural Protection',
      items: [
        'Conducted a raid against religious conversion in Labeda in March 2025, preventing forced conversions and protecting community faith.',
        'Burnt the effigy of Swami Prasad Maurya on 4 February 2023 in protest against disrespect to Sanatan Dharma.',
        'Organize cultural programs showcasing Indian traditions, music, and dance forms.',
        'Conduct workshops on Vedic knowledge and ancient Indian wisdom.',
        'Protect and promote local cultural practices and festivals in rural areas.'
      ]
    },
    {
      icon: 'fas fa-paw',
      title: 'Animal Welfare',
      items: [
        'Work actively for cow protection, rescuing cattle from smugglers and illegal trafficking.',
        'Rescued 3 cows from illegal transport during a raid against smugglers on 27 March 2023.',
        'Provide warm clothes and jackets to dogs, cows, and other animals during winter to protect them from harsh weather.',
        'Actively intervened in multiple cases of animal cruelty, safeguarding innocent animals through grassroots activism.',
        'Establish animal shelters and provide medical care for stray and injured animals.'
      ]
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Events & Public Engagement',
      items: [
        'Inaugurated a camp with the presence of a Cabinet Minister on 21 November 2022, marking a milestone in public outreach.',
        'Organised various awareness rallies and programs for student and youth welfare.',
        'Conduct Tiranga Yatra every year on Independence Day and Republic Day to promote unity, national integrity, and cultural pride.',
        'Hosted various Sangosthi and Sammelans on youth issues, engaging and inspiring young minds across the nation.',
        'Organize blood donation camps, health awareness programs, and community service drives.'
      ]
    }
  ];

  const scrollWorksLeft = () => {
    const slider = document.querySelector('.works-slider');
    if (slider) {
      slider.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollWorksRight = () => {
    const slider = document.querySelector('.works-slider');
    if (slider) {
      slider.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Header />
      
      <main className="aboutus-page">
        {/* Hero Spacer - Prevents header overlap */}
        <div className="hero-spacer">
          <div className="hero-content">
            <h1>About BYVS</h1>
            <p>Empowering Youth • Preserving Culture • Serving Nation</p>
          </div>
        </div>

        {/* History Section - Fixed */}
<section className="history-section section">
  <div className="container">
    <div className="history-content">
      <h2>History of BYVS</h2>
      <p>
        <b>Bhartiya Yuva Vidyarthi Sangathan (BYVS)</b> is a vibrant youth movement founded in March 2020 by Raja Saksham Singh Yogi, then a 17 year old youth, along with Yash Pratap Singh and Raj Shekhar Singh during the challenging times of the Covid-19 pandemic. Born out of a deep sense of duty towards the nation, BYVS quickly gained widespread media recognition for its ground-level service during the crisis—delivering relief, hope, and strength to communities in need.
      </p>
      <p>
        Guided by the spiritual inspiration and margdarshak of the revered Jagadguru Shankaracharya of Jyotirmath (Jyotish Peeth), BYVS is deeply anchored in the ideals of Sanatan Dharma. We are dedicated to awakening the youth of Bharat to their dharmic, cultural, and national responsibilities, building a nationwide network of conscious, courageous, and committed youth who work selflessly for Dharma, Rashtra, and Sanskriti.
      </p>
      <p>
        From cultural awareness campaigns to student empowerment initiatives, disaster relief, and social justice advocacy, BYVS stands at the forefront of shaping the next generation of national leaders. Our programs include value-based workshops, community service drives, educational outreach, and legal aid missions—empowering youth to serve society with knowledge, compassion, and integrity.
      </p>
    </div>
  </div>
</section>


        {/* Inspiration Section */}
        <section className="inspiration-section section">
          <div className="container">
            <h2>Inspiration - Jagadguru Shankaracharya ji's Message</h2>
            <div className="inspiration-content">
              <div className="inspiration-text">
                <p>
                  To be rooted in one's culture and values is to be truly free. Youth of India must rise to embrace their dharma and heritage with pride and vigor, for there lies the strength of the nation.
                </p>
                <p>
                  Service to society and devotion to one's nation are the highest virtues. Let every youth be a torchbearer of light and wisdom, igniting hearts and minds for a better Bharat.
                </p>
                <p>
                  In unity and faith, the youth of Bharat hold the power to transform our society toward justice, peace, and prosperity.
                </p>
              </div>
              <div className="inspiration-image">
                <img 
                  src="/assests/shankaraji.jpg" 
                  alt="Jagadguru Shankaracharya Ji"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="image-placeholder" 
                  style={{ display: 'none', background: '#f0f0f0', borderRadius: '20px', height: '450px', alignItems: 'center', justifyContent: 'center', color: '#666' }}
                >
                  <i className="fas fa-user" style={{ fontSize: '3rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Message Section */}
        <section className="founder-message-section section">
          <div className="container">
            <h2>Founder's Message</h2>
            <div className="founder-content">
              <div className="founder-text">
                <p>
                  Youth is the future of our nation. Through proper guidance and values, we can build a stronger India—an India where our youth lead with integrity, courage, and service. <strong>"Rashtra ne hamko itna kuch diya, hum bhi to kuch dena seekhe."</strong>
                </p>
                <p>
                  Bhartiya Yuva Vidyarthi Sangathan (BYVS) was founded with this very spirit—to unite the youth of Bharat, awaken their sense of responsibility, and channel their energy towards the upliftment of society and the preservation of our glorious cultural heritage. Together, let us become the change our nation needs and the pride our ancestors envisioned.
                </p>
                <p className="founder-signature">
                  — Raja Saksham Singh Yogi<br />
                  Founder & National President, BYVS
                </p>
              </div>
              <div className="founder-image">
                <img 
                  src="/assests/founder.jpg" 
                  alt="Raja Saksham Singh Yogi"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="image-placeholder" 
                  style={{ display: 'none', background: '#f0f0f0', borderRadius: '20px', height: '420px', alignItems: 'center', justifyContent: 'center', color: '#666' }}
                >
                  <i className="fas fa-user" style={{ fontSize: '3rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Works and Milestones Section */}
        <section className="works-milestones-section section">
          <div className="container">
            <h2>Our Works and Milestones</h2>
            <div className="works-container">
              <div className="works-slider">
                {workCategories.map((category, index) => (
                  <div key={index} className="work-card">
                    <div className="work-card-icon">
                      <i className={category.icon}></i>
                    </div>
                    <h3>{category.title}</h3>
                    <ul>
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="slider-nav">
                <button className="slider-arrow" onClick={scrollWorksLeft} aria-label="Scroll left">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="slider-arrow" onClick={scrollWorksRight} aria-label="Scroll right">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section - Compact and Enhanced */}
<section className="cta-section section">
  <div className="container">
    <div className="cta-content">
      <h2>Join the Movement</h2>
      <p className="cta-subtitle">Shape India's Future with BYVS</p>
      <p className="cta-description">
        Be a part of India's largest youth revolution. Together, we can build a stronger, 
        more prosperous Bharat rooted in our cultural values and powered by youth energy.
      </p>

      <div className="cta-features">
        <div className="cta-feature">
          <i className="fas fa-check-circle"></i>
          <span>Free Membership</span>
        </div>
        <div className="cta-feature">
          <i className="fas fa-certificate"></i>
          <span>Official Certificate</span>
        </div>
        <div className="cta-feature">
          <i className="fas fa-users"></i>
          <span>National Network</span>
        </div>
        <div className="cta-feature">
          <i className="fas fa-trophy"></i>
          <span>Recognition & Awards</span>
        </div>
      </div>
      
      <div className="cta-buttons">
        <a href="/join" className="cta-button primary">
          <i className="fas fa-users"></i>
          Join BYVS Today
        </a>
        <a href="/contact" className="cta-button secondary">
          <i className="fas fa-envelope"></i>
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</section>

      </main>
      
      <Footer />
    </>
  );
};

export default AboutUs;
