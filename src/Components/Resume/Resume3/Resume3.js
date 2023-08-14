import "./Resume3.css";

export default function Resume3() {
  return (
    <>
      <div className="resume-wrapper">
        <section className="profile section-padding">
          <div className="container">
            <div className="picture-resume-wrapper">
              <div className="picture-resume">
                <span>
                  <img
                    src="https://dl.dropboxusercontent.com/u/37474475/1483346_536520613103110_1648308982_n.png"
                    alt=""
                  />
                </span>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="name-wrapper">
              <h1>
                Prateek <br />
                Gupta
              </h1>
              {/* <!-- YOUR NAME AND LAST NAME  --> */}
            </div>
            <div className="clearfix"></div>
            <div className="contact-info clearfix">
              <ul className="list-titles">
                <li>Call</li>
                <li>Mail</li>
                <li>Web</li>
                <li>Home</li>
              </ul>
              <ul className="list-content ">
                <a href="tel:+919626937819">
                  <li>+91 962 693 7819</li>
                </a>
                {/* <!-- YOUR PHONE NUMBER  --> */}
                <a href="mailto:hello@prateek.pw">
                  <li>hello@prateek.pw</li>
                </a>
                {/* <!-- YOUR EMAIL --> */}
                <li>
                  <a href="#">prateek.pw</a>
                </li>
                {/* <!-- YOUR WEBSITE  --> */}
                <li>Tamil Nadu, IN</li>
                {/* <!-- YOUR STATE AND COUNTRY  --> */}
              </ul>
            </div>
            <div className="contact-presentation">
              {/* <!-- YOUR PRESENTATION RESUME  --> */}
              <p>
                <span className="bold">Hi there,</span> I would be graduating in
                Bachelors of Technology(Computer Science) from VIT University,
                Vellore, having keen interest in all-things-web, data analytics,
                automation, internet of things and artificial intelligence.
              </p>
              <p>&nbsp;</p>
              <p>
                These days I am working on a personal project to enable masses
                to build upon IoT a.k.a.{" "}
                <a href="https://polygn.launchrock.com">Polygn</a>.
              </p>
            </div>
            <div className="contact-social clearfix">
              <ul className="list-titles">
                <li>Steam</li>
                <li>Github</li>
                <li>LinkedIn</li>
              </ul>
              <ul className="list-content">
                {/* <!-- REMEMBER TO PUT THE URL ON THE HREF TAG  --> */}
                <li>
                  <a href="https://steamcommunity.com/id/neo17th/profile">
                    neo17th
                  </a>
                </li>
                {/* <!-- YOUR TWITTER USER  --> */}
                <li>
                  <a href="https://github.com/prateek0103">prateek0103</a>
                </li>
                {/* <!-- YOUR DRIBBBLE USER  --> */}
                <li>
                  <a href="https://in.linkedin.com/in/prateek0103">
                    prateek0103
                  </a>
                </li>
                {/* <!-- YOUR BEHANCE USER  --> */}
              </ul>
            </div>
          </div>
        </section>

        <section className="experience section-padding">
          <div className="container">
            <h3 className="experience-title">Projects</h3>

            <div className="experience-wrapper">
              <div className="company-wrapper clearfix">
                <div className="experience-title">Project REM</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div className="time">2013</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div className="job-wrapper clearfix">
                <div className="experience-title">
                  Project Rem is an unreal engine 4 tech demo (third person
                  puzzle game). My contributions to the project are Level
                  Design, Asset Creation(3D Models and animations).(Team of 6).
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div className="company-description">
                  <p>unreal-engine4, gamedev, 3ds-max</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div className="company-wrapper clearfix">
                <div className="experience-title">Invasion</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div className="time">2014</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div className="job-wrapper clearfix">
                <div className="experience-title">
                  2D platformer written in OpenGL
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div className="company-description">
                  <p>open-gl, gamedev, c++</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div className="company-wrapper clearfix">
                <div className="experience-title">Patient Management System</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div className="time">2014</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div className="job-wrapper clearfix">
                <div className="experience-title">
                  A simple patient management system for small scale clinics and
                  hospitals
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div className="company-description">
                  <p>webdev, php, software-engineering</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div className="company-wrapper clearfix">
                <div className="experience-title">Node0.in Website</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div className="time">2015</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div className="job-wrapper clearfix">
                <div className="experience-title">Website for node0 labs</div>
                {/* <!-- JOB TITLE  --> */}
                <div className="company-description">
                  <p>webdev, photoshop, html/css</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div className="company-wrapper clearfix">
                <div className="experience-title">Connecto</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div className="time">2015</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div className="job-wrapper clearfix">
                <div className="experience-title">
                  Hardware prototype for an home automation platform developed
                  at node0 labs
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div className="company-description">
                  <p>hardware, iot, c</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>
            </div>
            {/* <!--Skill experience--> */}

            <div className="section-wrapper clearfix">
              <h3 className="section-title">Skills</h3>
              {/* <!-- YOUR SET OF SKILLS  --> */}
              <ul>
                <li className="skill-percentage">HTML / HTML5</li>
                <li className="skill-percentage">CSS / CSS3 / SASS / LESS</li>
                <li className="skill-percentage">Javascript</li>
                <li className="skill-percentage">Angular.js</li>
                <li className="skill-percentage">Meteor</li>
                <li className="skill-percentage">Jquery</li>
                <li className="skill-percentage">Wordpress</li>
                <li className="skill-percentage">Photoshop</li>
                <li className="skill-percentage">3DS Max</li>
                <li className="skill-percentage">Game dev</li>
                <li className="skill-percentage">C/C++</li>
                <li className="skill-percentage">Arduino</li>
                <li className="skill-percentage">MySQL</li>
                <li className="skill-percentage">PHP</li>
                <li className="skill-percentage">Internet of Things</li>
              </ul>
            </div>

            <div className="section-wrapper clearfix">
              <h3 className="section-title">Hobbies</h3>
              {/* <!-- DESCRIPTION OF YOUR HOBBIES --> */}
              <p>
                I love listening and playing music, eating good food, tinkering
                hardware and learning about bleeding edge stuff on web
              </p>

              <p>Also, I am an avid gamer, say hi on steam</p>
            </div>
          </div>
        </section>

        <div className="clearfix"></div>
      </div>{" "}
    </>
  );
}
