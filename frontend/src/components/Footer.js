import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/Krckalica-logo.png";

const SocialMedia = styled.div`
  a {
    display: inline-block;
    font-size: 13px;
    margin-right: 30px;

    i {
      color: #b6b6b6;
      transition: .500s ease-out;

      &:hover {
        color: var(--border-green-light);
      }
    }
  }
`;

const FooterLogo = styled.div`
  img {
    height: auto;
    max-width: 100%;
  }
`;

const Footer = () => {
  return (
    <footer className="row h-100 w-100 m-0">
      <div className="container p-4">
        <div className="col-12 h-100 d-flex flex-wrap align-items-center justify-content-between">
          <SocialMedia className="text-right">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>

            <a href="#">
              <i className="fab fa-google"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a href="#">
              <i className="fab fa-github"></i>
            </a>
          </SocialMedia>

          <FooterLogo>
            <Link to="/">
              <img src={logo} alt="Krckalica logo" />
            </Link>
          </FooterLogo>

          <p>
            {`Copyright © ${new Date().getFullYear()} | All rights reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
