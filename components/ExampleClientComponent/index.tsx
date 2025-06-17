'use client';

import { Trans, useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <p>
        <strong>Client_t:</strong> {t('site.name')}
      </p>
      <p>
        <strong>Client_Trans:</strong>{' '}
        <Trans i18nKey="common:site.name" ns="common" />
      </p>
    </div>
  );
}
