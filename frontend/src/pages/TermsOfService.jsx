import './TermsOfService.css'

function TermsOfService() {
  return (
    <div className="terms-page">
      <section className="page-hero">
        <div className="container">
          <h1>Terms of Service</h1>
        </div>
      </section>

      <section className="terms-content">
        <div className="container">
          <div className="content-card">
            <p className="intro-text">
              By accessing and using the EthioCare website, you agree to comply with these Terms of Service. 
              EthioCare provides this platform for informational and charitable donation purposes only. All 
              content is offered in good faith to support humanitarian efforts and public awareness.
            </p>

            <div className="terms-section">
              <h2>Donations</h2>
              <p>
                Donations made through EthioCare are voluntary and non-refundable once processed, unless 
                otherwise required by law. While we make every effort to ensure that funds are used as 
                intended, campaign needs and conditions on the ground may evolve, requiring reasonable 
                adjustments in fund allocation to best serve affected communities.
              </p>
            </div>

            <div className="terms-section">
              <h2>Changes to Terms</h2>
              <p>
                EthioCare reserves the right to update these terms at any time to reflect changes in 
                operations or legal requirements. Continued use of the website constitutes acceptance 
                of the updated terms.
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

export default TermsOfService
