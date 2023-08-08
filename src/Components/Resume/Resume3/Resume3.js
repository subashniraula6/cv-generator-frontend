import "./Resume3.css";

export default function Resume3() {
  return (
    <>
      <div class="resume-wrapper">
        <section class="profile section-padding">
          <div class="container">
            <div class="picture-resume-wrapper">
              <div class="picture-resume">
                <span>
                  <img
                    src="https://dl.dropboxusercontent.com/u/37474475/1483346_536520613103110_1648308982_n.png"
                    alt=""
                  />
                </span>
                <svg version="1.1" viewBox="0 0 350 350">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="8"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
                        result="cm"
                      />
                    </filter>
                  </defs>

                  <g filter="url(#goo)">
                    <circle
                      id="main_circle"
                      class="st0"
                      cx="171.5"
                      cy="175.6"
                      r="130"
                    />

                    <circle
                      id="circle"
                      class="bubble0 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble1 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble2 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble3 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble4 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble5 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble6 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble7 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble8 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble9 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                    <circle
                      id="circle"
                      class="bubble10 st1"
                      cx="171.5"
                      cy="175.6"
                      r="122.7"
                    />
                  </g>
                </svg>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="name-wrapper">
              <h1>
                Prateek <br />
                Gupta
              </h1>
              {/* <!-- YOUR NAME AND LAST NAME  --> */}
            </div>
            <div class="clearfix"></div>
            <div class="contact-info clearfix">
              <ul class="list-titles">
                <li>Call</li>
                <li>Mail</li>
                <li>Web</li>
                <li>Home</li>
              </ul>
              <ul class="list-content ">
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
            <div class="contact-presentation">
              {/* <!-- YOUR PRESENTATION RESUME  --> */}
              <p>
                <span class="bold">Hi there,</span> I would be graduating in
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
            <div class="contact-social clearfix">
              <ul class="list-titles">
                <li>Steam</li>
                <li>Github</li>
                <li>LinkedIn</li>
              </ul>
              <ul class="list-content">
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

        <section class="experience section-padding">
          <div class="container">
            <h3 class="experience-title">Projects</h3>

            <div class="experience-wrapper">
              <div class="company-wrapper clearfix">
                <div class="experience-title">Project REM</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div class="time">2013</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">
                  Project Rem is an unreal engine 4 tech demo (third person
                  puzzle game). My contributions to the project are Level
                  Design, Asset Creation(3D Models and animations).(Team of 6).
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div class="company-description">
                  <p>unreal-engine4, gamedev, 3ds-max</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Invasion</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div class="time">2014</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">
                  2D platformer written in OpenGL
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div class="company-description">
                  <p>open-gl, gamedev, c++</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Patient Management System</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div class="time">2014</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">
                  A simple patient management system for small scale clinics and
                  hospitals
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div class="company-description">
                  <p>webdev, php, software-engineering</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Node0.in Website</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div class="time">2015</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">Website for node0 labs</div>
                {/* <!-- JOB TITLE  --> */}
                <div class="company-description">
                  <p>webdev, photoshop, html/css</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Connecto</div>
                {/* <!-- NAME OF THE COMPANY YOUWORK WITH  --> */}
                <div class="time">2015</div>
                {/* <!-- THE TIME YOU WORK WITH THE COMPANY  --> */}
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">
                  Hardware prototype for an home automation platform developed
                  at node0 labs
                </div>
                {/* <!-- JOB TITLE  --> */}
                <div class="company-description">
                  <p>hardware, iot, c</p>
                  {/* <!-- JOB DESCRIPTION  --> */}
                </div>
              </div>
            </div>
            {/* <!--Skill experience--> */}

            <div class="section-wrapper clearfix">
              <h3 class="section-title">Skills</h3>
              {/* <!-- YOUR SET OF SKILLS  --> */}
              <ul>
                <li class="skill-percentage">HTML / HTML5</li>
                <li class="skill-percentage">CSS / CSS3 / SASS / LESS</li>
                <li class="skill-percentage">Javascript</li>
                <li class="skill-percentage">Angular.js</li>
                <li class="skill-percentage">Meteor</li>
                <li class="skill-percentage">Jquery</li>
                <li class="skill-percentage">Wordpress</li>
                <li class="skill-percentage">Photoshop</li>
                <li class="skill-percentage">3DS Max</li>
                <li class="skill-percentage">Game dev</li>
                <li class="skill-percentage">C/C++</li>
                <li class="skill-percentage">Arduino</li>
                <li class="skill-percentage">MySQL</li>
                <li class="skill-percentage">PHP</li>
                <li class="skill-percentage">Internet of Things</li>
              </ul>
            </div>

            <div class="section-wrapper clearfix">
              <h3 class="section-title">Hobbies</h3>
              {/* <!-- DESCRIPTION OF YOUR HOBBIES --> */}
              <p>
                I love listening and playing music, eating good food, tinkering
                hardware and learning about bleeding edge stuff on web
              </p>

              <p>Also, I am an avid gamer, say hi on steam</p>
            </div>
          </div>
        </section>

        <div class="clearfix"></div>
      </div>{" "}
    </>
  );
}
