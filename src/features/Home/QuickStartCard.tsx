'use client';

import { Flexbox } from '@lobehub/ui';
import { createStaticStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const STEPS = [
  { key: 'model' },
  { key: 'input' },
  { key: 'answer' },
] as const;

const styles = createStaticStyles(({ css, cssVar }) => ({
  card: css`
    padding-block: 14px;
    padding-inline: 16px;

    border: 1px solid ${cssVar.colorBorderSecondary};
    border-radius: ${cssVar.borderRadiusLG};

    background: ${cssVar.colorFillQuaternary};
  `,
  desc: css`
    font-size: 12px;
    line-height: 1.5;
    color: ${cssVar.colorTextTertiary};
  `,
  heading: css`
    font-size: 14px;
    font-weight: 600;
    color: ${cssVar.colorText};
  `,
  index: css`
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;

    font-size: 12px;
    font-weight: 600;
    color: ${cssVar.colorTextLightSolid};

    background: ${cssVar.colorPrimary};
    border-radius: 50%;
  `,
  title: css`
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
    color: ${cssVar.colorText};
  `,
}));

/**
 * Onboarding card shown above the composer on the home route.
 * Three steps: pick a model, type the prompt, read the answer.
 */
const QuickStartCard = memo(() => {
  const { t } = useTranslation('home');

  return (
    <div className={styles.card} data-testid={'home-quick-start'}>
      <div className={styles.heading}>{t('quickStart.title')}</div>
      <Flexbox gap={10} style={{ marginBlockStart: 10 }}>
        {STEPS.map((step, index) => (
          <Flexbox horizontal align={'flex-start'} gap={10} key={step.key}>
            <span className={styles.index}>{index + 1}</span>
            <Flexbox gap={2}>
              <span className={styles.title}>{t(`quickStart.${step.key}.title`)}</span>
              <span className={styles.desc}>{t(`quickStart.${step.key}.desc`)}</span>
            </Flexbox>
          </Flexbox>
        ))}
      </Flexbox>
    </div>
  );
});

export default QuickStartCard;
