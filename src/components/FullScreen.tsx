import ButtonIcon from './ButtonIcon';

interface Props {
  className?: string;
  full?: boolean;
  toggleFullscreen: () => void;
}

const FullScreen = ({ className, full, toggleFullscreen }: Props) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      className={className}
      key={String(full)}
      tooltipContent={full ? t('icon.fullscreenExit') : t('icon.fullscreen')}
      onClick={toggleFullscreen}
    >
      {full ? <IconGridiconsFullscreenExit /> : <IconGridiconsFullscreen />}
    </ButtonIcon>
  );
};

export default FullScreen;
