import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import classnames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

const featuresMain = [
  {
    title: <>Clean and Easy tests</>,
    imageUrl: 'img/icon/main-clean-tests.png'
  },
  {
    title: <>Easy DOM querying</>,
    imageUrl: 'img/icon/main-dom-query.png'
  },
  {
    title: <>Keyboard/mouse/touch events</>,
    imageUrl: 'img/icon/main-events.png'
  }
];

const features = [
  {
    title: <>Testing projection</>,
    imageUrl: 'img/icon/projector-solid.svg'
  },
  {
    title: <>Custom Matchers (toHaveClass, toBeDisabled..)</>,
    imageUrl: 'img/icon/eye-dropper-regular.svg',
  },
  {
    title: <>Routing testing support</>,
    imageUrl: 'img/icon/road-regular.svg'
  },
  {
    title: <>HTTP testing support</>,
    imageUrl: 'img/icon/ethernet-regular.svg'
  },
  {
    title: <>Built-in support for entry components</>,
    imageUrl: 'img/icon/door-open-solid.svg',
  },
  {
    title: <>Auto-mocking providers</>,
    imageUrl: 'img/icon/robot-regular.svg'
  },
  {
    title: <>Strongly typed</>,
    imageUrl: 'img/icon/code-solid.svg'
  },
  {
    title: <>Jest Support</>,
    imageUrl: 'img/icon/jest-regular.svg'
  }
];

function IntroHeading({...siteConfig}) {
  return (
    <div className="intro-content">
      <div className="intro-heading">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle" dangerouslySetInnerHTML={{__html: siteConfig.tagline}}></p>
        <div className={styles.buttons}>
          <Link
            className={classnames(styles.getStarted)}
            to={useBaseUrl('docs/installation')}
          >
            Get Started
          </Link>
          <iframe src="https://ghbtns.com/github-btn.html?user=ngneat&repo=spectator&type=star&count=true&size=large"></iframe>
        </div>
      </div>
    </div>
  );
}

function IntroDescription() {
  return (
    <div className="intro-description">
      <ul>
        <li>
          <img src={useBaseUrl('/img/icon/rabbit-fast-solid.svg')} />
          <p>Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests.</p>
        </li>
        <li>
          <img src={useBaseUrl('/img/icon/head-side-brain-regular.svg')} className="small" />
          <p>Write tests for components, directives, services, and more, without having to learn TestBed, ComponentFixture, and DebugElement APIs.</p>
        </li>
      </ul>
    </div>
  );
}

function FeatureItem({ imageUrl, title }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="feature-item">
      {imgUrl && ( <img src={imgUrl} alt={title} /> )}
      <h3>{title}</h3>
    </div>
  );
}

function FeatureList({ features, theme }) {
  const themeMain = theme && theme === 'main' ? theme : '';
  return (
    <>
    {features && features.length && (
      <section className={classnames('home-container features', themeMain)}>
        <div className="home-row">
          {features.map((props, idx) => (
            <FeatureItem key={idx} {...props} />
          ))}
        </div>
      </section>
    )}
    </>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description="Spectator official documentation site">
      <header className="home-intro home-container">
        <IntroHeading {...siteConfig} />
        <IntroDescription />
      </header>
      <main>
        <FeatureList {...{features: featuresMain, theme: 'main'}} />
        <FeatureList {...{features}} />
      </main>
    </Layout>
  );
}

export default Home;
