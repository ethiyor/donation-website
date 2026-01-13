import './FAQ.css'

function FAQ() {
  return (
    <div className="faq-page">
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="content-card">
            <p className="intro-text">
              EthioCare is a student-led humanitarian initiative focused on providing direct assistance 
              to displaced families, refugees, and vulnerable individuals across Ethiopia. Our campaigns 
              prioritize urgent needs such as food, shelter, and basic medical support, working with local 
              networks and community partners whenever possible.
            </p>

            <div className="faq-section">
              <h2>How are donations used?</h2>
              <p>
                Donations made through EthioCare are used to support the specific campaign selected by the donor, 
                unless otherwise stated. We strive to allocate funds efficiently, minimizing overhead so that the 
                greatest possible portion of each contribution reaches people in need. Campaign updates and impact 
                summaries are shared as they become available.
              </p>
            </div>

            <div className="faq-section">
              <h2>How can I contact EthioCare?</h2>
              <p>
                If you have questions regarding donations, campaigns, or our work, we encourage you to review 
                this FAQ section or contact us directly. Transparency, accountability, and donor trust are core 
                values of EthioCare.
              </p>
            </div>

            <div className="last-updated">
              Last updated: January 2026
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
