import DarkModeContainer from '@/components/DarkModeContainer';

const GlobalFooter = () => {
  return (
    <DarkModeContainer className="h-full flex-center">
      <a
        href="https://quarkcloud.io"
        rel="noopener noreferrer"
        target="_blank"
      >
        Copyright MIT © 2025 QuarkCloud
      </a>
    </DarkModeContainer>
  );
};

export default GlobalFooter;
