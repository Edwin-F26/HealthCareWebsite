import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './healthcare.css';
import { gsap, ScrollTrigger } from './lib/gsap';

const PHONE_DISPLAY = '1-888-410-4987';
const PHONE_LINK = 'tel:+18884104987';
const HERO_IMAGE =
  'https://images.pexels.com/photos/6817735/pexels-photo-6817735.jpeg?auto=compress&cs=tinysrgb&w=1600';
const ADVISOR_IMAGE =
  'https://images.pexels.com/photos/11370618/pexels-photo-11370618.jpeg?auto=compress&cs=tinysrgb&w=1400';

const plans = [
  {
    icon: 'shield',
    title: 'Medicare Advantage',
    text: 'Explore HMO, PPO and PFFS options that may combine medical, hospital and additional benefits.',
    tag: 'All-in-one options',
  },
  {
    icon: 'cross',
    title: 'Medicare Supplement',
    text: 'Compare Medigap plans designed to help with certain costs Original Medicare does not cover.',
    tag: 'Added peace of mind',
  },
  {
    icon: 'pill',
    title: 'Prescription Drug Plans',
    text: 'Review stand-alone Part D plans with your prescriptions and preferred pharmacies in mind.',
    tag: 'Part D coverage',
  },
  {
    icon: 'family',
    title: 'Individual & ACA Plans',
    text: 'Find health coverage for yourself or your family, including Marketplace plan options.',
    tag: 'Coverage for every stage',
  },
];

const faqs = [
  {
    question: 'What should I have ready when I call?',
    answer:
      'It helps to have your current insurance card, a list of prescriptions, preferred pharmacies, and the names of the doctors you want to keep. This gives the licensed agent a clearer picture of your needs.',
  },
  {
    question: 'Can I change my Medicare plan at any time?',
    answer:
      'Generally, Medicare plan changes are limited to certain enrollment periods unless you qualify for a Special Enrollment Period. A licensed agent can help you understand the timing that applies to you.',
  },
  {
    question: 'Does Highland Health Care offer every plan?',
    answer:
      'No. Highland Health Care represents selected Medicare organizations and plan products. You can also visit Medicare.gov, call 1-800-MEDICARE, or contact your local SHIP program to review all available options.',
  },
  {
    question: 'Where is Highland Health Care located?',
    answer:
      'The office is located at 662 S. Military Trail, Deerfield Beach, Florida 33442. You can call 1-888-410-4987 (TTY: 711) to speak with a licensed insurance agent.',
  },
];

function Icon({ name, size = 24 }) {
  const paths = {
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.8 2.9 8.3 7 10 4.1-1.7 7-5.2 7-10V6l-7-3Z" />
        <path d="m9.2 12 1.8 1.8 3.9-4" />
      </>
    ),
    cross: (
      <>
        <path d="M8.5 3h7v5.5H21v7h-5.5V21h-7v-5.5H3v-7h5.5V3Z" />
      </>
    ),
    pill: (
      <>
        <path d="m8.2 16.8 8.6-8.6a3.5 3.5 0 0 0-5-5l-8.6 8.6a3.5 3.5 0 1 0 5 5Z" />
        <path d="m8 8 8 8" />
      </>
    ),
    family: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.2" />
        <path d="M3.5 20v-2.2A4.8 4.8 0 0 1 8.3 13h1.4a4.8 4.8 0 0 1 4.8 4.8V20" />
        <path d="M15 14.2h1.7a3.8 3.8 0 0 1 3.8 3.8v2" />
      </>
    ),
    phone: (
      <path d="M7.2 3.5 10 7.7 7.9 9.8a15.7 15.7 0 0 0 6.3 6.3l2.1-2.1 4.2 2.8-.8 3.1c-.2.7-.8 1.1-1.5 1.1C9.8 20.5 3.5 14.2 3 5.8c0-.7.4-1.3 1.1-1.5l3.1-.8Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
  };

  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#top" aria-label="Highland Health Care home">
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 32.5 18.5 13 25 22l4.5-6.5L43 32.5Z" />
        <path d="M17 32.5h14" />
        <path d="M24 26v13M17.5 32.5h13" />
      </svg>
      <span className="brand__type">
        <strong>Highland</strong>
        <span>Health Care</span>
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>
            <Icon name="pin" size={15} />
            Serving Deerfield Beach and communities across Florida
          </span>
          <a href={PHONE_LINK}>
            <Icon name="phone" size={15} />
            <strong>{PHONE_DISPLAY}</strong>
            <small>TTY: 711</small>
          </a>
        </div>
      </div>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <Brand />
          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#plans" onClick={closeMenu}>Plans</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#about" onClick={closeMenu}>About us</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a className="btn btn--primary nav__cta" href={PHONE_LINK} onClick={closeMenu}>
              <Icon name="phone" size={18} />
              Talk to an agent
            </a>
          </nav>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="eyebrow hero-animate">
            <span className="eyebrow__dot" />
            Florida health coverage, made personal
          </div>
          <h1 className="hero-animate">
            Health coverage that feels a little more <em>human.</em>
          </h1>
          <p className="hero__lead hero-animate">
            Get clear, one-on-one guidance from a licensed insurance agent who takes the time to
            understand your doctors, prescriptions, budget and goals.
          </p>
          <div className="hero__actions hero-animate">
            <a className="btn btn--primary btn--large" href={PHONE_LINK}>
              <Icon name="phone" size={20} />
              Call {PHONE_DISPLAY}
            </a>
            <a className="text-link" href="#plans">
              Explore your options
              <Icon name="arrow" size={19} />
            </a>
          </div>
          <ul className="hero__checks hero-animate" aria-label="Highlights">
            <li><span><Icon name="check" size={15} /></span>Licensed agents</li>
            <li><span><Icon name="check" size={15} /></span>Personal plan review</li>
            <li><span><Icon name="check" size={15} /></span>Local Florida team</li>
          </ul>
        </div>
        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              className="hero__image"
              src={HERO_IMAGE}
              alt="A happy senior couple relaxing together at home"
              fetchPriority="high"
            />
          </div>
          <div className="hero__badge hero__badge--location">
            <span className="hero__badge-icon"><Icon name="pin" size={20} /></span>
            <span><small>Proudly based in</small>Deerfield Beach, FL</span>
          </div>
          <div className="hero__badge hero__badge--care">
            <span className="hero__badge-icon"><Icon name="shield" size={20} /></span>
            <span><small>Guidance you can trust</small>Coverage with clarity</span>
          </div>
          <svg className="hero__scribble" viewBox="0 0 140 90" aria-hidden="true">
            <path d="M6 81C43 73 28 19 84 9c24-4 43 8 50 25" />
            <path d="m123 27 12 8 3-14" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Coverage types">
      <div className="container trust-strip__inner">
        <p>Here to help you navigate</p>
        <span />
        <ul>
          <li>Medicare Advantage</li>
          <li>Medigap</li>
          <li>Part D</li>
          <li>ACA & Individual</li>
          <li>Supplemental plans</li>
        </ul>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section className="section plans" id="plans">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div className="eyebrow"><span className="eyebrow__dot" />Ways we can help</div>
          <h2>Coverage for every chapter</h2>
          <p>
            Insurance is not one-size-fits-all. We help you compare the details that matter to your
            health, your life and your wallet.
          </p>
        </div>
        <div className="plans__grid">
          {plans.map((plan) => (
            <article className="plan-card" key={plan.title} data-reveal>
              <div className="plan-card__top">
                <span className="plan-card__icon"><Icon name={plan.icon} size={28} /></span>
                <span className="plan-card__tag">{plan.tag}</span>
              </div>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <a href={PHONE_LINK} aria-label={`Ask about ${plan.title}`}>
                Ask an agent
                <Icon name="arrow" size={18} />
              </a>
            </article>
          ))}
        </div>
        <p className="plans__note" data-reveal>
          Plan availability and benefits vary by location, eligibility and carrier.
        </p>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      number: '01',
      title: 'Tell us what matters',
      text: 'Share your doctors, prescriptions, coverage needs and budget with a licensed agent.',
    },
    {
      number: '02',
      title: 'Compare your options',
      text: 'Review available plans side by side, with the details explained in plain language.',
    },
    {
      number: '03',
      title: 'Enroll with confidence',
      text: 'Choose the fit that works for you and get guidance through the enrollment process.',
    },
  ];

  return (
    <section className="section process" id="how-it-works">
      <div className="container">
        <div className="section-heading section-heading--light" data-reveal>
          <div className="eyebrow eyebrow--light"><span className="eyebrow__dot" />Simple by design</div>
          <h2>From questions to clarity in three steps</h2>
          <p>No pressure. No piles of jargon. Just a more personal way to explore your options.</p>
        </div>
        <div className="process__steps">
          <div className="process__line"><span className="process__line-progress" /></div>
          {steps.map((step) => (
            <article className="process__step" key={step.number} data-reveal>
              <span className="process__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="process__cta" data-reveal>
          <span>Ready when you are.</span>
          <a className="btn btn--lime" href={PHONE_LINK}>
            <Icon name="phone" size={19} />
            Speak with an agent
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__visual" data-reveal>
          <div className="about__image-wrap">
            <img
              className="about__image"
              src={ADVISOR_IMAGE}
              alt="An older woman speaking with a healthcare advisor"
              loading="lazy"
            />
          </div>
          <div className="about__stamp">
            <strong>Local team</strong>
            <span>Deerfield Beach</span>
            <small>Florida</small>
          </div>
          <div className="about__dots" aria-hidden="true" />
        </div>
        <div className="about__content" data-reveal>
          <div className="eyebrow"><span className="eyebrow__dot" />Who we are</div>
          <h2>Local roots. Personal guidance.</h2>
          <p>
            Highland Health Care is a Deerfield Beach insurance agency operated by Highland Health
            Direct, LLC. The team helps individuals compare Medicare, prescription drug, Medigap,
            individual ACA and supplemental health plan options.
          </p>
          <p>
            Our goal is simple: listen first, explain the tradeoffs clearly and help you make a more
            informed coverage decision.
          </p>
          <ul className="about__list">
            <li><Icon name="check" size={18} />One-on-one help from licensed insurance agents</li>
            <li><Icon name="check" size={18} />Plan review based on your personal priorities</li>
            <li><Icon name="check" size={18} />Support before and during enrollment</li>
          </ul>
          <a className="text-link text-link--dark" href="#contact">
            Get in touch <Icon name="arrow" size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <div className="faq__intro" data-reveal>
          <div className="eyebrow"><span className="eyebrow__dot" />Good to know</div>
          <h2>Questions are always welcome.</h2>
          <p>
            Health insurance can feel complicated. These quick answers are a starting point—our
            licensed agents can help with the details.
          </p>
          <a className="btn btn--outline" href={PHONE_LINK}>
            <Icon name="phone" size={19} />
            Ask us directly
          </a>
        </div>
        <div className="faq__list" data-reveal>
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                {faq.question}
                <span aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact__card" data-reveal>
        <div className="contact__pattern" aria-hidden="true" />
        <div className="contact__copy">
          <div className="eyebrow eyebrow--light"><span className="eyebrow__dot" />Let&apos;s talk</div>
          <h2>Your next step can be a simple conversation.</h2>
          <p>Connect with a licensed agent to discuss your needs and available plan options.</p>
        </div>
        <div className="contact__actions">
          <a className="btn btn--lime btn--large" href={PHONE_LINK}>
            <Icon name="phone" size={21} />
            {PHONE_DISPLAY}
          </a>
          <span>TTY: 711</span>
          <small>Enrollment may be limited to certain times of year.</small>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand light />
            <p>Clear guidance. Thoughtful support. Coverage with confidence.</p>
          </div>
          <div className="footer__column">
            <h3>Explore</h3>
            <a href="#plans">Plan options</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About Highland</a>
            <a href="#faq">FAQs</a>
          </div>
          <div className="footer__column">
            <h3>Contact</h3>
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
            <span>TTY: 711</span>
            <a href="mailto:consumerrelations@highlandhealthdirect.com">
              consumerrelations@<wbr />highlandhealthdirect.com
            </a>
          </div>
          <div className="footer__column">
            <h3>Visit</h3>
            <address>
              662 S. Military Trail<br />
              Deerfield Beach, FL 33442
            </address>
          </div>
        </div>
        <div className="footer__disclosure">
          <p>
            Highland Health Care represents Medicare Advantage (HMO, PPO and PFFS) organizations
            and stand-alone Part D prescription drug plans contracted with Medicare. Enrollment
            depends on contract renewal. We do not offer every plan available in your area. Contact
            Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) for
            information about all your options. Medicare and CMS have neither reviewed nor endorsed
            this information.
          </p>
          <p>
            Enrollment in a described plan type may be limited to certain times of the year unless
            you qualify for a Special Enrollment Period. Not all benefits are available with all
            plans.
          </p>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Highland Health Direct, LLC. All rights reserved.</span>
          <span>Highland Health Care • Deerfield Beach, Florida</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const app = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTimeline
        .from('.hero-animate', {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
        })
        .from(
          '.hero__visual',
          {
            clipPath: 'inset(0 0 100% 0 round 48px)',
            scale: 0.96,
            duration: 1.1,
          },
          0.15,
        )
        .from(
          '.hero__badge',
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          0.75,
        );

      ScrollTrigger.batch('[data-reveal]', {
        once: true,
        start: 'top 86%',
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          ),
      });

      gsap.to('.hero__image', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.fromTo(
        '.process__line-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process__steps',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.7,
          },
        },
      );

      gsap.to('.about__image', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, app);

    return () => context.revert();
  }, []);

  return (
    <div ref={app}>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Plans />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
