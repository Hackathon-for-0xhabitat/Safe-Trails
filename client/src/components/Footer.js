import React from 'react';
import './Footer.css';

const Footer = () => {
   return (
      <div className="footerWrapper">
         Created by{' '}
         <b>
            <a href="http://wildcodeschool.com" target="new">
               Wild Code School
            </a>
         </b>{' '}
         students
         <div class="studentContainer">
            <div className="studentName">
               <a
                  href="https://www.linkedin.com/in/victorisidoro/"
                  target="new"
               >
                  Victor
               </a>
            </div>
            <div className="studentName">
               <a
                  href="https://www.linkedin.com/in/sasmitha-nagesh-9818336b/"
                  target="new"
               >
                  Sasmitha
               </a>
            </div>
            <div className="studentName">
               <a
                  href="https://www.linkedin.com/in/guilherme-rodrigues-029344162/"
                  target="new"
               >
                  Guilherme
               </a>
            </div>
            <div className="studentName">
               <a href="https://www.linkedin.com/in/das-pallavi/" target="new">
                  Pallavi
               </a>
            </div>
         </div>
      </div>
   );
};

export default Footer;
