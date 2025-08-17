import React from 'react';
import './WhyJoin.css';

const WhyJoin = () => {
  const benefits = [
    {
      icon: "fas fa-certificate",
      title: "Official Recognition",
      description: "By joining BYVS, you become a member of a fully registered and reputed organization. You will receive an official membership certificate and a membership ID card, giving you authentic recognition as part of a legitimate Youth Club."
    },
    {
      icon: "fas fa-hands-helping",
      title: "24/7 Support System",
      description: "BYVS stands by your side 24/7, just like your own family. Whenever you need guidance, help, or support, the organization and its members will back you up wholeheartedly."
    },
    {
      icon: "fas fa-file-alt",
      title: "CV/Resume Enhancement",
      description: "Being a member of a registered NGO like BYVS enhances your CV/resume significantly. It shows your commitment to social work, which can give you an edge in private and government job interviews."
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Career Development",
      description: "If you aspire to build a career in social service or politics, BYVS provides invaluable learning opportunities, mentorship, and practical experience, helping you establish a solid base for your future endeavors."
    },
    {
      icon: "fas fa-heart",
      title: "Social Impact",
      description: "Joining BYVS means actively contributing to the betterment of society. Through the organization's programs and initiatives, you can make a real difference in the lives of people around you."
    },
    {
      icon: "fas fa-rocket",
      title: "Growth Opportunities",
      description: "If you work with dedication and passion, BYVS offers you opportunities for promotion within the organization. You can also receive funding support for your future social welfare projects, enabling you to expand your impact."
    }
  ];

  return (
    <section className="why-join">
      <div className="container">
        <h2 className="section-title">Why Join BYVS?</h2>
        <div className="why-join-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="join-card">
              <div className="card-icon">
                <i className={benefit.icon}></i>
              </div>
              <h3 className="card-title">{benefit.title}</h3>
              <p className="card-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
