import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect, type FC } from 'react';

import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

type TabType = 'bun' | 'main' | 'sauce';

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('bun');

  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleTabClick(tab: TabType): void {
    setCurrentTab(tab);

    const refs = {
      bun: bunsRef,
      main: mainsRef,
      sauce: saucesRef,
    } as const;

    if (refs[tab] && refs[tab].current) {
      refs[tab].current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const handleScroll = (): void => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;

      const sections = [
        { ref: bunsRef, value: 'bun' as const },
        { ref: mainsRef, value: 'main' as const },
        { ref: saucesRef, value: 'sauce' as const },
      ];

      let closestSection: TabType | null = null;
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
      return (): void => container.removeEventListener('scroll', handleScroll);
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
        bunsRef={bunsRef}
        mainsRef={mainsRef}
        saucesRef={saucesRef}
        containerRef={containerRef}
      />
    </section>
  );
};
