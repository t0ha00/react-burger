import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';

import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState('bun');

  const bunsRef = useRef(null);
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);
  const containerRef = useRef(null);

  function handleTabClick(tab) {
    setCurrentTab(tab);

    const refs = {
      bun: bunsRef,
      main: mainsRef,
      sauce: saucesRef,
    };

    if (refs[tab] && refs[tab].current) {
      refs[tab].current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;

      const sections = [
        { ref: bunsRef, value: 'bun' },
        { ref: mainsRef, value: 'main' },
        { ref: saucesRef, value: 'sauce' },
      ];

      let closestSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top - containerTop);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section.value;
          }
        }
      });

      if (closestSection && closestSection !== currentTab) {
        setCurrentTab(closestSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentTab]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => {
              handleTabClick('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => {
              handleTabClick('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => {
              handleTabClick('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <BurgerIngredientsList
        ingredients={ingredients}
        bunsRef={bunsRef}
        mainsRef={mainsRef}
        saucesRef={saucesRef}
        containerRef={containerRef}
      />
    </section>
  );
};
