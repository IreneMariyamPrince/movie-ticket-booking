import React, { useState } from 'react';
import SignInModal from '../../molecules/SignInModal';
import styles from '../../css/LandingHeader.module.css';

const LandingHeader = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
  };

  return (
    <>
      <div className={styles.containerFluid}>
        <div className={`container ${styles.containerInner}`}>
          <div className="d-flex align-items-center">
            <img src='/assets/logo.png' className={styles.logo} alt='Logo' />
            <span className={styles.brand}>ShowTimeNow</span>
            <div className={`d-flex align-items-center ms-3 ${styles.searchGroup}`}>
              <span className={styles.searchIcon}>
                <i className="bi bi-search"></i>
              </span>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <button className={`btn btn-sm dropdown-toggle ${styles.actionButton}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Location
            </button>
            <button type="button" className={`btn btn-danger btn-sm ${styles.actionButton}`} onClick={handleSignInClick}>Sign in</button>
            <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <i className="bi bi-list fs-4"></i>
            </button>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className={`offcanvas-header ${styles.offcanvasHeader}`}>
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Hey!</h5>
              </div>
              <div className={`offcanvas-body ${styles.offcanvasBody}`}>
                <p>Try scrolling the rest of the page to see this option in action.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid bg-light'>
        <div className={`container ${styles.navLinks}`}>
          <div>
            <a href='#' className={styles.navLink}>Movies</a>
            <a href='#' className={styles.navLink}>Streams</a>
            <a href='#' className={styles.navLink}>Events</a>
            <a href='#' className={styles.navLink}>Plays</a>
            <a href='#' className={styles.navLink}>Sports</a>
            <a href='#' className={styles.navLink}>Activities</a>
          </div>
          <div>
            <a href='/show/register' className={styles.subNavLink}>ListYourShow</a>
            <a href='#' className={styles.subNavLink}>Corporates</a>
            <a href='#' className={styles.subNavLink}>Offers</a>
            <a href='#' className={styles.subNavLink}>Gift Cards</a>
          </div>
        </div>
      </div>
      <SignInModal show={showSignInModal} handleClose={handleCloseSignInModal} />
    </>
  );
}

export default LandingHeader;
