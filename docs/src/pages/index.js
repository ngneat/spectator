import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import classnames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

const features = [
  {
    title: <>Clean and Easy tests</>,
    imageUrl: 'img/1.svg'
  },
  {
    title: <>Easy DOM querying</>,
    imageUrl: 'img/1.svg'
  },
  {
    title: <>Keyboard/mouse/touch events</>,
    imageUrl: 'img/1.svg'
  },
  {
    title: <>Testing projection</>,
    imageUrl: 'img/1.svg'
  },
  {
    title: <>Custom Matchers (toHaveClass, toBeDisabled..</>,
    imageUrl: 'img/2.svg'
  },
  {
    title: <>Routing testing support</>,
    imageUrl: 'img/3.svg'
  },
  {
    title: <>HTTP testing support</>,
    imageUrl: 'img/3.svg'
  },
  {
    title: <>Built-in support for entry components</>,
    imageUrl: 'img/3.svg'
  },
  {
    title: <>Auto-mocking providers</>,
    imageUrl: 'img/3.svg'
  },

  {
    title: <>Strongly typed</>,
    imageUrl: 'img/3.svg'
  },
  {
    title: <>Jest Support</>,
    imageUrl: 'img/3.svg'
  }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description="Transloco official documentation site">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames('button button--outline button--secondary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/installation')}
            >
              Get Started
            </Link>
            <iframe src="https://ghbtns.com/github-btn.html?user=ngneat&repo=spectator&type=star&count=true&size=large"></iframe>
          </div>
        </div>
      </header>
      <div className="container description">
        Spectator helps you get rid of all the boilerplate grunt work, leaving you with readable, sleek and streamlined unit tests. It
        allows you to write tests for components, directives, services, and more, without having to learn TestBed, ComponentFixture, and
        DebugElement APIs..
      </div>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
