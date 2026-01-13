import './PrivacyPolicy.css'

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="privacy-content">
        <div className="container">
          <div className="content-card">
            <p className="intro-text">
              EthioCare respects your privacy and is committed to protecting any personal information 
              you share with us. We collect only the information necessary to process donations, respond 
              to inquiries, and improve our services. This may include basic contact details and 
              payment-related information provided during the donation process.
            </p>

            <div className="policy-section">
              <h2>Data Protection</h2>
              <p>
                All personal data is handled securely and is never sold, rented, or shared with third parties 
                for marketing purposes. Payment transactions are processed through secure, encrypted platforms 
                to ensure donor safety. EthioCare takes reasonable measures to protect user information and 
                complies with applicable data protection standards.
              </p>
            </div>

            <div className="policy-section">
              <h2>Consent</h2>
              <p>
                By using our website, you consent to the collection and use of information as described in 
                this policy. If you have any questions or concerns regarding data privacy, you may contact 
                us at any time.
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

export default PrivacyPolicy
