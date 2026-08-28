import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const cards = [
  {
    title: 'Catch every duck',
    body: 'Start with three ducks, click the ones crossing the pond, and watch the flock grow.',
    to: '/docs/product/click-a-duck',
  },
  {
    title: 'Climb five ranks',
    body: 'Move from Pond paddler to Lord of the wings as your score rises.',
    to: '/docs/product/click-a-duck#ranks',
  },
  {
    title: 'Build the game',
    body: 'Explore the small Blazor app, its game rules, and the commands contributors use.',
    to: '/docs/architecture',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Click ducks and grow the flock"
      description="Learn how to play Click-a-Duck, climb the ranks, and keep up with a growing flock.">
      <header className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>The pond is getting crowded</p>
          <Heading as="h1">Click ducks. Grow the flock. Earn the title.</Heading>
          <p className={styles.subtitle}>
            Catch ducks as they cross the pond. Each click adds a point, and every milestone
            brings a grander rank and more ducks to chase.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/product/click-a-duck">
              Learn how to play
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/architecture">
              Explore the code
            </Link>
          </div>
        </div>
      </header>
      <main className="container">
        <section className={styles.grid} aria-label="Click-a-Duck handbook entry points">
          {cards.map((card) => (
            <article className={styles.card} key={card.title}>
              <Heading as="h2">{card.title}</Heading>
              <p>{card.body}</p>
              <Link to={card.to}>Read more →</Link>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
