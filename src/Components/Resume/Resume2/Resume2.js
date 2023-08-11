import "./Resume2.css";

export default function Resume2({ questions, setQuestions, activeColor }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,300,700"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container">
        <div className="header">
          <div className="full-name">
            <span className="first-name">{
                questions?.basicInfo?.questions.find((q) => q.index === 1)
                  ?.answer
              }</span>
            <span className="last-name">{
                " " + questions?.basicInfo?.questions.find((q) => q.index === 2)
                  ?.answer
              }</span>
          </div>
          <div className="contact-info">
            <span className="email">Email: </span>
            <span className="email-val">john.doe@gmail.com</span>
            <span className="separator"></span>
            <span className="phone">Phone: </span>
            <span className="phone-val">111-222-3333</span>
          </div>

          <div className="about">
            <span className="position">Profile Summary </span>
            <span className="desc">
              I am a front-end developer with more than 3 years of experience
              writing html, css, and js. I'm motivated, result-focused and
              seeking a successful team-oriented company with opportunity to
              grow.
            </span>
          </div>
        </div>
        <div className="details">
          <div className="section">
            <div className="section__title">Experience</div>
            <div className="section__list">
              <div className="section__list-item">
                <div className="left">
                  <div className="name">KlowdBox</div>
                  <div className="addr">San Fr, CA</div>
                  <div className="duration">Jan 2011 - Feb 2015</div>
                </div>
                <div className="right">
                  <div className="name">Fr developer</div>
                  <div className="desc">did This and that</div>
                </div>
              </div>
              <div className="section__list-item">
                <div className="left">
                  <div className="name">Akount</div>
                  <div className="addr">San Monica, CA</div>
                  <div className="duration">Jan 2011 - Feb 2015</div>
                </div>
                <div className="right">
                  <div className="name">Fr developer</div>
                  <div className="desc">did This and that</div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Education</div>
            <div className="section__list">
              <div className="section__list-item">
                <div className="left">
                  <div className="name">Sample Institute of technology</div>
                  <div className="addr">San Fr, CA</div>
                  <div className="duration">Jan 2011 - Feb 2015</div>
                </div>
                <div className="right">
                  <div className="name">Fr developer</div>
                  <div className="desc">did This and that</div>
                </div>
              </div>
              <div className="section__list-item">
                <div className="left">
                  <div className="name">Akount</div>
                  <div className="addr">San Monica, CA</div>
                  <div className="duration">Jan 2011 - Feb 2015</div>
                </div>
                <div className="right">
                  <div className="name">Fr developer</div>
                  <div className="desc">did This and that</div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Projects</div>
            <div className="section__list">
              <div className="section__list-item">
                <div className="name">DSP</div>
                <div className="text">
                  I am a front-end developer with more than 3 years of
                  experience writing html, css, and js. I'm motivated,
                  result-focused and seeking a successful team-oriented company
                  with opportunity to grow.
                </div>
              </div>

              <div className="section__list-item">
                <div className="name">DSP</div>
                <div className="text">
                  I am a front-end developer with more than 3 years of
                  experience writing html, css, and js. I'm motivated,
                  result-focused and seeking a successful team-oriented company
                  with opportunity to grow. <a href="/login">link</a>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Skills</div>
            <div className="skills">
              <div className="skills__item">
                <div className="left">
                  <div className="name">Javascript</div>
                </div>
                <div className="right">
                  <input id="ck1" type="checkbox" checked />

                  <label for="ck1"></label>
                  <input id="ck2" type="checkbox" checked />

                  <label for="ck2"></label>
                  <input id="ck3" type="checkbox" />

                  <label for="ck3"></label>
                  <input id="ck4" type="checkbox" />
                  <label for="ck4"></label>
                  <input id="ck5" type="checkbox" />
                  <label for="ck5"></label>
                </div>
              </div>
            </div>
            <div className="skills__item">
              <div className="left">
                <div className="name">CSS</div>
              </div>
              <div className="right">
                <input id="ck1" type="checkbox" checked />

                <label for="ck1"></label>
                <input id="ck2" type="checkbox" checked />

                <label for="ck2"></label>
                <input id="ck3" type="checkbox" />

                <label for="ck3"></label>
                <input id="ck4" type="checkbox" />
                <label for="ck4"></label>
                <input id="ck5" type="checkbox" />
                <label for="ck5"></label>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">Interests</div>
            <div className="section__list">
              <div className="section__list-item">Football, programming.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
