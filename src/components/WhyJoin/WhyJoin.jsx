import React from 'react';
import './WhyJoin.css';

const WhyJoin = () => {
  const benefits = [
    {
      icon: "fas fa-certificate",
      title: "Official Membership & Recognition",
      description: "Join BYVS and gain official recognition as a registered member of a prominent youth organization. Receive an authentic membership certificate and ID card that stand as proof of your commitment and affiliation."
    },
    {
      icon: "fas fa-hands-helping",
      title: "24/7 Support",
      description: "BYVS members and leadership provide unwavering guidance, encouragement, and assistance anytime you need it, ensuring you never walk alone."
    },
    {
      icon: "fas fa-file-alt",
      title: "Boost Your Career Profile",
      description: "Enhance your resume by being associated with a respected social organization. Demonstrate your dedication to social causes, leadership, and community engagement—qualities highly valued by employers in both private and public sectors."
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Strong Foundation for Social Service & Politics",
      description: "Build a solid base for a career in social service or politics through valuable learning experiences, mentorship, and active involvement in impactful community programs facilitated by BYVS."
    },
    {
      icon: "fas fa-heart",
      title: "Contribute to Nation's well being",
      description: "Make a genuine difference in your community’s well-being. Participate in initiatives that foster social growth, provide aid, and empower disadvantaged groups, creating a positive social impact."
    },
    {
      icon: "fas fa-rocket",
      title: "Growth & Opportunities Within BYVS",
      description: "Grow with BYVS through leadership roles, project funding, promotions, and new challenges. Dedicated members have access to resources that support their ideas and extend their social outreach."
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
