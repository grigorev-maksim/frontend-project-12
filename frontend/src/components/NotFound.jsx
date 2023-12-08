import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('notFoundPage.heading')}</h1>
      <h2>{t('notFoundPage.error')}</h2>
      <h3>{t('notFoundPage.text')}</h3>
    </>
  );
};

export default NotFound;
